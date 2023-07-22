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
class UserManagement {
    constructor(userRepository) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield this.userRepository.readAll();
            return new Result_1.default(200, 'User read all succeed.', foundUsers);
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield this.userRepository.readOneById(id);
                return new Result_1.default(200, 'User read one by id succeed.', foundUser);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.userRepository.createOne(item);
            return new Result_1.default(201, 'User create one succeed.', createdUser);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchedUser = yield this.userRepository.patchOneById(id, item);
                return new Result_1.default(200, 'User patch one by id succeed.', patchedUser);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield this.userRepository.deleteOneById(id);
                return new Result_1.default(200, 'User delete one by id succeed.', deletedUser);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.userRepository = userRepository;
    }
}
exports.default = UserManagement;
//# sourceMappingURL=UserManagement.js.map