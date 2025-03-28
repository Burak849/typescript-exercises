"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
// namespace App {
//! Component Base Class
class Component {
    tempEl;
    hostEl;
    element;
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
exports.Component = Component;
// }
//# sourceMappingURL=base-component.js.map