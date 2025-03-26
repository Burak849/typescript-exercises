//! TYPEOF OPERATOR
const userName = 'Burak';
console.log(typeof userName);
// when userName declared with "let" then type UserName would be just the type of the userName => string 
const settings = {
    difficulty: 'easy',
    minLevel: 10,
    didStart: false,
    players: ['Ayse', 'Mehmet']
};
function loadData(s) {
    // ...
}
loadData(settings);
let validKey;
validKey = 'name';
validKey = 'age';
function getProp(obj, key) {
    const val = obj[key]; // Key abstraction way in Javascript
    if (val === undefined || val === null) {
        throw new Error('Accessing undefined or null value.');
    }
    return val;
}
const data = { id: 1, isStored: false, values: [1, 5, 6] };
const isStored = getProp(data, 'values'); // you can pick any of the objects
const user = { name: 'Burak', age: 25 };
const val = getProp(user, 'age'); // due to second key the value getting the type
//! INDEXED ACCESS TYPES
const appUser = {
    name: 'Burak',
    age: 25,
    permissions: [{ id: 'p1', title: 'Admin', description: 'Admin access' }],
};
let mathOperations = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    }
};
let mathResults = {
    add: mathOperations.add(1, 2),
    subtract: mathOperations.subtract(5, 3) // if you delete one of these it will throw an error because it wants both of the objects
}; // but we put ? question mark to  [Key in keyof T] ?: number  thats why it can be undefined
// if you put the question mark add and subtract in type Operation it will everything flexibily
mathResults.add = 10; // this wont work because its readonly
//! TEMPLATE LITERAL TYPES
const mainUserName = 'Ali';
const greetings = `Hi there, ${mainUserName}.`;
function getFullname(person) {
    if ('firstName' in person && 'lastName' in person && person.firstName && person.lastName) { // checks if the object fill
        return `${person.firstName} ${person.lastName}`;
    }
    throw new Error("No first name and/or last name found.");
}
const name1 = getFullname({}); // never
const name2 = getFullname({ firstName: 'Burak', lastName: 'Kurtulus' }); // string
//! INFER KEYWORD
function addNew(a, b) {
    return a + b;
}
export {};
// type AddFnReturnValueType = ReturnType<AddFn>; // ReturnType is Typescript's utility type so you dont need to do ReturnValueType
//# sourceMappingURL=DerivingTypes.js.map