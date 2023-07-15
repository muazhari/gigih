"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Process extends BaseModel_1.default {
    constructor(id, method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount) {
        super();
        this.id = id;
        this.method = method;
        this.url = url;
        this.query = query;
        this.body = body;
        this.executeAt = executeAt;
        this.isRepeated = isRepeated;
        this.repeatDelay = repeatDelay;
        this.repeatCount = repeatCount;
    }
}
exports.default = Process;
//# sourceMappingURL=Process.js.map