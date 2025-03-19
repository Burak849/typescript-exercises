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