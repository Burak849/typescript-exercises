//! Drag and Drop interfaces

interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget{
    dragOverHandler(event: DragEvent) :void;
    dropHandler(event: DragEvent) :void;
    dragLeaveHandler(event: DragEvent) :void;
}



//! Project Types
enum ProjectStatus {
    Active,
    Finished
} // enum is perfect to use in status

class Project{
    constructor( 
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus ){}
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
    
    private projects: Project[] = [];
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
        this.updateListeners();
        }

    moveProject(projectId: string, newStatus: ProjectStatus ){
        const project = this.projects.find( prj => prj.id === projectId );
        if ( project && project.status !== newStatus ){
            project.status = newStatus;
            this.updateListeners();
        }
    } // if we dont dude that it can be dragging and dropping to the same box and it will always trigger the data

    private updateListeners(){
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
function autobind ( _: any, _2: string | symbol, descriptor: PropertyDescriptor ){
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
//! Project Item Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons(){ // we are using that to clarify the number of people and changing the message depends their population
        if( this.project.people === 1){
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project ){
        super( 'single-project', hostId, false, project.id ); // where the item will be rendered in we will provide the id here
        this.project = project;

        this.configure();
        this.renderContent();
    }
    @autobind
    dragStartHandler(event: DragEvent){
        event.dataTransfer!.setData('text/plain', this.project.id); // this is java script prop to transfer the data and set it, text/plain means we are going to attack a text file with plain 
    // this.project.id is fetching the data
    event.dataTransfer!.effectAllowed = 'move'; // telling the browser to move the element
    }
    
    dragEndHandler(_: DragEvent){
        console.log('DragEnd');
    }
    
    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler);
    };

    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title; // rendered element
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned'; // we dont need to type this.project.people.toString() anymore becase
        // we are using getter method, like this its trigger the getter
        this.element.querySelector('p')!.textContent = this.project.description;
    };
}

//! Project List class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget { // we plugged in the Component class
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement; 
    // element: HTMLElement; // we are taking those from component class
    assignedProjects: Project[];  
    

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

    @autobind
    dragOverHandler(event: DragEvent){
        if ( event.dataTransfer && event.dataTransfer.types[0] === 'text/plain' ){
            event.preventDefault(); // only for this you will allow to drop
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @autobind
    dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished );
    }

    configure() { // we took this from constructor to configure
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
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
        this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS';
  }

    private renderProjects () {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = ''; // we will render all the project by getting rid of the others //? BUG : If we add 2nd element it duplicates check that
        for ( const projectItems of this.assignedProjects ){
            new ProjectItem(this.element.querySelector('ul')!.id, projectItems); // this.element.id also counting the section element from html and add it to DOM, thats why we got it by queryselector

            // const listItem = document.createElement('li');
            // listItem.textContent = projectItems.title; // every project item will be project by title
            // listEl?.appendChild(listItem);
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
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = this.peopleInputElement.value.trim();

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

