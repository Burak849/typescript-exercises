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


const isimler: Array<string> = []; // === string[]     those are same things
isimler[0].split(' '); // now we can use like this

const promise: Promise<string> = new Promise( ( resolve, reject ) => {
    setTimeout( () =>{
        resolve('This is done!');
    },2000);
    reject('This is not done!');
});

promise.then( data => {
    data.split(' '); // we gave string if you try to give the value as number it will be error
});

function merges<T, U>( objA: T , objB: U ) {
    return Object.assign( {} , objA, objB);
}

const mergedObj = merges<{name:string, hobbies: string[]}, {age:number}>({name: 'Ayse', hobbies: ['Sports']}, {age:30});
console.log(mergedObj);

 
interface Lengthy{
    length:number;
}

function countAndPrint<T extends Lengthy> (element: T): [T, string] {  // tuple end of the line
    let descriptonText = 'Got no value';
    if ( element.length > 0 ){
        descriptonText = 'Got ' + element.length + ' elements'
    } else if ( element.length > 1 ){
        descriptonText = 'Got ' + element.length + ' elements'
    }
    return [element,descriptonText];
}
console.log(countAndPrint('Hi there!'));

function exractAndConvert<T extends object, U extends keyof T> ( obj: T, key:U ){ // first parameter any kind of object and 2nd parameter
    // is the any key of object
    return obj[key]; 
}

exractAndConvert({name:'Max'}, 'name'); // 2nd parameter-> so we are just accessing the key "name" because its the key of the object

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        this.data.splice(this.data.indexOf(item), 1); // when we work with arrays or objects that wont be good 
    }
    getItems(){
        return [...this.data];
    }
}
const textStorage = new DataStorage<string>();
textStorage.addItem('Veli');
textStorage.addItem('Omer');
textStorage.removeItem('Veli');
console.log(textStorage.getItems());

//const numberStorage = new DataStorage<number>(); // we have flexibility

const objStorage = new DataStorage<object>();
objStorage.addItem({name: 'Max'});
objStorage.addItem({name: 'Malu'});
objStorage.removeItem({name: 'Malu'});
console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal( title: string, description: string, date: Date): CourseGoal{
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil= date;
    return courseGoal as CourseGoal;
}

const isims: Readonly<string[]> = ['burak', 'ayse'];
// isims.push('John') it will be cant changable because its readonly string array
// isims.pop();