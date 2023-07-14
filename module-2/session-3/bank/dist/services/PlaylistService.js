"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = __importDefault(require("../models/Result"));
class TransactionService {
    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.readAll = () => {
            const foundTransactions = this.transactionRepository.readAll();
            return new Result_1.default(200, 'Transaction read all succeed.', foundTransactions);
        };
        this.readOneById = (id) => {
            const foundTransaction = this.transactionRepository.readOneById(id);
            if (foundTransaction === undefined) {
                return new Result_1.default(400, `Transaction read one by id failed: transaction with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Transaction read one by id succeed.', foundTransaction);
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Transaction create one succeed.', this.transactionRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            const patchedTransaction = this.transactionRepository.patchOneById(id, item);
            if (patchedTransaction === undefined) {
                return new Result_1.default(400, `Transaction patch one by id failed: transaction with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Transaction patch one by id succeed.', patchedTransaction);
        };
        this.deleteOneById = (id) => {
            const deletedTransaction = this.transactionRepository.deleteOneById(id);
            if (deletedTransaction === undefined) {
                return new Result_1.default(400, `Transaction delete one by id failed: transaction with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Transaction delete one by id succeed.', deletedTransaction);
        };
    }
}
exports.default = TransactionService;
