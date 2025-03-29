//! UNION - LITERAL TYPES AND ALIAS

type Combinable = number | string; // Combinable word instead of number and string types 
type ConversionDesc ='as-number' | 'as-text'; // example of using as an alias

function combine( 
    input1: Combinable, //number | string 
    input2: Combinable, //number | string
    resultConv: ConversionDesc // we allow just these 2 types => we changed the type from top with alias
){
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







