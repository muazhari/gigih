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
const mongoose_1 = require("mongoose");
class LoginAuthentication {
    constructor(userManagement) {
        this.loginByUsernameAndPassword = (request) => __awaiter(this, void 0, void 0, function* () {
            if (request.username === undefined) {
                throw new mongoose_1.Error('Username is undefined.');
            }
            if (request.password === undefined) {
                throw new mongoose_1.Error('Password is undefined.');
            }
            try {
                yield this.userManagement.readOneByUsername(request.username);
            }
            catch (error) {
                return new Result_1.default(404, `Login by username failed, unknown username: ${error.message}`, null);
            }
            let foundUserByUsernameAndPassword;
            try {
                foundUserByUsernameAndPassword = yield this.userManagement.readOneByUsernameAndPassword(request.username, request.password);
            }
            catch (error) {
                return new Result_1.default(404, `Login by username and password failed, unknown username or password: ${error.message}`, null);
            }
            return new Result_1.default(200, 'Login by username and password succeed.', foundUserByUsernameAndPassword.data);
        });
        this.userManagement = userManagement;
    }
}
exports.default = LoginAuthentication;
//# sourceMappingURL=LoginAuthentication.js.map