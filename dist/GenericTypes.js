// Generic
let names = ['Burak', 'Ali']; // another way to describe string array
let store = {}; // we are describing it here for T
store.name = 'Burak';
// store.isIntructor = true; // we didnt let DataStore to be boolean thats why this wont work
let nameStore = {}; // so we can set up any store type 
// we can create more flexible types where we are using them
function merge(a, b) {
    return [a, b];
} // but there is a problem here because the types are same so it must be same type a and b to solve this problem => 23rd line
const ids = merge(1, 2); // and we can identify theirs type like this, typescript understands even if you didnt clarify
function mergeNew(n, m) {
    return [n, m];
}
const ids2 = mergeNew(1, 'Burak'); // so this works now
function mergeObj(a, b) {
    // getting an error on number because its not an object
    return Object.assign(Object.assign({}, a), b);
}
// we declared another U param so they wont be same type
const merged = mergeObj({ userName: 'Burak' }, { age: 25 }); // by this way it will work because we made them object
console.log(merged);
// you can create generic classes, interfaces or types like this
class User {
    constructor(id) {
        this.id = id;
    }
}
const user = new User(1);
export {};
//# sourceMappingURL=GenericTypes.js.map