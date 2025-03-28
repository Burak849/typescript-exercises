import _ from 'lodash'; // lodash is only js library thats why we are taking error
// thats why we gotta install a new declaration file
// you need to install extra library to use javascript library in typescript


const numbers = [ 1, 2, 3, 4, 5];

//split that into multiple arrays
const chunkedArr = _.chunk(numbers, 2); // now all the information for chunk exists