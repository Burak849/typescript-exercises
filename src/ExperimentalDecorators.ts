import { title } from "node:process";

function Logger( logString: string ) {
    console.log('Logger Factory');
    return function (constructor: Function){
        console.log('Logging... ');
        console.log(constructor);
    };
}

//! CHECK THOSE AGAIN

function WithTemplate( template: string , hookId: string ){

    console.log('Template Factory');
    return function<T extends { new(...args: any[]): { name: string } }>( originalConstructor : T ){ // this is the actual decorator
        
        
        
        return class extends originalConstructor {
            constructor( ..._: any[] ){ // when you put _ you say to typescript that i know i didnt use but i dont need
                super();
                console.log('Rendering template!');
                const hookEl = document.getElementById(hookId);
                const p = new originalConstructor ();
                if ( hookEl ){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = p.name;
                }

            }
        } 
    
    
    
    };
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

function Autobind( _: any, _2: string , descriptor: PropertyDescriptor ){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';
    

    @Autobind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector('button')!; 
button?.addEventListener('click', p.showMessage ); // by adding .bind(p) it will change the message

interface ValidatorConfig{
    [property: string] : {
        [validateableProps: string]: string[]; // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required( target: any , propName: string ){
    registeredValidators[target.constructor.name] = { // constructor used to create our object we can use any function with this
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }; 
}
function PositiveNumber( target: any , propName: string ){
    registeredValidators[target.constructor.name] = { 
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}
function validate( obj: any ){ // this function must work with all the validators 
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig){
        return true;
    }

    let isValid = true;

    for( const prop in objValidatorConfig ){
        for ( const validator of objValidatorConfig[prop] ){
            switch ( validator ){

                case 'required': 
                isValid = isValid && !!obj[prop]; // boolean type
                break;

                case 'positive':
                isValid = isValid && obj[prop] > 0;
                break;
                
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
    constructor ( t: string, p: number ){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', event => { 
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    // now we can make the validation with decorators because we are saving also empty inputs

    const createdCourse = new Course( title, price );

    if( !validate(createdCourse) ){
        alert('Invalid input, please try again.');
        return;
    }
    console.log(createdCourse);
})