"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectUtility {
    constructor() {
        this.patch = (to, by) => {
            Object.keys(by).forEach((key) => {
                const value = Object.getOwnPropertyDescriptor(by, key);
                if (value !== undefined) {
                    Object.defineProperty(to, key, value);
                }
            });
            return to;
        };
    }
}
exports.default = ObjectUtility;
//# sourceMappingURL=ObjectUtility.js.map