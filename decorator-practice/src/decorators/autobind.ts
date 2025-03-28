// namespace App { 
//! Autobind Decorator
export function autobind ( _: any, _2: string | symbol, descriptor: PropertyDescriptor ){
    const originMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            const boundFn = originMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// }