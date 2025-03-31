// import fs from 'node:fs';  // its not a nodejs project thats why it doesnt work if you use "npm init -y" command it will take json package and you can change the modal 
// npm install @types/node or react or lodash code to use packages

// fs.readFileSync()  its to use in API
let usersName: string;
usersName = 'Burak';

console.log(usersName);

function add(a: any,b: any){
    return a + b;
}

console.log(add(1,2));

// tsc app.ts --watch or tsc app.ts -w mean we are running the compiler in watching mode so it redesign the js file everytime we save
// tsc -w effects all the files and when saved it compiles all files
// tsc --int  => tsconfig.json will be managed

// es5 = older browsers, there is no let or const, compiles every ts files 
// es6 = newer one let const has and more specifics
// with dom.iterable, scripthost we are using all the core abilities
// allowJs = js will be compiled from ts
// checkJs = report the possible errors
// outDir =  we are telling the compiler when you created compiled files put them to this file 

// noImplicitReturns = when you put return inside of "if statement" then you didnt before the last bracket it tells you at least write "return;"


