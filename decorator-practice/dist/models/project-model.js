"use strict";
// namespace App{
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {})); // enum is perfect to use in status
class Project {
    id;
    title;
    description;
    people;
    status;
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
exports.Project = Project;
// }
//# sourceMappingURL=project-model.js.map