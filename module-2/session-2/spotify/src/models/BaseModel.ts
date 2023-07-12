export default class BaseModel {
    patchFrom(item: any): any {
        Object.keys(item).forEach((key) => {
            Object.defineProperty(this, key, Object.getOwnPropertyDescriptor(item, key)!);
        });
    }
}