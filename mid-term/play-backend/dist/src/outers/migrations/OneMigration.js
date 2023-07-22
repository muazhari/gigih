"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductSchema_1 = __importDefault(require("../schemas/ProductSchema"));
const Product_1 = __importDefault(require("../../inners/models/entities/Product"));
class OneMigration {
    constructor(oneDatastore) {
        this.up = () => __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductSchema_1.default.create([
                new Product_1.default('title0', 0, 'linkUrl0'),
                new Product_1.default('title1', 1, 'linkUrl1')
            ]);
            console.log(products);
            console.log('One migration up.');
        });
        this.down = () => __awaiter(this, void 0, void 0, function* () {
            yield ProductSchema_1.default.deleteMany({});
            console.log('One migration down.');
        });
        this.oneDatastore = oneDatastore;
    }
}
exports.default = OneMigration;
//# sourceMappingURL=OneMigration.js.map