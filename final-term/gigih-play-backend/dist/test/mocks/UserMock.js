"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../src/inners/models/entities/User"));
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
class UserMock {
    constructor() {
        this.data = [
            new User_1.default(`username${(0, crypto_1.randomUUID)()}`, 'password0', 'https://placehold.co/400x400?text=pictureUrl0', new mongoose_1.Types.ObjectId().toString()),
            new User_1.default(`username${(0, crypto_1.randomUUID)()}`, 'password1', 'https://placehold.co/400x400?text=pictureUrl0', new mongoose_1.Types.ObjectId().toString())
        ];
    }
}
exports.default = UserMock;
//# sourceMappingURL=UserMock.js.map