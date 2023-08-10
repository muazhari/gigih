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
const User_1 = __importDefault(require("../../models/entities/User"));
const Result_1 = __importDefault(require("../../models/value_objects/Result"));
const mongoose_1 = require("mongoose");
class RegisterAuthentication {
    constructor(userManagement) {
        this.registerByUsernameAndPassword = (request) => __awaiter(this, void 0, void 0, function* () {
            if (request.username === undefined) {
                throw new mongoose_1.Error('Username is undefined.');
            }
            if (request.password === undefined) {
                throw new mongoose_1.Error('Password is undefined.');
            }
            let isUserFound;
            try {
                yield this.userManagement.readOneByUsername(request.username);
                isUserFound = true;
            }
            catch (error) {
                isUserFound = false;
            }
            if (isUserFound) {
                return new Result_1.default(409, 'Register by username and password failed, username already exists.', null);
            }
            const toCreateUser = new User_1.default(request.username, request.password, '');
            const createdUser = yield this.userManagement.createOne(toCreateUser);
            return new Result_1.default(201, 'Register by username and password succeed.', createdUser.data);
        });
        this.userManagement = userManagement;
    }
}
exports.default = RegisterAuthentication;
//# sourceMappingURL=RegisterAuthentication.js.map