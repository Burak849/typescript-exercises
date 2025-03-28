"use strict";
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
exports.ProjectItem = void 0;
const base_component_js_1 = require("./base-component.js");
const autobind_js_1 = require("../decorators/autobind.js");
// namespace App{
//! Project Item Class
class ProjectItem extends base_component_js_1.Component {
    project;
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
exports.ProjectItem = ProjectItem;
__decorate([
    autobind_js_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectItem.prototype, "dragStartHandler", null);
// }
//# sourceMappingURL=project-item.js.map