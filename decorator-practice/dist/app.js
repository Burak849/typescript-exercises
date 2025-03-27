"use strict";
//! Drag and Drop interfaces
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//! Project Types
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {})); // enum is perfect to use in status
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = []; // it cant still be accessed from outside but it can be accessed from extended ones (extends)  
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        // const newProject= {  another way
        //     id: Math.random().toString(),
        //     title: title,
        //     description: description,
        //     people: numOfPeople
        // }
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active); // you should declare the enum here
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    } // if we dont dude that it can be dragging and dropping to the same box and it will always trigger the data
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // they cant be added from the place, it will be just copied
        } // every listener is making copy of our project now
    }
}
const projectState = ProjectState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0; // parsing to string because one of the inputs strings
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
//! Autobind Decorator
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
//! Component Base Class
class Component {
    constructor(templateId, hosElementId, insertAtStart, newElementId) {
        this.tempEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hosElementId);
        const importedContent = document.importNode(this.tempEl.content, true); // this includes in the HTMLTemplateElement 
        this.element = importedContent.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
        this.renderContent();
        this.configure();
    }
    attach(insertAtBeginning) {
        this.hostEl.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element); // we teach how to insert it
    }
}
//! Project Item Class
class ProjectItem extends Component {
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id); // where the item will be rendered in we will provide the id here
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id); // this is java script prop to transfer the data and set it, text/plain means we are going to attack a text file with plain 
        // this.project.id is fetching the data
        event.dataTransfer.effectAllowed = 'move'; // telling the browser to move the element
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }
    ;
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title; // rendered element
        this.element.querySelector('h3').textContent = this.persons + ' assigned'; // we dont need to type this.project.people.toString() anymore becase
        // we are using getter method, like this its trigger the getter
        this.element.querySelector('p').textContent = this.project.description;
    }
    ;
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectItem.prototype, "dragStartHandler", null);
//! Project List class
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-project`); // we must add this because extending another class
        this.type = type;
        // this.tempEl = document.getElementById('project-list')! as HTMLTemplateElement; // adding ! made it null able, we dont need this anymore
        // this.hostEl = document.getElementById('app')! as HTMLDivElement; we are using those in super
        this.assignedProjects = [];
        // const importedContent = document.importNode( this.tempEl.content, true ); // this includes in the HTMLTemplateElement 
        // this.element = importedContent.firstElementChild as HTMLElement;
        // this.element.id = `${this.type}-project`;
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault(); // only for this you will allow to drop
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
            // now we are going to create a filter here
            const relProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active; // this is filtering, if project status is active filter the class to active
                }
                return prj.status === ProjectStatus.Finished;
            }); // .filter() is a js default method, prj.status is enum
            this.assignedProjects = relProjects; // we are overriding the project, and we added the filtered projects 
            this.renderProjects();
        });
        // this.attach(); this will be called in the based component
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = ''; // we will render all the project by getting rid of the others //? BUG : If we add 2nd element it duplicates check that
        for (const projectItems of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, projectItems); // this.element.id also counting the section element from html and add it to DOM, thats why we got it by queryselector
            // const listItem = document.createElement('li');
            // listItem.textContent = projectItems.title; // every project item will be project by title
            // listEl?.appendChild(listItem);
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dropHandler", null);
//! Project Input Class
class Input extends Component {
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
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
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
            projectState.addProject(title, desc, people);
            this.clearElements();
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], Input.prototype, "submitHandler", null);
const projectInput = new Input();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
