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
class VideoProductMapManagement {
    constructor(videoProductMapRepository) {
        this.readAll = () => __awaiter(this, void 0, void 0, function* () {
            const foundVideoProductMaps = yield this.videoProductMapRepository.readAll();
            return new Result_1.default(200, 'VideoProductMap read all succeed.', foundVideoProductMaps);
        });
        this.readOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundVideoProductMap = yield this.videoProductMapRepository.readOneById(id);
                return new Result_1.default(200, 'VideoProductMap read one by id succeed.', foundVideoProductMap);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.createOne = (item) => __awaiter(this, void 0, void 0, function* () {
            const createdVideoProductMap = yield this.videoProductMapRepository.createOne(item);
            return new Result_1.default(201, 'VideoProductMap create one succeed.', createdVideoProductMap);
        });
        this.patchOneById = (id, item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchedVideoProductMap = yield this.videoProductMapRepository.patchOneById(id, item);
                return new Result_1.default(200, 'VideoProductMap patch one by id succeed.', patchedVideoProductMap);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.deleteOneById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedVideoProductMap = yield this.videoProductMapRepository.deleteOneById(id);
                return new Result_1.default(200, 'VideoProductMap delete one by id succeed.', deletedVideoProductMap);
            }
            catch (error) {
                return new Result_1.default(400, error.message, null);
            }
        });
        this.videoProductMapRepository = videoProductMapRepository;
    }
}
exports.default = VideoProductMapManagement;
//# sourceMappingURL=VideoProductMapManagement.js.map