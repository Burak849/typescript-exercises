type FileData = {
    path:string;
    content:string;
};
type Status ={
    isOpen:boolean;
    errorMessage?: string;
};

interface DatabaseData {
    connectionUrl: string;
    credentials: string;
};
interface exampleData {
    orn:string;
};

type AccessedFileData = FileData & Status; // we are combining the shared properities

interface AccessedDatabaseData extends DatabaseData , Status {

} // or we can make it from interface 

//******************************************************

type FileSource = { type: 'file'; path:string }; 
const fileSource: FileSource = {
    type: 'file', // you can introduce the types like this
    path: 'some/path/to/file.csv',
};

type DBSource = { type: 'db'; connectionUrl: string }; // database connection
const dbSource: DBSource ={
    type: 'db', 
    connectionUrl: 'some-connection-url',
};

type Source = FileSource | DBSource; // it depends which we use

function isFile( source: Source ){
    return source.type === 'file'; // it will return a boolean value and it checks it's type
}

function loadData ( source: Source ){
    // open + read file or reach out to database server
    if ( source.type === 'file' ){ // file or db type
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


class User{
    constructor( public name: string){}
    join(){};
}

class Admin {
    constructor( permissions: string[] ){}

    scan(){}
}

const user = new User('Burak');
const admin = new Admin(['ban', 'restore']);

type Entity = User | Admin;


function init(entity: Entity){
    if ( entity instanceof User ){ // its let us to check if entity is a User
        entity.join();
        return;
    }

    entity.scan();
    // .join or .scan()
}
function getLength( val: any[] ): number;  // By this way we are telling typesciprt that output will be array
function getLength( val: string ): string; // and this one will be string
function getLength( val: string | any[] ) {
    if ( typeof val === 'string' ){
        const numberOfWords = val.split(' ').length;
        return `${numberOfWords} words`; // n words
    }
    return val.length;
}

const numofWords = getLength('does this work?'); // the problem is if we leave it like this numofWords can be number or string for that
const numItems = getLength(['sports','cookies']);


type DataStore = {
    [prop: string]: number | boolean; // this is the flexibilty for the types
};

 // let someObj: Record< string, number | boolean >; // it tells which tyoes we will use as the keys like the way we made it top

let store: DataStore = {};

store.id = 5;
store.isOpen = false; // by this way we can describe values as many as we want 

let roles = ['admin', 'guest', 'editor'] as const; // this tells the typesciprt be narrow as much as you can while taking out variables
// as you can see now roles is readonly

// roles.push('Burak'); // we cant push now

const firstRole = roles[0]; // when we extract the role like this it cant be changed anytime it will be set to admin and 
// always be admin

const dataEntries = { // : Record< string, number > => we can use satisfies
    entry1: 0.50,
    entry2: -3.52
} satisfies Record< string, number >; // react routing using that

dataEntries.entry2;