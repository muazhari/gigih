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
const UserSchema_1 = __importDefault(require("../schemas/UserSchema"));
const mongoose_1 = require("mongoose");
class UserRepository {
    constructor(datastoreOne) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield UserSchema_1.default.find();
            if (foundUsers === null) {
                throw new Error('Found users is null.');
            }
            return foundUsers;
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield UserSchema_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            if (foundUser === null) {
                throw new Error('Found user is null.');
            }
            return foundUser;
        });
        this.readOneByUsername = (username) => __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield UserSchema_1.default.findOne({ username });
            if (foundUser === null) {
                throw new Error('Found user is null.');
            }
            return foundUser;
        });
        this.createOne = (user) => __awaiter(this, void 0, void 0, function* () {
            return yield UserSchema_1.default.create(user);
        });
        this.patchOneById = (id, user) => __awaiter(this, void 0, void 0, function* () {
            const patchedUser = yield UserSchema_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: user }, { new: true });
            if (patchedUser === null) {
                throw new Error('Patched user is null.');
            }
            return patchedUser;
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield UserSchema_1.default.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            if (deletedUser === null) {
                throw new Error('Deleted user is null.');
            }
            return deletedUser;
        });
        this.oneDatastore = datastoreOne;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map