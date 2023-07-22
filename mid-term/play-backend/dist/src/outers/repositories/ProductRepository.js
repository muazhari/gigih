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
class ProductRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundEntities = yield ProductSchema_1.default.find();
            if (foundEntities === null) {
                throw new Error('Found entities is null.');
            }
            return foundEntities;
        });
        this.readAllByVideoId = (videoId) => __awaiter(this, void 0, void 0, function* () {
            const foundEntitiesByVideoId = yield ProductSchema_1.default.aggregate([
                {
                    $lookup: {
                        from: 'aggregates',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'videoProductMaps'
                    }
                },
                {
                    $match: {
                        'videoProductMaps.videoId': videoId
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
            if (foundEntitiesByVideoId === null) {
                throw new Error('Found entities by video id is null.');
            }
            return foundEntitiesByVideoId;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundEntity = yield ProductSchema_1.default.findOne({ _id: id });
            if (foundEntity === null) {
                throw new Error('Found entity is null.');
            }
            return foundEntity;
        });
        this.createOne = (entity) => __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.create(entity);
        });
        this.patchOneById = (id, entity) => __awaiter(this, void 0, void 0, function* () {
            const patchedEntity = yield ProductSchema_1.default.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true });
            if (patchedEntity === null) {
                throw new Error('Patched entity is null.');
            }
            return patchedEntity;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedEntity = yield ProductSchema_1.default.findOneAndDelete({ _id: id });
            if (deletedEntity === null) {
                throw new Error('Deleted entity is null.');
            }
            return deletedEntity;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map