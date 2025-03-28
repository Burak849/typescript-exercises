import fs from 'node:fs';
import {z} from 'zod';


// with zod you can descide define of the schema
const dataSchema = z.object({    
    title: z.string(),
    id: z.number(),
    values: z.array(z.union([ z.string(), z.number()] ))
}); 

// type Data =  {
//     title: string;
//     id: number;
//     values: (string | number)[];
// };   we can use z instead of this which is down here

type Data = z.infer<typeof dataSchema>; // we are passing the typeof dataSchema's objects to Data

function output(data: Data){
    console.log(data);
}

const content = JSON.parse(fs.readFileSync('data.json').toString());

const parsedData = dataSchema.parse(content);
output(parsedData);






// import _ from 'lodash'; // lodash is only js library thats why we are taking error
// // thats why we gotta install a new declaration file
// // you need to install extra library to use javascript library in typescript


// const numbers = [ 1, 2, 3, 4, 5];

// //split that into multiple arrays
// const chunkedArr = _.chunk(numbers, 2); // now all the information for chunk exists

// // Prisma(js library but there is a package to use in ts) and Zod are really good libraries for Typescript
// // zod is the ts-first library
