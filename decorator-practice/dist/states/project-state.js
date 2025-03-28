"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectState = exports.ProjectState = void 0;
const project_model_1 = require("../models/project-model");
// we dont need to export those beucase those just using in the flile
class State {
    listeners = []; // it cant still be accessed from outside but it can be accessed from extended ones (extends)  
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    projects = [];
    static instance;
    constructor() {
        super();
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
        const newProject = new project_model_1.Project(Math.random().toString(), title, description, numOfPeople, project_model_1.ProjectStatus.Active); // you should declare the enum here
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
exports.ProjectState = ProjectState;
exports.projectState = ProjectState.getInstance();
//const projectState = new ProjectState(); // now its global constant
// }
//# sourceMappingURL=project-state.js.map