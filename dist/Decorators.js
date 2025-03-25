//? EcmaScript Decorators
// they start with @
// they change the other code's behaviors
// In Angular its so popular
// Typescript supports 2 kinds of decorator
// Decorators can be used without TypeScript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//? Experimental decorators
// only supported by typescript
function autobind(target, ctx // another one for method decorator
) {
    ctx.addInitializer(function () {
        this[ctx.name] = this[ctx.name].bind(this);
    }); // to allow you to render the method
    return function () {
        console.log('Executing original function!');
        target.apply(this); // like bind but this one changing the method
    };
}
// decorators = functions
function logger(target, ctx) {
    // for ecmascript decorators you must add at least 2 args
    // target is the argument we will use and ctx is the context for decorators
    console.log('logger decorator');
    console.log(target);
    console.log(ctx);
    return class extends target {
        // age = 25; // you can create extra class by this but just this will be caused to error thats why we are changing any 
        // type to generic types with T
        constructor(...args) {
            super(...args);
            console.log('class contructor');
            console.log(this);
        }
    };
}
//! field decorator
function replacer(initValue) {
    return function replacerDecorator(target, ctx) {
        console.log(target);
        console.log(ctx);
        return (initialValue) => {
            console.log(initialValue);
            return initValue; // initial value will be typed like "burak" but Hi I am '' will be empty so we changed the val
        };
    };
}
// after @ you put the function name that you want to use
// you can take features from a library by importing them
let Person = class Person {
    constructor() {
        this.name = 'Burak';
        this.greet = this.greet.bind(this); // this allows you to refer this.name
    }
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};
__decorate([
    replacer('') // bottom value will be changed to this empty one
], Person.prototype, "name", void 0);
__decorate([
    autobind
], Person.prototype, "greet", null);
Person = __decorate([
    logger
], Person);
const burak = new Person();
const greet = burak.greet;
greet(); // if you do that this.name will be give you error to solve this we must bind the person and greet
export {};
// you can add this to a library and the other developers can use them
//! last result
// undefined
// {
//   kind: 'field',
//   name: 'name',
//   static: false,
//   private: false,
//   access: { has: [Function: has], get: [Function: get], set: [Function: set] },
//   metadata: undefined,
//   addInitializer: [Function (anonymous)]
// }
// logger decorator
// [Function: Person]
// {
//   kind: 'class',
//   name: 'Person',
//   metadata: undefined,
//   addInitializer: [Function (anonymous)]
// }
// Burak
// class contructor
// class_1 { greet: [Function: bound bound ], name: '' }
// Executing original function!
// Hi, I am
//# sourceMappingURL=Decorators.js.map