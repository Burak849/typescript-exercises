var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Sinif = /** @class */ (function () {
    function Sinif(n, a) {
        this.n = n;
        this.a = a;
        this.hobbies = []; // you cant add new value to the array
        this.name = n;
        this.age = a;
    }
    return Sinif;
}());
var isim0 = new Sinif('Ayse', 25);
// isim0.hobbies = ['Sports']; This doesnt work because its readonly you cant add a new value
isim0.hobbies.push('Sports'); // This is manipulating js so you dont add as a value but in memory
var User = /** @class */ (function () {
    // #itsmakeingprivate you can make this private in vanilla js 
    // if you add public or private it will automaticaly assign the value which you take in the user **
    function User(name, age) {
        this.name = name;
        this.age = age;
        this.hobbies = []; // you must initial value for array, so we described its string array values and its an array
        // private only accessable in classes
    }
    return User;
}());
var isim = new User('Burak', 25); // this contructor method will be called
var isim2 = new User('Ali', 26);
var isim3 = new User('Mehmet', 28);
console.log(isim, isim2, isim3); // to see the result =>tsc classAndinterface.ts => node classAndinterface.js
isim.age = 34; // you can assign it later but if you make it "private" you cant assign it later
var User2 = /** @class */ (function () {
    function User2() {
        // constructor( private firstName: string, private lastName: string ){
        // } Better way to use
        this._firstName = '';
        this._lastName = '';
    }
    Object.defineProperty(User2.prototype, "firstName", {
        set: function (nam) {
            if (nam.trim() === '') { // trim is to clean the spaces
                throw new Error('Invalid name.');
            }
            this._firstName = nam;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User2.prototype, "lastName", {
        set: function (nam) {
            if (nam.trim() === '') {
                throw new Error('Invalid name.');
            }
            this._lastName = nam;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User2.prototype, "fullName", {
        get: function () {
            return this._firstName + ' ' + this._lastName;
        },
        enumerable: false,
        configurable: true
    });
    User2.greetings = function () {
        console.log('Hello!');
    };
    // another one is static
    User2.eid = 'USER';
    return User2;
}());
console.log(User2.eid); // static prop can be accessable by class
User2.greetings(); // we accessed static func
var userIsim = new User2(); // now this will accept any arguments
userIsim.firstName = "Burak";
userIsim.lastName = 'Kurtulush';
console.log(userIsim.fullName);
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(jobTitle) {
        var _this = _super.call(this) || this; // for extends method you must call super in constructor function
        _this.jobTitle = jobTitle;
        return _this;
        // super.firstName = 'Burak'; You can use like this
    }
    Employee.prototype.work = function () {
        // ... codes here
        // console.log(this._firstName); you cant access private values in extended classes like this 
        // you should use "protected" to use in extended class
    };
    return Employee;
}(User2));
// abstract class is only in typescript
var UIElement = /** @class */ (function () {
    function UIElement(indentifier) {
        this.indentifier = indentifier;
    }
    UIElement.prototype.cloning = function (targetLocation) {
        // logic to duplicate the UI element
    };
    return UIElement;
}());
// let uiElement = new UIElement(); you cant use it like this
var SideDrawerElement = /** @class */ (function (_super) {
    __extends(SideDrawerElement, _super);
    function SideDrawerElement(identifier, position) {
        var _this = _super.call(this, identifier) || this; // we are taking the extended class's paramater
        _this.identifier = identifier;
        _this.position = position;
        return _this;
    }
    return SideDrawerElement;
}(UIElement));
// using way interface
var newObject;
newObject = {
    email: 'test@example.com',
    password: '123',
    role: 'Admin',
    login: function () {
        // react out to databas, check credentials, create a session
    },
    logout: function () {
        // clear the session
    },
};
var sum; // making sure sum can only store values of that function type
sum = function (a, b) { return a + b; }; // assigning a value that adheres to that function type
var AuthenticatableUser = /** @class */ (function () {
    // its implementing it and you can implement multiple interfaces 
    function AuthenticatableUser(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    AuthenticatableUser.prototype.login = function () { };
    AuthenticatableUser.prototype.logout = function () { };
    return AuthenticatableUser;
}());
function authenticate(kullanici) {
    kullanici.login(); // you can use it with a function
}
