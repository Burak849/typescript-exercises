let userName;
let userAge = 25; // If you didnt have initial type you dont need to assing the type typescript automatically will take the assignment as a type.
userName = "Burak";
console.log(userName);
function add(a, b) {
    return a + b;
}
add(10, 20); // dont give a number if you have initial b number, string is not allowed
//FLEXIBLE TYPES
let age = 25; //it can be any type so you can change it later. it resembles any types of values. 
// Being specific is better
age = '26'; // string
age = false; // boolean
age = {}; // object
age = []; // array
let unionType = 25; // you can use it in more types for flexibilty
unionType = '25';
// unionType = false; this will not be assignable
let hobbies = ['Sports', 'Cooking', 3]; // if you give only strings you can only push strings but if a number in array typescript will automatically add " | number " type
hobbies.push(10);
let users; // this is how to describe a array type, also you can add number to array
let usersAlternative; // this is another way to describe
users = [1, 'Burak'];
users = [5, 10];
users = ['Ali', 'Tom'];
let possibleResults; // tuple
possibleResults = [1, -1];
let user = {
    name: 'Burak',
    age: 25,
    hobbies: ['Sports', 'Cooking'],
    role: {
        description: 'admin',
        id: 5
    } // this satisfied the type defination on top
}; // objects automatically take the types
let val = 'is a value'; // when you use {} as a type it defines like type "any" but it cant take null, undefined ... (its the diffrence from type "any" )
let data; // this is pretty common way. It uses to get keys full of objects 
data = {
    entry: 1,
    entry2: 'some text'
};
// Choices
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Editor"] = 1] = "Editor";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {})); // you can create Role type now
// it affects like an array ( it makes like 0 = admin 2 = guest )
let userRole = Role.Admin; // 0 => Admin, 1=> Guest ,, 
userRole = Role.Guest;
let newRole = 'admin'; // you can create new types
newRole = 'guest';
let anotherPossibleResults;
anotherPossibleResults = [1, -1];
//FUNCITONS
function access(roles) {
}
function adds(a, b) {
    return a + b;
}
function log(message) {
    console.log(message);
}
function logAndThrow(errorMessage) {
    console.log(errorMessage);
    throw new Error(errorMessage);
}
const logMsg = (msg) => {
    console.log(msg);
}; // normal javascript arrow function
function performJob(cb) {
    // ...
    cb('Job done!');
}
performJob(log);
let userA = {
    name: 'Burak',
    age: 25,
    greet() {
        console.log("Hello there!");
        return this.name;
    }
};
// SPEACIAL TYPES
let a; // this value hold null
a = "Hi"; // so it can be null or string
// ... 
// you can make it null later  
a = null;
let b;
const inputEl = document.getElementById("user-name"); // you can see here it can be null, if you put ! to the end it says it cant be null
// if (!inputEl){
//    throw new Error("element not found");
// }
console.log(inputEl === null || inputEl === void 0 ? void 0 : inputEl.value); // you can check it. It cant be null anymore typescript is clever enough to understand that
// user ? question mark if it can be null... If it is null it wont take the null if its not null it will take the value
// UNKNOWN
function process(val) {
    // it forces the developer to use if 
    if (typeof val === 'object' && !!val && 'log' in val && typeof val.log === 'function') // pretty complex code but you can describe many of them and make sure to safely execute the code
     {
        val.log();
    }
}
// OPTIONAL VALUE TYPES
function generateError(msg) {
    throw new Error(msg);
}
generateError("An error occured!");
// DOUBLE QUESTION MARK OPERATOR ??
let input = null;
const didProvideInput = input || false; // if there is get 'input' it it didnt provide it is false ( just it will use the false)
const didProvidedInput = input !== null && input !== void 0 ? input : false; // this one will control the input like undifend, null or 0 bla bla then it will do false
export {};
//# sourceMappingURL=basics.js.map