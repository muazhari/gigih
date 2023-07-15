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
const Process_1 = __importDefault(require("../../inners/models/Process"));
const App_1 = require("../../App");
class ProcessRepository {
    constructor() {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = App_1.datastoreOne.db) === null || _a === void 0 ? void 0 : _a.collection('processes').find().toArray());
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            return result.map((item) => new Process_1.default(item.id, item.method, item.url, item.query, item.body, new Date(item.executeAt), item.isRepeated, item.repeatDelay, item.repeatCount));
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const result = yield ((_b = App_1.datastoreOne.db) === null || _b === void 0 ? void 0 : _b.collection('processes').findOne({ id }));
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            if (result === null) {
                throw new Error('Result is null.');
            }
            const foundItem = new Process_1.default(result.id, result.method, result.url, result.query, result.body, new Date(result.executeAt), result.isRepeated, result.repeatDelay, result.repeatCount);
            if (foundItem === undefined) {
                throw new Error('Process id not found.');
            }
            return foundItem;
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const result = yield ((_c = App_1.datastoreOne.db) === null || _c === void 0 ? void 0 : _c.collection('processes').insertOne(item));
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            return item;
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const foundItem = yield this.readOneById(id);
            const result = yield ((_d = App_1.datastoreOne.db) === null || _d === void 0 ? void 0 : _d.collection('processes').updateOne({ id }, { $set: item }));
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            return foundItem;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            const foundItem = yield this.readOneById(id);
            const result = yield ((_e = App_1.datastoreOne.db) === null || _e === void 0 ? void 0 : _e.collection('processes').deleteOne({ id }));
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            return foundItem;
        });
    }
}
exports.default = ProcessRepository;
//# sourceMappingURL=ProcessRepository.js.map