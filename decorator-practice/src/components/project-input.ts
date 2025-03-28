import Cmp from "./base-component.js"; // this is available for export default ones
import * as Validation from "../utilities/validation.js"; // this is alias to use you can use anywhere while importing
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../states/project-state.js";

// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../utilities/validation.ts" />
// /// <reference path="../states/project-state.ts" />


// namespace App{
    //! Project Input Class
export class Input extends Cmp<HTMLDivElement, HTMLFormElement> {
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement; // you can also use HTMLElement but we can be more specific we are refering to id = app in the end div
    // element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){    
        super('project-input' , 'app', true, 'user-input')
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement; 
        this.configure();
        
        // this.tempEl = document.getElementById('project-input')! as HTMLTemplateElement; // adding ! made it null able
        // this.hostEl = document.getElementById('app')! as HTMLDivElement;
    
        // const importedContent = document.importNode( this.tempEl.content, true ); // this includes in the HTMLTemplateElement 
        // this.element = importedContent.firstElementChild as HTMLFormElement;
        // this.element.id = 'user-input'; // we are includeing the style name to id     ADDED ALL OF THEM TO SUPER FROM COMPONENT CLASS
    }

    configure(){
        this.element.addEventListener('submit', this.submitHandler ); // we are refering to subminHandler because if we dont use the bind(this) which is in the configure function
    }

    renderContent(){}

    private gatherInputs(): [string, string, number] | void { // returns a tuple, we say that we will take from inputs as first element srting 2nd string and 3rd is number OR nothing
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = this.peopleInputElement.value.trim();

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max:5
        };

        // if ( enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0 ){
        if(
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(peopleValidatable) 
         ){ 
        alert('Invalid input');
            return;
        } else{
            return [enteredTitle, enteredDescription, +enteredPeople ]
        }
    }

    private clearElements(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler( event: Event ){
        event.preventDefault();
        const userInput = this.gatherInputs();
        if ( Array.isArray(userInput) ){ // tuple is an array thats why we are checking if array is an array
            const [title, desc, people] = userInput;
            // console.log(title, desc, people);
            projectState.addProject( title , desc, people );
            this.clearElements();
        }
    }

}
// }