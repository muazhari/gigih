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
const axios_1 = __importDefault(require("axios"));
class ProcessExecutor {
    constructor(processRepository) {
        this.push = (process) => __awaiter(this, void 0, void 0, function* () {
            if (process.id === undefined) {
                throw new Error('Process id is undefined.');
            }
            let isProcessFound;
            try {
                yield this.processRepository.readOneById(process.id);
                isProcessFound = true;
            }
            catch (error) {
                isProcessFound = false;
            }
            if (isProcessFound) {
                yield this.processRepository.patchOneById(process.id, process);
            }
            else {
                yield this.processRepository.createOne(process);
            }
        });
        this.execute = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.processRepository.readAll();
            for (const item of data) {
                console.log('Checking: ', item);
                if (item.executeAt === undefined) {
                    throw new Error('Process executeAt is undefined.');
                }
                const executeAt = item.executeAt;
                const currentDate = new Date();
                if (executeAt <= currentDate) {
                    console.log('Executing: ', item);
                    try {
                        const result = yield this.executeHttpClient(item.method, item.url, item.query, item.body);
                        console.log('Result execute response: ', result.status, result.data);
                    }
                    catch (error) {
                        console.log('Result execute error: ', error);
                    }
                    if (item.id === undefined) {
                        throw new Error('Process id is undefined.');
                    }
                    if (item.repeatDelay === undefined) {
                        throw new Error('Process repeatDelay is undefined.');
                    }
                    if (item.repeatCount === undefined) {
                        throw new Error('Process repeatCount is undefined.');
                    }
                    if (item.isRepeated === true) {
                        item.executeAt = new Date(item.executeAt.getTime() + item.repeatDelay);
                        item.repeatCount = item.repeatCount - 1;
                        yield this.processRepository.patchOneById(item.id, item);
                        if (item.repeatCount === 0) {
                            yield this.processRepository.deleteOneById(item.id);
                        }
                    }
                    else {
                        yield this.processRepository.deleteOneById(item.id);
                    }
                }
            }
        });
        this.executeHttpClient = (method, url, query, body) => __awaiter(this, void 0, void 0, function* () {
            if (url === undefined) {
                throw new Error('Process url is undefined.');
            }
            switch (method === null || method === void 0 ? void 0 : method.toUpperCase()) {
                case 'GET':
                    return yield axios_1.default.get(url, {
                        params: query
                    });
                case 'POST':
                    return yield axios_1.default.post(url, body, {
                        params: query
                    });
                case 'PUT':
                    return yield axios_1.default.put(url, body, {
                        params: query
                    });
                case 'PATCH':
                    return yield axios_1.default.patch(url, body, {
                        params: query
                    });
                case 'DELETE':
                    return yield axios_1.default.delete(url, {
                        params: query
                    });
                default:
                    throw Error('Method is not supported.');
            }
        });
        this.processRepository = processRepository;
    }
}
exports.default = ProcessExecutor;
//# sourceMappingURL=ProcessExecutor.js.map