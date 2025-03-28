import { Draggable } from '../models/drag-drop-interfaces.js'; // now draggable is available
import { Project } from '../models/project-model.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';

// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../models/project-model.ts" />
// /// <reference path="../models/drag-drop-interfaces.ts" />


// namespace App{
    //! Project Item Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
// }