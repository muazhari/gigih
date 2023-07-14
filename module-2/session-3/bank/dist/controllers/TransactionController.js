"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const express_1 = __importDefault(require("express"));
class TransactionController {
    constructor() {
        this.transactionService = new TransactionService_1.default();
        this.router = express_1.default.Router();
        this.transfer = (request, response) => {
            const { sourceId, destinationId, amount } = request.body;
            const result = this.transactionService.transfer(sourceId, destinationId, amount);
            response.status(result.status).json(result);
        };
        this.readAll = (request, response) => {
            const result = this.transactionService.readAll();
            response.status(result.status).json(result);
        };
        this.readOneById = (request, response) => {
            const transactionId = request.params.transactionId;
            const result = this.transactionService.readOneById(transactionId);
            response.status(result.status).json(result);
        };
        this.createOne = (request, response) => {
            const result = this.transactionService.createOne(request.body);
            response.status(result.status).json(result);
        };
        this.patchOneById = (request, response) => {
            const transactionId = request.params.transactionId;
            const result = this.transactionService.patchOneById(transactionId, request.body);
            response.status(result.status).json(result);
        };
        this.deleteOneById = (request, response) => {
            const transactionId = request.params.transactionId;
            const result = this.transactionService.deleteOneById(transactionId);
            response.status(result.status).json(result);
        };
        this.router.get('/', this.readAll);
        this.router.get('/:transactionId', this.readOneById);
        this.router.post('/', this.createOne);
        this.router.patch('/:transactionId', this.patchOneById);
        this.router.delete('/:transactionId', this.deleteOneById);
        this.router.post('/transfer', this.transfer);
    }
}
exports.default = TransactionController;
