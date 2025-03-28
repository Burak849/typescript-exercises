// there is 2 options for splittin code:
// namespaces and file bundling , ES modules;
//? use "namespace" syntax to group related code, bundled compilation is possible
//? use official ES Modules import / export syntax, bundling via build tools (.. Webpack) is still possible





// namespace App { instead of this we can use import 
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget{ // by adding "export" we are making them available outside of this file
        dragOverHandler(event: DragEvent) :void;
        dropHandler(event: DragEvent) :void;
        dragLeaveHandler(event: DragEvent) :void;
    } // by this way it is only available here but we must make it in public useable
    // const class ... whatever you want you can add here
// }

