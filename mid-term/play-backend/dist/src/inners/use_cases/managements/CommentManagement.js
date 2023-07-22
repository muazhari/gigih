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
class CommentManagement {
    constructor(commentRepository) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundComments = yield this.commentRepository.readAll();
            return new Result_1.default(200, 'Comment read all succeed.', foundComments);
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundComment = yield this.commentRepository.readOneById(id);
                return new Result_1.default(200, 'Comment read one by id succeed.', foundComment);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdComment = yield this.commentRepository.createOne(item);
            return new Result_1.default(201, 'Comment create one succeed.', createdComment);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchedComment = yield this.commentRepository.patchOneById(id, item);
                return new Result_1.default(200, 'Comment patch one by id succeed.', patchedComment);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedComment = yield this.commentRepository.deleteOneById(id);
                return new Result_1.default(200, 'Comment delete one by id succeed.', deletedComment);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.commentRepository = commentRepository;
    }
}
exports.default = CommentManagement;
//# sourceMappingURL=CommentManagement.js.map