//? EcmaScript Decorators
// they start with @
// they change the other code's behaviors
// In Angular its so popular
// Typescript supports 2 kinds of decorator
// Decorators can be used without TypeScript
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
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
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        // age = 25; // you can create extra class by this but just this will be caused to error thats why we are changing any 
        // type to generic types with T
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log('class contructor');
            console.log(_this);
            return _this;
        }
        return class_1;
    }(target));
}
//! field decorator
function replacer(initValue) {
    return function replacerDecorator(target, ctx) {
        console.log(target);
        console.log(ctx);
        return function (initialValue) {
            console.log(initialValue);
            return initValue; // initial value will be typed like "burak" but Hi I am '' will be empty so we changed the val
        };
    };
}
// after @ you put the function name that you want to use
// you can take features from a library by importing them
var Person = function () {
    var _classDecorators = [logger];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _greet_decorators;
    var Person = _classThis = /** @class */ (function () {
        function Person_1() {
            this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, 'Burak'));
            __runInitializers(this, _name_extraInitializers);
            this.greet = this.greet.bind(this); // this allows you to refer this.name
        }
        Person_1.prototype.greet = function () {
            console.log('Hi, I am ' + this.name);
        };
        return Person_1;
    }());
    __setFunctionName(_classThis, "Person");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [replacer('')];
        _greet_decorators = [autobind];
        __esDecorate(_classThis, null, _greet_decorators, { kind: "method", name: "greet", static: false, private: false, access: { has: function (obj) { return "greet" in obj; }, get: function (obj) { return obj.greet; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Person = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Person = _classThis;
}();
var burak = new Person();
var greet = burak.greet;
greet(); // if you do that this.name will be give you error to solve this we must bind the person and greet
// you can add this to a library and the other developers can use them
