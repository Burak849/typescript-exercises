"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Autobind Decorator
function autobind(_, _2, descriptor) {
    const originMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// Inputting Classes and Functions
class Input {
    constructor() {
        this.tempEl = document.getElementById('project-input'); // adding ! made it null able
        this.hostEl = document.getElementById('app');
        const importedContent = document.importNode(this.tempEl.content, true); // this includes in the HTMLTemplateElement 
        this.element = importedContent.firstElementChild;
        this.element.id = 'user-input'; // we are includeing the style name to id
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherInputs() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert('Invalid input');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearElements() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherInputs();
        if (Array.isArray(userInput)) { // tuple is an array thats why we are checking if array is an array
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearElements();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this)); // we are refering to subminHandler because if we dont use the bind(this) which is in the configure function
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element); // this is adding element to where, choose the place and the element
    }
}
__decorate([
    autobind
], Input.prototype, "submitHandler", null);
const projectInput = new Input();
