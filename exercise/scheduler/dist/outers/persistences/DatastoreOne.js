"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const os = __importStar(require("os"));
const mongoose_1 = __importDefault(require("mongoose"));
class DatastoreOne {
    constructor() {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                const host = process.env.DS_1_HOST;
                if (host === undefined) {
                    throw new Error('Host is undefined.');
                }
                const port = process.env.DS_1_PORT;
                if (port === undefined) {
                    throw new Error('Port is undefined.');
                }
                const username = process.env.DS_1_ROOT_USERNAME;
                if (username === undefined) {
                    throw new Error('Username is undefined.');
                }
                const password = process.env.DS_1_ROOT_PASSWORD;
                if (password === undefined) {
                    throw new Error('Password is undefined.');
                }
                const database = process.env.DS_1_DATABASE;
                if (database === undefined) {
                    throw new Error('Database is undefined.');
                }
                const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
                mongoose_1.default.connect(url, {
                    maxPoolSize: os.cpus().length
                }).then((client) => {
                    this.db = mongoose_1.default;
                    resolve(undefined);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
        this.disconnect = () => {
            var _a;
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.disconnect().then(() => {
                console.log('Disconnected from datastore one.');
            }).catch((error) => {
                console.log('Error disconnecting from datastore one: ', error);
            });
        };
    }
}
exports.default = DatastoreOne;
//# sourceMappingURL=DatastoreOne.js.map