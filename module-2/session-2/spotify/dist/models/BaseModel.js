"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    patchFrom(item) {
        Object.keys(item).forEach((key) => {
            Object.defineProperty(this, key, Object.getOwnPropertyDescriptor(item, key));
        });
    }
}
exports.default = BaseModel;
