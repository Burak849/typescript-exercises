import { describe } from "node:test";

class Sinif { // start with uppercase letter 
    name: string; // you gotta add properities to use in constructor function
    age: number; 
    public readonly hobbies: string[] =[]; // you cant add new value to the array
    constructor( public n: string, public a: number ){ // special function belongs to class
        this.name = n;
        this.age = a;
    }
}
const isim0 = new Sinif('Ayse', 25);
// isim0.hobbies = ['Sports']; This doesnt work because its readonly you cant add a new value
isim0.hobbies.push('Sports'); // This is manipulating js so you dont add as a value but in memory

class User {
    public hobbies: string[] = []; // you must initial value for array, so we described its string array values and its an array
    // #itsmakeingprivate you can make this private in vanilla js 
    // if you add public or private it will automaticaly assign the value which you take in the user **
    constructor( public name: string, public age?: number ) { // with the question mark we made it undefined and number so it can stay undefined 
                                                              // private only accessable in classes
    }
}

const isim = new User('Burak', 25); // this contructor method will be called
const isim2 = new User('Ali', 26); 
const isim3 = new User('Mehmet', 28);

console.log(isim, isim2, isim3 ); // to see the result =>tsc classAndinterface.ts => node classAndinterface.js

isim.age = 34; // you can assign it later but if you make it "private" you cant assign it later



class User2 {
    // constructor( private firstName: string, private lastName: string ){
         
    // } Better way to use
    private _firstName: string = '';
    private _lastName: string = '';

    set firstName( nam: string) {
        if ( nam.trim() === '' ){ // trim is to clean the spaces
            throw new Error('Invalid name.');
        }
        this._firstName = nam;
    }

    set lastName( nam: string) {
        if ( nam.trim() === '' ){
            throw new Error('Invalid name.');
        }
        this._lastName = nam;
    }

    get fullName() { // it must be outside of the constructor so it is public you can access it outside of the class
        return this._firstName + ' ' + this._lastName;
    }
    // another one is static
    static eid = 'USER'; 
    static greetings(){
        console.log('Hello!');
    }
}
console.log(User2.eid); // static prop can be accessable by class
User2.greetings(); // we accessed static func

const userIsim = new User2(); // now this will accept any arguments
userIsim.firstName = "Burak";
userIsim.lastName = 'Kurtulush';
console.log(userIsim.fullName); 


class Employee extends User2 { // this Employee class is now taking the classifications from User2 class
    constructor( public jobTitle: string ){
        super(); // for extends method you must call super in constructor function
        // super.firstName = 'Burak'; You can use like this

    }

    work() {
        // ... codes here
        // console.log(this._firstName); you cant access private values in extended classes like this 
        // you should use "protected" to use in extended class

    }
}

// abstract class is only in typescript
abstract class UIElement { // you cant directly initiate the abstract classes
    constructor( public indentifier: string ){

    }
    cloning( targetLocation: string ){
        // logic to duplicate the UI element
    }
}

// let uiElement = new UIElement(); you cant use it like this

class SideDrawerElement extends UIElement { // this is the idea of abstract classes you should extends them to use
    constructor ( public identifier: string, public position: 'left' | 'right' ){
        super(identifier); // we are taking the extended class's paramater
    }

    // ...
}


// INTERFACES ( There is no Interfaces in Javascript )

interface AuthenticatableUsers {
    email: string; // checking properities 
    password: string;

    // login and logout methods
    login(): void; 
    logout(): void;
}

// why we use interfaces? => you can make it both way with type and interfaces but there is one difference with a senerio

// you can easily add extra properities in interface like this
interface AuthenticatableUsers{
    role: string;
} // you cant do that with "type"

// using way interface
let newObject: AuthenticatableUsers;

newObject = {
    email: 'test@example.com',
    password: '123',
    role: 'Admin',
    login() {
        // react out to databas, check credentials, create a session
    },
    logout() {
        // clear the session
    },
}

type SumFn = (a: number, b: number) => number; // function type
 
let sum: SumFn; // making sure sum can only store values of that function type
 
sum = (a, b) => a + b; // assigning a value that adheres to that function type

interface SumFn2 {
    (a: number, b: number): number;
  } // this is the other way


  class AuthenticatableUser implements AuthenticatableUsers{ // implements key word works with interface stucture and 
  // its implementing it and you can implement multiple interfaces 

  constructor( public email: string, public password: string, public role:string ){

  }

    login(){}
    logout(){}
}


function authenticate( kullanici: AuthenticatableUser ){
    kullanici.login(); // you can use it with a function
}

interface AuthenticatableAdmin extends AuthenticatableUsers{
    role: 'Admin' | 'Superadmin'; // you can extends for login and logout processes
    // with extends method we dont touch the original instead of we create addition interface and we use its properities there
} 

class Department {
    // private id: string;
    // private name: string;
    static fiscalYear = 2025; // statics cant be called with "this" you must use like Department.fiscalYear

    private employees: string[] = []; 

    constructor( private readonly id:string, public name: string){ // normally you dont need to clarify the public one but in construction needs public
        // this.id = id;
        // this.name1 = name1;
    }

    static createEmployee(name: string) {
        return {name:name};
    }

    describe( this: Department ){ // to solve "this" problem (you cant acces the value outside of the class) 
                                  // you can add special parament to "describe" method and give the class's tpye
    console.log(`Department ${this.id} : ${this.name}`); // to use property globally in the class we must write "this" keyword 

    }// calling method in created object

    addEmployee( employee : string ){
        // validation will be required
        this.employees.push(employee);
    }

    printEmployeeInform(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
} // "this" cannot be referd outside of the method 

class ITDepartment extends Department{ // department is automatically used so thats why super requires 2 definations
    admins: string[];
    constructor( id: string, admins: string[] ){
        super(id , 'IT'); // calls constructor of the base class
        // you gotta satisfy the super with the keywords before using "this" keyword.
        this.admins = admins;
    }
}

const employee1 = Department.createEmployee('AA');
console.log(employee1,Department.fiscalYear); // you can acces the statics like this


const accounting = new Department( Math.random().toString(),'Accounting'); // created new department object
const accountin2 = new ITDepartment( 'd1' , ['Omer']); // created new department object
accountin2.addEmployee('Hans');
console.log(accountin2);


accounting.addEmployee('Ali');
accounting.addEmployee('Mehmet'); // accessing to employees like this is not a good idea for that we shall make it private

// accounting.employees[2] = 'Enes'; so they cant add like this

console.log(accounting);
accounting.describe();

const accountingCopy = { name:"Dummy" , describe: accounting.describe};
accounting.describe();

interface Person{
    name:string;
    age: number;
    greet ( phrase : string ): void;
}

let user1: Person;
user1 = {
    name: 'Burak',
    age: 25,
    greet(phrase : string){
        console.log( phrase + ' ' + this.name );
    }
};

user1.greet('Hi there!');

// you can implement interface more than one to classes