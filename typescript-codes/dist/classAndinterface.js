class Sinif {
    constructor(n, a) {
        this.n = n;
        this.a = a;
        this.hobbies = []; // you cant add new value to the array
        this.name = n;
        this.age = a;
    }
}
const isim0 = new Sinif('Ayse', 25);
// isim0.hobbies = ['Sports']; This doesnt work because its readonly you cant add a new value
isim0.hobbies.push('Sports'); // This is manipulating js so you dont add as a value but in memory
class User {
    // #itsmakeingprivate you can make this private in vanilla js 
    // if you add public or private it will automaticaly assign the value which you take in the user **
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.hobbies = []; // you must initial value for array, so we described its string array values and its an array
        // private only accessable in classes
    }
}
const isim = new User('Burak', 25); // this contructor method will be called
const isim2 = new User('Ali', 26);
const isim3 = new User('Mehmet', 28);
console.log(isim, isim2, isim3); // to see the result =>tsc classAndinterface.ts => node classAndinterface.js
isim.age = 34; // you can assign it later but if you make it "private" you cant assign it later
class User2 {
    constructor() {
        // constructor( private firstName: string, private lastName: string ){
        // } Better way to use
        this._firstName = '';
        this._lastName = '';
    }
    set firstName(nam) {
        if (nam.trim() === '') { // trim is to clean the spaces
            throw new Error('Invalid name.');
        }
        this._firstName = nam;
    }
    set lastName(nam) {
        if (nam.trim() === '') {
            throw new Error('Invalid name.');
        }
        this._lastName = nam;
    }
    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }
    static greetings() {
        console.log('Hello!');
    }
}
// another one is static
User2.eid = 'USER';
console.log(User2.eid); // static prop can be accessable by class
User2.greetings(); // we accessed static func
const userIsim = new User2(); // now this will accept any arguments
userIsim.firstName = "Burak";
userIsim.lastName = 'Kurtulush';
console.log(userIsim.fullName);
class Employee extends User2 {
    constructor(jobTitle) {
        super(); // for extends method you must call super in constructor function
        this.jobTitle = jobTitle;
        // super.firstName = 'Burak'; You can use like this
    }
    work() {
        // ... codes here
        // console.log(this._firstName); you cant access private values in extended classes like this 
        // you should use "protected" to use in extended class
    }
}
// abstract class is only in typescript
class UIElement {
    constructor(indentifier) {
        this.indentifier = indentifier;
    }
    cloning(targetLocation) {
        // logic to duplicate the UI element
    }
}
// let uiElement = new UIElement(); you cant use it like this
class SideDrawerElement extends UIElement {
    constructor(identifier, position) {
        super(identifier); // we are taking the extended class's paramater
        this.identifier = identifier;
        this.position = position;
    }
}
// using way interface
let newObject;
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
};
let sum; // making sure sum can only store values of that function type
sum = (a, b) => a + b; // assigning a value that adheres to that function type
class AuthenticatableUser {
    // its implementing it and you can implement multiple interfaces 
    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    login() { }
    logout() { }
}
function authenticate(kullanici) {
    kullanici.login(); // you can use it with a function
}
export {};
//# sourceMappingURL=classAndinterface.js.map