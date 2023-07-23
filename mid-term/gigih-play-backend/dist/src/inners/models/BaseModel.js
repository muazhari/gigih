"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    constructor() {
        this.patchFrom = (item) => {
            Object.keys(item).forEach((key) => {
                const value = Object.getOwnPropertyDescriptor(item, key);
                if (value !== undefined) {
                    Object.defineProperty(this, key, value);
                }
            });
        };
    }
}
exports.default = BaseModel;
//# sourceMappingURL=BaseModel.js.map