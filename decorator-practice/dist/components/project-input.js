"use strict";
// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../utilities/validation.ts" />
// /// <reference path="../states/project-state.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const base_component_js_1 = require("./base-component.js");
const validation_js_1 = require("../utilities/validation.js");
const autobind_js_1 = require("../decorators/autobind.js");
const project_state_js_1 = require("../states/project-state.js");
// namespace App{
//! Project Input Class
class Input extends base_component_js_1.Component {
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement; // you can also use HTMLElement but we can be more specific we are refering to id = app in the end div
    // element: HTMLFormElement;
    titleInputElement;
    descriptionInputElement;
    peopleInputElement;
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        // this.tempEl = document.getElementById('project-input')! as HTMLTemplateElement; // adding ! made it null able
        // this.hostEl = document.getElementById('app')! as HTMLDivElement;
        // const importedContent = document.importNode( this.tempEl.content, true ); // this includes in the HTMLTemplateElement 
        // this.element = importedContent.firstElementChild as HTMLFormElement;
        // this.element.id = 'user-input'; // we are includeing the style name to id     ADDED ALL OF THEM TO SUPER FROM COMPONENT CLASS
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler); // we are refering to subminHandler because if we dont use the bind(this) which is in the configure function
    }
    renderContent() { }
    gatherInputs() {
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = this.peopleInputElement.value.trim();
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        // if ( enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0 ){
        if (!(0, validation_js_1.validate)(titleValidatable) ||
            !(0, validation_js_1.validate)(descriptionValidatable) ||
            !(0, validation_js_1.validate)(peopleValidatable)) {
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
            // console.log(title, desc, people);
            project_state_js_1.projectState.addProject(title, desc, people);
            this.clearElements();
        }
    }
}
exports.Input = Input;
__decorate([
    autobind_js_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], Input.prototype, "submitHandler", null);
// }
//# sourceMappingURL=project-input.js.map