"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../src/inners/models/entities/User"));
const mongoose_1 = require("mongoose");
class UserMock {
    constructor() {
        this.data = [
            new User_1.default('username0', 'pictureUrl0', new mongoose_1.Types.ObjectId().toString()),
            new User_1.default('username1', 'pictureUrl1', new mongoose_1.Types.ObjectId().toString())
        ];
    }
}
exports.default = UserMock;
//# sourceMappingURL=UserMock.js.map