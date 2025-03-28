
// namespace App {
//! Component Base Class
// export default means this is the main
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> { // we can create extra functionalities
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
// }
