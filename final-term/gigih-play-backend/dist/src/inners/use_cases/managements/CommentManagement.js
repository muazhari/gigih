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
const Comment_1 = __importDefault(require("../../models/entities/Comment"));
class CommentManagement {
    constructor(commentRepository, userRepository) {
        this.readAll = (isAggregated, search) => __awaiter(this, void 0, void 0, function* () {
            let foundComments;
            if (isAggregated === true) {
                foundComments = yield this.commentRepository.readAllAggregated(search);
            }
            else {
                foundComments = yield this.commentRepository.readAll(search);
            }
            return new Result_1.default(200, 'Comment read all succeed.', foundComments);
        });
        this.readAllByVideoId = (videoId, isAggregated) => __awaiter(this, void 0, void 0, function* () {
            let foundComments;
            if (isAggregated === true) {
                foundComments = yield this.commentRepository.readAllByVideoIdAggregated(videoId);
            }
            else {
                foundComments = yield this.commentRepository.readAllByVideoId(videoId);
            }
            return new Result_1.default(200, 'Comment read all by video id succeed.', foundComments);
        });
        this.readOneById = (id, isAggregated) => __awaiter(this, void 0, void 0, function* () {
            let foundComment;
            if (isAggregated === true) {
                foundComment = yield this.commentRepository.readOneByIdAggregated(id);
            }
            else {
                foundComment = yield this.commentRepository.readOneById(id);
            }
            return new Result_1.default(200, 'Comment read one by id succeed.', foundComment);
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdComment = yield this.commentRepository.createOne(item);
            return new Result_1.default(201, 'Comment create one succeed.', createdComment);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            const patchedComment = yield this.commentRepository.patchOneById(id, item);
            return new Result_1.default(200, 'Comment patch one by id succeed.', patchedComment);
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield this.commentRepository.deleteOneById(id);
            return new Result_1.default(200, 'Comment delete one by id succeed.', deletedComment);
        });
        this.submit = (submitComment, isAggregated) => __awaiter(this, void 0, void 0, function* () {
            if (submitComment.username === undefined) {
                throw new Error('Username is undefined.');
            }
            const foundUser = yield this.userRepository.readOneByUsername(submitComment.username);
            const toCreateComment = new Comment_1.default(foundUser._id, submitComment.content, new Date());
            const createdComment = yield this.commentRepository.createOne(toCreateComment);
            let submittedComment;
            if (isAggregated === true) {
                if (createdComment._id === undefined) {
                    throw new Error('Created comment id is undefined.');
                }
                submittedComment = yield this.commentRepository.readOneByIdAggregated(createdComment._id);
            }
            else {
                submittedComment = createdComment;
            }
            return new Result_1.default(201, 'Comment submit succeed.', submittedComment);
        });
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }
}
exports.default = CommentManagement;
//# sourceMappingURL=CommentManagement.js.map