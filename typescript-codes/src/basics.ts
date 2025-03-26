let userName: string;
let userAge = 25; // If you didnt have initial type you dont need to assing the type typescript automatically will take the assignment as a type.


userName = "Burak";
console.log(userName);

function add( a: number , b: number ) { // you could set strict number like b = 5
    return a + b;
}


add(10,20); // dont give a number if you have initial b number, string is not allowed

//FLEXIBLE TYPES

let age: any = 25; //it can be any type so you can change it later. it resembles any types of values. 

// Being specific is better

age = '26'; // string
age = false; // boolean
age = {}; // object
age = []; // array

let unionType: string | number = 25; // you can use it in more types for flexibilty
unionType = '25';
// unionType = false; this will not be assignable


let hobbies = ['Sports', 'Cooking', 3]; // if you give only strings you can only push strings but if a number in array typescript will automatically add " | number " type
hobbies.push(10);

let users: ( string | number )[]; // this is how to describe a array type, also you can add number to array
let usersAlternative: Array<string | number>; // this is another way to describe

users = [1, 'Burak'];
users = [5, 10];
users = ['Ali' , 'Tom'];


let possibleResults: [number, number]; // tuple

possibleResults = [1, -1];


let user: { // you can describe it also here so you can add more objects
    name: string;
    age: number;
    hobbies: string[];
    role: {
        description: string;
        id: number;
    };
} = {
    name: 'Burak',
    age: 25,
    hobbies: ['Sports', 'Cooking'],
    role: {
        description: 'admin',
        id: 5
    }// this satisfied the type defination on top
}; // objects automatically take the types


let val: {} = 'is a value'; // when you use {} as a type it defines like type "any" but it cant take null, undefined ... (its the diffrence from type "any" )


let data: Record< string, number | string >; // this is pretty common way. It uses to get keys full of objects 

data = {
    entry: 1,
    entry2: 'some text' 
};


// Choices

enum Role {
    Admin = 0, // you can decide for the starting value
    Editor,
    Guest,
} // you can create Role type now

type Roles = 'admin' | 'editor' | 'guest' | 'reader'; // now you can use those everywhere

type User = {
    name: string;
    age: number;
    role: Roles;
    permissions: string[];
};

// it affects like an array ( it makes like 0 = admin 2 = guest )
let userRole: Role = Role.Admin; // 0 => Admin, 1=> Guest ,, 

userRole = Role.Guest;

let newRole: 'admin' | 'editor' | 'guest' | 'reader' = 'admin'; // you can create new types
newRole = 'guest';

let anotherPossibleResults: [1 | -1, 1 | -1];
anotherPossibleResults = [ 1, -1 ];

//FUNCITONS

function access( roles: Roles ) {  // you can get the types from top in type Roles  = ...


}

function adds( a: number , b: number ): number { 
    return a + b;
}

function log( message: string): void { // If it doesnt return anything you can use
    console.log(message);
}

function logAndThrow (errorMessage: string): never { // it was void but we overwrote it as 'never' it will freeze the function
    console.log(errorMessage);
    throw new Error(errorMessage);
}

const logMsg = ( msg: string) => {
    console.log(msg);
}; // normal javascript arrow function

function performJob( cb: (msg: string) => void ) { // this is how you define a function type in typescript
    // ...
    cb('Job done!');
}

performJob(log);

type Users = {
    name: string;
    age: number;
    greet: () => string;
};

let userA: Users = {
    name: 'Burak',
    age:25,
    greet() {
        console.log("Hello there!");
        return this.name;
    }
}


// SPEACIAL TYPES

let a: null | string ; // this value hold null

a = "Hi"; // so it can be null or string
// ... 
// you can make it null later  
a = null;

let b: undefined | string; 


const inputEl = document.getElementById("user-name") as HTMLInputElement | null; // you can see here it can be null, if you put ! to the end it says it cant be null


// if (!inputEl){
//    throw new Error("element not found");
// }


console.log(inputEl?.value); // you can check it. It cant be null anymore typescript is clever enough to understand that
// user ? question mark if it can be null... If it is null it wont take the null if its not null it will take the value

// UNKNOWN

function process( val: unknown ){ // its like any but its not
    // it forces the developer to use if 

    if ( typeof val === 'object' && !!val && 'log' in val && typeof val.log === 'function' ) // pretty complex code but you can describe many of them and make sure to safely execute the code
    { 
        val.log();
    }
}

// OPTIONAL VALUE TYPES

function generateError(msg?: string) { // to make it optional put a question mark ?
    throw new Error(msg);
}

generateError("An error occured!");



type UserR = {
    name: string;
    age: number;
    role?: 'admin' | 'guest'
}; // this is also optional

// DOUBLE QUESTION MARK OPERATOR ??

let input = null;
const didProvideInput = input || false; // if there is get 'input' it it didnt provide it is false ( just it will use the false)
const didProvidedInput = input ?? false; // this one will control the input like undifend, null or 0 bla bla then it will do false








