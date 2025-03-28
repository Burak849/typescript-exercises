"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autobind = autobind;
// namespace App { 
//! Autobind Decorator
function autobind(_, _2, descriptor) {
    const originMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// }
//# sourceMappingURL=autobind.js.map