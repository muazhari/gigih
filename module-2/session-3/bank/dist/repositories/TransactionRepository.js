"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../models/Transaction"));
class TransactionRepository {
    constructor() {
        this.data = [
            new Transaction_1.default('0', '0', '1', 100, new Date()),
            new Transaction_1.default('1', '1', '0', 200, new Date())
        ];
        this.readAll = () => {
            return this.data;
        };
        this.readOneById = (id) => {
            return this.data.find((item) => item.id === id);
        };
        this.createOne = (item) => {
            this.data.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            if (foundItem === undefined) {
                return undefined;
            }
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            if (foundItem === undefined) {
                return undefined;
            }
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        };
    }
}
exports.default = TransactionRepository;
