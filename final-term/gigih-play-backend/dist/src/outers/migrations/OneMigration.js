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
const CommentMock_1 = __importDefault(require("../../../test/mocks/CommentMock"));
const ProductMock_1 = __importDefault(require("../../../test/mocks/ProductMock"));
const UserMock_1 = __importDefault(require("../../../test/mocks/UserMock"));
const VideoCommentMapSchema_1 = __importDefault(require("../schemas/VideoCommentMapSchema"));
const VideoCommentMapMock_1 = __importDefault(require("../../../test/mocks/VideoCommentMapMock"));
const VideoMock_1 = __importDefault(require("../../../test/mocks/VideoMock"));
const VideoProductMapMock_1 = __importDefault(require("../../../test/mocks/VideoProductMapMock"));
const UserSchema_1 = __importDefault(require("../schemas/UserSchema"));
const CommentSchema_1 = __importDefault(require("../schemas/CommentSchema"));
const VideoProductMapSchema_1 = __importDefault(require("../schemas/VideoProductMapSchema"));
const VideoSchema_1 = __importDefault(require("../schemas/VideoSchema"));
const VideoProductMap_1 = __importDefault(require("../../inners/models/entities/VideoProductMap"));
const underscore_1 = __importDefault(require("underscore"));
class OneMigration {
    constructor(oneDatastore) {
        this.up = () => __awaiter(this, void 0, void 0, function* () {
            yield UserSchema_1.default.insertMany(this.videoCommentMapMock.commentMock.userMock.data);
            yield CommentSchema_1.default.insertMany(this.videoCommentMapMock.commentMock.data);
            yield VideoSchema_1.default.insertMany(this.videoCommentMapMock.videoMock.data);
            yield VideoCommentMapSchema_1.default.insertMany(this.videoCommentMapMock.data);
            yield VideoSchema_1.default.insertMany(this.videoProductMapMock.videoMock.data);
            yield ProductSchema_1.default.insertMany(this.videoProductMapMock.productMock.data);
            yield VideoProductMapSchema_1.default.insertMany(this.videoProductMapMock.data);
            yield VideoProductMapSchema_1.default.insertMany(underscore_1.default.zip(this.videoCommentMapMock.videoMock.data, this.videoProductMapMock.productMock.data)
                .map((videoProductMap) => {
                return new VideoProductMap_1.default(videoProductMap[0]._id, videoProductMap[1]._id);
            }));
            console.log('One migration up.');
        });
        this.down = () => __awaiter(this, void 0, void 0, function* () {
            yield ProductSchema_1.default.deleteMany({});
            yield VideoProductMapSchema_1.default.deleteMany({});
            yield VideoSchema_1.default.deleteMany({});
            yield VideoCommentMapSchema_1.default.deleteMany({});
            yield CommentSchema_1.default.deleteMany({});
            yield UserSchema_1.default.deleteMany({});
            console.log('One migration down.');
        });
        this.oneDatastore = oneDatastore;
        this.commentMock = new CommentMock_1.default();
        this.productMock = new ProductMock_1.default();
        this.userMock = new UserMock_1.default();
        this.videoCommentMapMock = new VideoCommentMapMock_1.default();
        this.videoMock = new VideoMock_1.default();
        this.videoProductMapMock = new VideoProductMapMock_1.default();
    }
}
exports.default = OneMigration;
//# sourceMappingURL=OneMigration.js.map