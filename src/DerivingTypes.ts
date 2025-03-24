//! TYPEOF OPERATOR

import { text } from "stream/consumers";

const userName = 'Burak';

console.log(typeof userName);

type UserName = typeof userName;  // it declared by const so it gives the value of userName => "Burak"
// when userName declared with "let" then type UserName would be just the type of the userName => string 

const settings = {
    difficulty : 'easy',
    minLevel: 10,
    didStart: false,
    players : ['Ayse', 'Mehmet']
};

type Settings = typeof settings; // we are gettings all the properities by this you see all the key values' types

function loadData ( s : typeof settings ){ // you can describe it here also
    // ...
}

loadData(settings);

// function sum ( a:number , b:number ){
//     return a + b;
// }

// function subs ( a:number, b:number ){
//     return a - b;
// }

// type SumFn = typeof sum;
// type SubsFn = typeof subs;

// function performMathAction ( cb: SumFn | SubsFn ){
   // ...
// }

//! KEYOF OPERATOR

type User = { name: string; age:number };
type UserKeys = keyof User;

let validKey: UserKeys;

validKey = 'name';
validKey = 'age';

function getProp<T extends object, U extends keyof T > ( obj: T, key: U ){ // we have 2 placeholders and T is object and U is T's keys
    const val = obj[key]; // Key abstraction way in Javascript

    if ( val === undefined || val === null ){
        throw new Error('Accessing undefined or null value.');
    }
    return val;
}


const data = { id: 1, isStored: false, values: [1,5,6] };
const isStored = getProp(data,'values'); // you can pick any of the objects

const user = {name: 'Burak', age: 25};
const val = getProp(user, 'age'); // due to second key the value getting the type

//! INDEXED ACCESS TYPES

const appUser = {
    name: 'Burak',
    age: 25,
    permissions: [{id:'p1', title:'Admin', description: 'Admin access'}],
};

// type AppUser = typeof appUser; // easier way

type AppUser = {
    name:string;
    age:number;
    permissions: {
        id:string;
        title: string;
        description:string;
    }[];
} // if you dont have value yet use this one

type Perms = AppUser['permissions'];
type Perm = Perms[number];

type Names = string[];
type Name = Names[number]; // it will check the array and give the number typed ones

//! MAPPED TYPES

type Operations = {
    readonly add: ( a:number, b:number ) => number;
    readonly subtract: ( a:number, b:number ) => number;
}; // we are describing types not objects 

type Results<T> = {
    -readonly [Key in keyof T] ?: number  // every key operators in T object type
    // by adding readonly flag we can make them non-overridable, "-readonly" is removing the readonly here which is coming from top
}; // -? it can remove the option flag like this

let mathOperations: Operations = {
    add ( a:number, b:number ){
        return a + b;
    },
    subtract( a:number, b:number ){
        return a - b;
    }
};

let mathResults : Results<Operations> = { // it is taking the types of Operations 
    add: mathOperations.add( 1, 2 ),
    subtract: mathOperations.subtract( 5, 3 ) // if you delete one of these it will throw an error because it wants both of the objects
}; // but we put ? question mark to  [Key in keyof T] ?: number  thats why it can be undefined
// if you put the question mark add and subtract in type Operation it will everything flexibily

mathResults.add = 10; // this wont work because its readonly


//! TEMPLATE LITERAL TYPES

const mainUserName = 'Ali';
const greetings = `Hi there, ${mainUserName}.`;

// potantial problem 
type ReadPermissions = 'no-read' | 'read';
type WritePermissions = 'no-write' | 'write';
type FilePermissons =   `${ReadPermissions}-${WritePermissions}`; // 'no-read-write' | 'read-no-write'| 'no-read-no-write' | 'read-write';

type DataFile = {
    data: string;
    permissions: FilePermissons;
};

type DataFileEventNames = `${keyof DataFile}Changed!`;

type DataFileEvents = {
    [Key in DataFileEventNames]: () => void; // 'Key' is randome name you can pick anything
}; // now DataFileEventNames are pretty useful names for file

//! CONDITIONAL TYPES

type StringArray = string[];

// type ElementType<T extends any[]> = T[number];
// type Example1 = ElementType<StringArray>;
// let text = 1;
// type Example2 = ElementType<typeof text>;

type GetElementType<T> = T extends any[] ? T[number] : never; // Its condition so if T extends any true => T[number], false => never    
// its like T === any[]
type Example1 = GetElementType<StringArray>;
type Example2 = GetElementType<typeof text>;

type FullnamePerson = { 
    firstName: string;
    lastName:string;
}
type FullnameOrNothing<T> = T extends FullnamePerson ? string : never;

function getFullname<T extends object> ( person: T ) : FullnameOrNothing<T> { // FullnameOrNothing is condition
    if ( 'firstName' in person && 'lastName' in person && person.firstName && person.lastName ){ // checks if the object fill
        return `${person.firstName} ${person.lastName}` as FullnameOrNothing<T>;
    }

    throw new Error("No first name and/or last name found.");
}

const name1 = getFullname({}); // never
const name2 = getFullname({firstName:'Burak', lastName:'Kurtulus'}); // string


//! INFER KEYWORD

function addNew ( a:number , b:number ){
    return a + b;
}

type AddFn = typeof addNew; // AddFn holds all the types
type ReturnValueType<T> = T extends ( ...args: any[] ) => infer RV ? RV : never; // infer is using to takeout a part of a type
// RV = Return Value which i gave the name 
// ...args: any[] means that you can take as much as you want values in any types

type AddFnReturnValueType = ReturnValueType<AddFn>;
// type AddFnReturnValueType = ReturnType<AddFn>; // ReturnType is Typescript's utility type so you dont need to do ReturnValueType


