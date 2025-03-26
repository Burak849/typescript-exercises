import fs from 'node:fs';  // its not a nodejs project thats why it doesnt work if you use "npm init -y" command it will take json package and you can change the modal 
// npm install @types/node or react or lodash code to use packages

// fs.readFileSync()  its to use in API
let usersName: string;

usersName = 'Burak';

console.log(usersName);

function add(a: any,b: any){
    return a + b;
}

console.log(add(1,2));