import { DragTarget } from '../models/drag-drop-interfaces.js'; // now draggable is available
import { Project, ProjectStatus } from '../models/project-model.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../states/project-state.js';
import { ProjectItem } from './project-item.js';

// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../states/project-state.ts" />
// /// <reference path="../models/project-model.ts" />



// namespace App {
    
//! Project List class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget { // we plugged in the Component class
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
        // this.renderContent();
    }

    renderContent(){ // we do not need to private method here
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
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
// }