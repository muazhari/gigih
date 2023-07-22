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
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            if (this.datastoreOne.db === undefined) {
                throw new Error('Datastore db is undefined.');
            }
            const result = yield this.datastoreOne.db.model('process').find();
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            return result;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (this.datastoreOne.db === undefined) {
                throw new Error('Datastore db is undefined.');
            }
            const result = yield this.datastoreOne.db.model('process').findOne({ id });
            if (result === null) {
                throw new Error('Result is null.');
            }
            return result;
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.datastoreOne.db === undefined) {
                throw new Error('Datastore db is undefined.');
            }
            const result = yield ((_a = this.datastoreOne.db) === null || _a === void 0 ? void 0 : _a.model('process').create(item));
            if (result === undefined) {
                throw new Error('Result is undefined.');
            }
            return item;
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            if (this.datastoreOne.db === undefined) {
                throw new Error('Datastore db is undefined.');
            }
            const foundItem = yield this.readOneById(id);
            yield ((_b = this.datastoreOne.db) === null || _b === void 0 ? void 0 : _b.model('process').updateOne({ id }, { $set: item }));
            return foundItem;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            if (this.datastoreOne.db === undefined) {
                throw new Error('Datastore db is undefined.');
            }
            const foundItem = yield this.readOneById(id);
            yield ((_c = this.datastoreOne.db) === null || _c === void 0 ? void 0 : _c.model('process').deleteOne({ id }));
            return foundItem;
        });
        this.datastoreOne = datastoreOne;
    }
}
exports.default = ProcessRepository;
//# sourceMappingURL=ProductRepository.js.map
