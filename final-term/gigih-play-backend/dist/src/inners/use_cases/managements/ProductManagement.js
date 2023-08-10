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
const Result_1 = __importDefault(require("../../models/value_objects/Result"));
class ProductManagement {
    constructor(productRepository) {
        this.readAll = (search) => __awaiter(this, void 0, void 0, function* () {
            const foundProducts = yield this.productRepository.readAll(search);
            return new Result_1.default(200, 'Product read all succeed.', foundProducts);
        });
        this.readAllByVideoId = (videoId) => __awaiter(this, void 0, void 0, function* () {
            const foundProductsByVideoId = yield this.productRepository.readAllByVideoId(videoId);
            return new Result_1.default(200, 'Product read all by video id succeed.', foundProductsByVideoId);
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.productRepository.readOneById(id);
            return new Result_1.default(200, 'Product read one by id succeed.', foundProduct);
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield this.productRepository.createOne(item);
            return new Result_1.default(201, 'Product create one succeed.', createdProduct);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            const patchedProduct = yield this.productRepository.patchOneById(id, item);
            return new Result_1.default(200, 'Product patch one by id succeed.', patchedProduct);
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield this.productRepository.deleteOneById(id);
            return new Result_1.default(200, 'Product delete one by id succeed.', deletedProduct);
        });
        this.productRepository = productRepository;
    }
}
exports.default = ProductManagement;
//# sourceMappingURL=ProductManagement.js.map