import { Project, ProjectStatus } from "../models/project-model";



// namespace App{
    //! Project State Management Class
type Listener<T> = ( items: T[] ) => void; // we dont need return type whatever Listener gets
// we dont need to export those beucase those just using in the flile
class State <T> {
    protected listeners: Listener<T>[] = []; // it cant still be accessed from outside but it can be accessed from extended ones (extends)  

    addListener( listenerFn : Listener<T> ){ // we wrote Function before but this is not any function now thats why overwriting Listener func
        this.listeners.push(listenerFn);
    }
    
}

export class ProjectState extends State<Project> {
    
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

console.log('Running...');

export const projectState = ProjectState.getInstance();
//const projectState = new ProjectState(); // now its global constant
// }