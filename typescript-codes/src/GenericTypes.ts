// Generic
let names: Array<string> = ['Burak', 'Ali']; // another way to describe string array

type DataStore<T>= { // T is for type placeholder that can be anything and it can be multiple placeholders
    [key: string]: T // generic type feature
};

let store: DataStore< string|number > = {}; // we are describing it here for T

store.name = 'Burak';
// store.isIntructor = true; // we didnt let DataStore to be boolean thats why this wont work

let nameStore: DataStore<string> = {}; // so we can set up any store type 
// we can create more flexible types where we are using them

function merge<T>( a: T , b: T ){ // now they will set the types of any
    return [ a , b ];
} // but there is a problem here because the types are same so it must be same type a and b to solve this problem => 23rd line


const ids = merge<number>(1,2); // and we can identify theirs type like this, typescript understands even if you didnt clarify

function mergeNew<T, U>( n: T, m: U ){
    return [n , m];
}
const ids2 = mergeNew(1,'Burak'); // so this works now



function mergeObj< T extends object, U extends object >( a:T , b:U ){ // this tells that T must be any kind of object so we are 
// getting an error on number because its not an object

    return { ...a, ...b };
}
// we declared another U param so they wont be same type
const merged = mergeObj( { userName: 'Burak' }, { age: 25 } ); // by this way it will work because we made them object
console.log(merged);



// you can create generic classes, interfaces or types like this
class User <T>{
    constructor( public id: T  ){

    }
}

const user = new User(1);

