"use strict";
// /// <reference path="base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../states/project-state.ts" />
// /// <reference path="../models/project-model.ts" />
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
exports.ProjectList = void 0;
const project_model_js_1 = require("../models/project-model.js");
const base_component_js_1 = require("./base-component.js");
const autobind_js_1 = require("../decorators/autobind.js");
const project_state_js_1 = require("../states/project-state.js");
const project_item_js_1 = require("./project-item.js");
// namespace App {
//! Project List class
class ProjectList extends base_component_js_1.Component {
    type;
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement; 
    // element: HTMLElement; // we are taking those from component class
    assignedProjects;
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
        project_state_js_1.projectState.moveProject(prjId, this.type === 'active' ? project_model_js_1.ProjectStatus.Active : project_model_js_1.ProjectStatus.Finished);
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        project_state_js_1.projectState.addListener((projects) => {
            // now we are going to create a filter here
            const relProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === project_model_js_1.ProjectStatus.Active; // this is filtering, if project status is active filter the class to active
                }
                return prj.status === project_model_js_1.ProjectStatus.Finished;
            }); // .filter() is a js default method, prj.status is enum
            this.assignedProjects = relProjects; // we are overriding the project, and we added the filtered projects 
            this.renderProjects();
        });
        // this.attach(); this will be called in the based component
        // this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = ''; // we will render all the project by getting rid of the others //? BUG : If we add 2nd element it duplicates check that
        for (const projectItems of this.assignedProjects) {
            new project_item_js_1.ProjectItem(this.element.querySelector('ul').id, projectItems); // this.element.id also counting the section element from html and add it to DOM, thats why we got it by queryselector
            // const listItem = document.createElement('li');
            // listItem.textContent = projectItems.title; // every project item will be project by title
            // listEl?.appendChild(listItem);
        }
    }
}
exports.ProjectList = ProjectList;
__decorate([
    autobind_js_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind_js_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dropHandler", null);
// }
//# sourceMappingURL=project-list.js.map