
function Logger( logString: string ) {
    console.log('Logger Factory');
    return function (constructor: Function){
        console.log('Logging... ');
        console.log(constructor);
    };
}

function WithTemplate( template: string , hookId: string ){
    console.log('Template Factory');
    return function ( constructor : any ){ // this is the actual decorator
        console.log('Rendering template!');
        const hookEl = document.getElementById(hookId);
        const p = new constructor ();
        if ( hookEl ){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
    
}

@Logger('LOGGING') // render later
@WithTemplate ('<h1>My Person Object</h1>','app') // renders first that we see from the function
class Person {
    name = 'Burak';
constructor () {
    console.log('Creating person object...');
}
}

const pers = new Person();
console.log(pers);

// --

function Log( target: any , propertyName: string | symbol ) {
    console.log('Property decorator!');
    console.log( target , propertyName );
}

function Log2 ( target: any , name: string , descriptor: PropertyDescriptor ){
    console.log( 'Accessor decorator' );
    console.log( target );
    console.log( name );
    console.log( descriptor );
    
}

function Log3 ( target: any, name: string | symbol , descriptor : PropertyDescriptor ){
    console.log( 'Method decorator' );
    console.log( target );
    console.log( name );
    console.log( descriptor );
}

function Log4 ( target: any , name: string | symbol , position: number ){
    console.log( 'Parameter decorator' );
    console.log( target );
    console.log( name );
    console.log( position );
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price ( val: number ){
        if ( val > 0 ){
            this._price = val;
        } else{
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor ( t: string, p: number ){
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax( @Log4 tax : number ){
        return this._price * ( 1 + tax );
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book2', 29);