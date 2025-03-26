// MODULE LESSONS TO REMEMBER JAVASCRIPT  

const userName = 'Burak';
// userName = 'Ali'; you cant change the variable in const

let age = 25;
age = 26; // you can change let

let result; // now let and var is global and same
function ekle( a: number, b : number) {
    result = a + b;
    return result;
} // if i describe them in the function it wont work

console.log(result);


// if ( age > 20){
//    var isOld = true;
// }
// console.log(idOld);  this doesnt work because we are describing the value in {} 

const add = ( a:number, b:number = 1 ) =>  a + b;  // you dont need return if you have single row for arrow function, It has default arg
console.log(add(2,5));

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');
if ( button ){
    button.addEventListener('click', event => console.log(event) );
} // variations for arrow functions

printOutput(add(5));


const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies); // It tells that add separeted elements


const person = {
    firstName: 'burak',
    yo: 25
};

const copiedPerson = {...person}; // it takes all key values


const adding = ( ...numbers: number[] ) => {
    return numbers.reduce( (curResult, curValue) => { 
        return curResult + curValue; 
    } , 0);
}; // now you can add numbers es much as you want

const addedNumbers = adding(5,1,2,6,3.5);
console.log(addedNumbers);

// push takes couple of items(strings), reduce is to calculate in an array


const [ hobby1, hobby2, ...remainingHobbies ] = hobbies; // this is to get all the array elements
console.log(hobbies, hobby1, hobby2); // so you can see hobbies is still there as an array we copied out elements like this on top line

const { firstName: names, yo } = person; // we can take out the variables from object
console.log(names, yo, person);
