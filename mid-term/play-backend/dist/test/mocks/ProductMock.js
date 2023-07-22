"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../src/inners/models/entities/Product"));
const mongoose_1 = require("mongoose");
class ProductMock {
    constructor() {
        this.data = [
            new Product_1.default('title0', 0, 'linkUrl0', new mongoose_1.Types.ObjectId().toString()),
            new Product_1.default('title1', 1, 'linkUrl1', new mongoose_1.Types.ObjectId().toString())
        ];
    }
}
exports.default = ProductMock;
//# sourceMappingURL=ProductMock.js.map