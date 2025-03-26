// Autobind Decorator
function autobind ( _: any, _2: string, descriptor: PropertyDescriptor ){
    const originMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            const boundFn = originMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}



// Inputting Classes and Functions
class Input {
    tempEl: HTMLTemplateElement;
    hostEl: HTMLDivElement; // you can also use HTMLElement but we can be more specific we are refering to id = app in the end div
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){    
        this.tempEl = document.getElementById('project-input')! as HTMLTemplateElement; // adding ! made it null able
        this.hostEl = document.getElementById('app')! as HTMLDivElement;
    
        const importedContent = document.importNode( this.tempEl.content, true ); // this includes in the HTMLTemplateElement 
        this.element = importedContent.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'; // we are includeing the style name to id

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
        this.attach();
    }

    private gatherInputs(): [string, string, number] | void { // returns a tuple, we say that we will take from inputs as first element srting 2nd string and 3rd is number OR nothing
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if ( enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0 ){
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
            console.log(title, desc, people);
            this.clearElements();
        }
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler.bind(this) ); // we are refering to subminHandler because if we dont use the bind(this) which is in the configure function
    }

    private attach(){
        this.hostEl.insertAdjacentElement('afterbegin', this.element); // this is adding element to where, choose the place and the element
    }
}

const projectInput = new Input();