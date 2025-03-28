// namespace App{

export enum ProjectStatus {
        Active,
    Finished
} // enum is perfect to use in status

export class Project{
    constructor( 
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus ){}
    }
    
// }