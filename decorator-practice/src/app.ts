//! Project Types
enum ProjectStatus {
    Active,
    Finished
} // this is perfect to use in status

class Project{
    constructor( 
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus ){
    }
}


//! Project State Management Class
type Listener<T> = ( items: T[] ) => void; // we dont need return type whatever Listener gets

class State <T> {
    protected listeners: Listener<T>[] = []; // it cant still be accessed from outside but it can be accessed from extended ones (extends)  

    addListener( listenerFn : Listener<T> ){ // we wrote Function before but this is not any function now thats why overwriting Listener func
        this.listeners.push(listenerFn);
    }
    
}

class ProjectState extends State<Project> {
    
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor(){
        super();
    }

    static getInstance() {
        if (this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    

    addProject( title: string, description: string, numOfPeople: number){
        // const newProject= {  another way
        //     id: Math.random().toString(),
        //     title: title,
        //     description: description,
        //     people: numOfPeople
        // }
        const newProject = new Project(
            Math.random().toString(), 
            title, 
            description, 
            numOfPeople, 
            ProjectStatus.Active ); // you should declare the enum here

        this.projects.push(newProject);
        for ( const listenerFn of this.listeners ){
            listenerFn( this.projects.slice() ); // they cant be added from the place, it will be just copied
        } // every listener is making copy of our project now
    }
}
const projectState = ProjectState.getInstance();
//const projectState = new ProjectState(); // now its global constant

//! validation
interface Validatable {
    value: string | number;
    required?: boolean; 
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate( validatableInput: Validatable ){ // validation rules 
    let isValid = true;

    if ( validatableInput.required ){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0; // parsing to string because one of the inputs strings
    }

    if( validatableInput.minLength != null && typeof validatableInput.value === 'string' ){
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength ;
    }
    if( validatableInput.maxLength != null && typeof validatableInput.value === 'string' ){
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if ( validatableInput.min != null && typeof validatableInput.value === 'number' ){
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if ( validatableInput.max != null && typeof validatableInput.value === 'number' ){
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

//! Autobind Decorator
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
//! Component Base Class
 abstract class Component<T extends HTMLElement, U extends HTMLElement> { // we can create extra functionalities
    tempEl: HTMLTemplateElement;
    hostEl: T; 
    element: U;

    constructor( templateId: string, hosElementId: string, insertAtStart: boolean, newElementId?: string  ){ // question marked one must always be at the end 
        this.tempEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostEl = document.getElementById(hosElementId)! as T;

        const importedContent = document.importNode( this.tempEl.content, true ); // this includes in the HTMLTemplateElement 
        this.element = importedContent.firstElementChild as U;
        if(newElementId){
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
        this.renderContent();
        this.configure();
    }
    private attach(insertAtBeginning: boolean){
        this.hostEl.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element); // we teach how to insert it
    }

    abstract configure(): void;
    abstract renderContent(): void;
    // you cant private the abstracts
}

//! Project List class
class ProjectList extends Component<HTMLDivElement, HTMLElement> { // we plugged in the Component class
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement; 
    // element: HTMLElement; // we are taking those from component class
    assignedProjects: any[];  

    constructor( private type: 'active' | 'finished' ){ // here we could use enum like the top but we need the type down in this.element.id
       super('project-list', 'app', false, `${type}-project`); // we must add this because extending another class
        // this.tempEl = document.getElementById('project-list')! as HTMLTemplateElement; // adding ! made it null able, we dont need this anymore
        // this.hostEl = document.getElementById('app')! as HTMLDivElement; we are using those in super
        this.assignedProjects = [];

        // const importedContent = document.importNode( this.tempEl.content, true ); // this includes in the HTMLTemplateElement 
        // this.element = importedContent.firstElementChild as HTMLElement;
        // this.element.id = `${this.type}-project`;

        this.configure();
        this.renderContent();
    }
    configure() { // we took this from constructor to configure
        projectState.addListener( (projects: Project[]) => {
            // now we are going to create a filter here
            const relProjects = projects.filter( prj => {
                if( this.type === 'active'){
                    return prj.status === ProjectStatus.Active; // this is filtering, if project status is active filter the class to active
                }
                return prj.status === ProjectStatus.Finished;
            } ); // .filter() is a js default method, prj.status is enum
            this.assignedProjects = relProjects; // we are overriding the project, and we added the filtered projects 
            this.renderProjects();
        });

        // this.attach(); this will be called in the based component
        this.renderContent();
    }

    renderContent(){ // we do not need to private method here
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }

    private renderProjects () {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = ''; // we will render all the project by getting rid of the others //? BUG : If we add 2nd element it duplicates check that
        for ( const projectItems of this.assignedProjects ){
            const listItem = document.createElement('li');
            listItem.textContent = projectItems.title; // every project item will be project by title
            listEl?.appendChild(listItem);
        }
    }
    
    // private attach(){
    //     this.hostEl.insertAdjacentElement('beforeend', this.element);
    // } in component

}

//! Project Input Class
class Input extends Component<HTMLDivElement, HTMLFormElement> {
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
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max:5
        };

        // if ( enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0 ){
        if(
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable) 
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

    

    // private attach(){
    //     this.hostEl.insertAdjacentElement('afterbegin', this.element); // this is adding element to where, choose the place and the element
    // } base class 
}

const projectInput = new Input();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

