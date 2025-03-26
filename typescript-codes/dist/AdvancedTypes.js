;
;
const fileSource = {
    type: 'file', // you can introduce the types like this
    path: 'some/path/to/file.csv',
};
const dbSource = {
    type: 'db',
    connectionUrl: 'some-connection-url',
};
function isFile(source) {
    return source.type === 'file'; // it will return a boolean value and it checks it's type
}
function loadData(source) {
    // open + read file or reach out to database server
    if (source.type === 'file') { // file or db type
        source.path;
        return;
    }
    // we should use "in" operator to see if there is a path in source
    // if ( 'path' in source  ){ // we need type guards so we must do it with "if", we dont need to check - typeof source === 'object' -
    //     source.path; // use that to open the file
    //     return;
    // } 
    source.connectionUrl; // reaching to database
}
class User {
    constructor(name) {
        this.name = name;
    }
    join() { }
    ;
}
class Admin {
    constructor(permissions) { }
    scan() { }
}
const user = new User('Burak');
const admin = new Admin(['ban', 'restore']);
function init(entity) {
    if (entity instanceof User) { // its let us to check if entity is a User
        entity.join();
        return;
    }
    entity.scan();
    // .join or .scan()
}
function getLength(val) {
    if (typeof val === 'string') {
        const numberOfWords = val.split(' ').length;
        return `${numberOfWords} words`; // n words
    }
    return val.length;
}
const numofWords = getLength('does this work?'); // the problem is if we leave it like this numofWords can be number or string for that
const numItems = getLength(['sports', 'cookies']);
// let someObj: Record< string, number | boolean >; // it tells which tyoes we will use as the keys like the way we made it top
let store = {};
store.id = 5;
store.isOpen = false; // by this way we can describe values as many as we want 
let roles = ['admin', 'guest', 'editor']; // this tells the typesciprt be narrow as much as you can while taking out variables
// as you can see now roles is readonly
// roles.push('Burak'); // we cant push now
const firstRole = roles[0]; // when we extract the role like this it cant be changed anytime it will be set to admin and 
// always be admin
const dataEntries = {
    entry1: 0.50,
    entry2: -3.52
}; // react routing using that
dataEntries.entry2;
export {};
//# sourceMappingURL=AdvancedTypes.js.map