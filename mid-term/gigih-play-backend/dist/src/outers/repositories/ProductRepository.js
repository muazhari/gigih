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
const mongoose_1 = require("mongoose");
class ProductRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundProducts = yield ProductSchema_1.default.find();
            if (foundProducts === null) {
                throw new Error('Found products is null.');
            }
            return foundProducts;
        });
        this.readAllByVideoId = (videoId) => __awaiter(this, void 0, void 0, function* () {
            const foundProductsByVideoId = yield ProductSchema_1.default.aggregate([
                {
                    $lookup: {
                        from: 'video_product_maps',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'videoProductMaps'
                    }
                },
                {
                    $match: {
                        'videoProductMaps.videoId': new mongoose_1.Types.ObjectId(videoId)
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        price: 1,
                        linkUrl: 1
                    }
                }
            ]);
            if (foundProductsByVideoId === null) {
                throw new Error('Found products by video id is null.');
            }
            return foundProductsByVideoId;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield ProductSchema_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            if (foundProduct === null) {
                throw new Error('Found product is null.');
            }
            return foundProduct;
        });
        this.createOne = (product) => __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.create(product);
        });
        this.patchOneById = (id, product) => __awaiter(this, void 0, void 0, function* () {
            const patchedProduct = yield ProductSchema_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: product }, { new: true });
            if (patchedProduct === null) {
                throw new Error('Patched product is null.');
            }
            return patchedProduct;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield ProductSchema_1.default.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            if (deletedProduct === null) {
                throw new Error('Deleted product is null.');
            }
            return deletedProduct;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map