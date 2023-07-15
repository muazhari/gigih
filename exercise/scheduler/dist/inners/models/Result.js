"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Result extends BaseModel_1.default {
    constructor(status, message, data) {
        super();
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.default = Result;
//# sourceMappingURL=Result.js.map