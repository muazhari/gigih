"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Transaction extends BaseModel_1.default {
    constructor(id, sourceId, destinationId, amount, timestamp) {
        super();
        this.id = id;
        this.sourceId = sourceId;
        this.destinationId = destinationId;
        this.amount = amount;
        this.timestamp = timestamp;
    }
}
exports.default = Transaction;
