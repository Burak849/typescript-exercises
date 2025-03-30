//! UNION - LITERAL TYPES AND ALIAS

type Combinable = number | string; // Combinable word instead of number and string types 
type ConversionDesc ='as-number' | 'as-text'; // example of using as an alias

function combine( 
    input1: Combinable, // number | string 
    input2: Combinable, // number | string
    resultConv: ConversionDesc // we allow just these 2 types => we changed the type from top with alias
) { // we said return is going to be string or number
    let result;
    if ( typeof input1 === 'number' && typeof input2 === 'number' || resultConv === 'as-number' ){
    result = +input1 + +input2; // converting the string to number
    } else{
        result = input1.toString() + input2.toString();
    }
    return result;
    // if ( resultConv === 'as-number' ){
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}

const combinedAges = combine(25, 30, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('25' , '22', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Burak', 'Ayse', 'as-text'); // value's type is number but we give them string so this occurs a problem thats why  we do many types
console.log(combinedNames);


function addAndHandle( nu1: number, nu2: number, cb: (num: number) => void ) { 
    const result = nu1 + nu2 ;
    cb(result);
}

function printResult(num: number): void{ // this doesnt return anything its just logging to control and why we calculate sth it can be typed to "undefined"
    console.log('Result ' + num);
} // functions cant be undefined altought they can be void or any

// console.log(printResult(add(5, 12)));

let combineValues: Function; // Function tells its just a random function
// let combineValues: (a:number, b:number) => number;   // works either take numbers and return number
// combineValues = add; // function(function)
combineValues = printResult;
console.log(combineValues(4 , 10)); // 14

addAndHandle(4, 5, (resu) => {
    console.log('addAndHandle Function works! : ' + resu);
}); // cb parameter was a function and it was giving us the calculated number so we just passed it to callback function with calculation numbers




let userInput: unknown; // we dont know yet if its  string or number and you can assign anything
let userName: string;

//? difference between unkown and any is => unknown cant be assigned to any type but type "any" can be assigned to another type

userInput = 5;
userInput = 'Burak';
if (typeof userInput === 'string'){
    userName = userInput; // this can run like this
}



// void vs never

function generateError( message: string, code: number ): never { // if you dont assign anything it will be void funciton
    throw {message: message, errorCode: code};
} // if you assigned the type "never" we say this function is going to never return anything  

const res = generateError('Error occured!', 500); 
// errorCode 500, message: Error occured!
console.log(res);

