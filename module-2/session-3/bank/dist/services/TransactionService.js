"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Result_1 = __importDefault(require("../models/Result"));
const TransactionRepository_1 = __importDefault(require("../repositories/TransactionRepository"));
const CustomerService_1 = __importDefault(require("./CustomerService"));
const crypto_1 = require("crypto");
class TransactionService {
    constructor() {
        this.transactionRepository = new TransactionRepository_1.default();
        this.customerService = new CustomerService_1.default();
        this.transfer = (sourceId, destinationId, amount) => {
            var _a, _b;
            const sourceCustomer = this.customerService.readOneById(sourceId);
            const destinationCustomer = this.customerService.readOneById(destinationId);
            if (sourceCustomer.data === undefined) {
                return new Result_1.default(400, `Transaction transfer failed: source customer with id ${sourceId} is undefined.`, undefined);
            }
            if (destinationCustomer.data === undefined) {
                return new Result_1.default(400, `Transaction transfer failed: destination customer with id ${destinationId} is undefined.`, undefined);
            }
            if (((_a = sourceCustomer.data) === null || _a === void 0 ? void 0 : _a.balance) === undefined) {
                return new Result_1.default(500, `Transaction transfer failed: source customer with id ${sourceId} has undefined balance.`, undefined);
            }
            if (sourceCustomer.data.balance < amount) {
                return new Result_1.default(400, `Transaction transfer failed: source customer with id ${sourceId} has insufficient balance.`, undefined);
            }
            const sourceCustomerPatched = this.customerService.patchOneById(sourceId, { balance: sourceCustomer.data.balance - amount });
            console.log(JSON.stringify(sourceCustomerPatched));
            if (sourceCustomerPatched.data === undefined) {
                return new Result_1.default(500, `Transaction transfer failed: source customer with id ${sourceId} patch failed.`, undefined);
            }
            if (((_b = destinationCustomer.data) === null || _b === void 0 ? void 0 : _b.balance) === undefined) {
                return new Result_1.default(500, `Transaction transfer failed: destination customer with id ${destinationId} has undefined balance.`, undefined);
            }
            const destinationCustomerPatched = this.customerService.patchOneById(destinationId, { balance: destinationCustomer.data.balance + amount });
            console.log(JSON.stringify(destinationCustomerPatched));
            if (destinationCustomerPatched.data === undefined) {
                return new Result_1.default(500, `Transaction transfer failed: destination customer with id ${destinationId} patch failed.`, undefined);
            }
            const transaction = new Transaction_1.default((0, crypto_1.randomUUID)(), sourceId, destinationId, amount, new Date());
            const createdTransaction = this.transactionRepository.createOne(transaction);
            return new Result_1.default(200, 'Transaction transfer succeed.', createdTransaction);
        };
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
