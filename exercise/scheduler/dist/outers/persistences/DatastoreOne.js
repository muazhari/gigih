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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const os = __importStar(require("os"));
class DatastoreOne {
    constructor() {
        this.connect = () => {
            const host = process.env.DS_1_HOST;
            if (host === undefined) {
                throw new Error('Host is undefined.');
            }
            const port = process.env.DS_1_PORT;
            if (port === undefined) {
                throw new Error('Port is undefined.');
            }
            const database = process.env.DS_1_DATABASE;
            if (database === undefined) {
                throw new Error('Database is undefined.');
            }
            const username = process.env.DS_1_ROOT_USERNAME;
            if (username === undefined) {
                throw new Error('Username is undefined.');
            }
            const password = process.env.DS_1_ROOT_PASSWORD;
            if (password === undefined) {
                throw new Error('Password is undefined.');
            }
            const url = `mongodb://${username}:${password}@${host}:${port}/${database}/?authSource=admin`;
            mongodb_1.MongoClient.connect(url, {
                maxPoolSize: os.cpus().length
            }).then((client) => {
                this.client = client;
                this.db = this.client.db('scheduler');
                console.log('Connected to datastore one.');
            }).catch((error) => {
                console.log('Error connecting to datastore one: ', error);
            });
        };
    }
}
exports.default = DatastoreOne;
//# sourceMappingURL=DatastoreOne.js.map