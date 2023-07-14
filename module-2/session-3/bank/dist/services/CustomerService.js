"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const Result_1 = __importDefault(require("../models/Result"));
class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository_1.default();
        this.readAll = () => {
            const foundCustomers = this.customerRepository.readAll();
            return new Result_1.default(200, 'Customer read all succeed.', foundCustomers);
        };
        this.readOneById = (id) => {
            const foundCustomer = this.customerRepository.readOneById(id);
            if (foundCustomer === undefined) {
                return new Result_1.default(400, `Customer read one by id failed: customer with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Customer read one by id succeed.', foundCustomer);
        };
        this.createOne = (item) => {
            return new Result_1.default(201, 'Customer create one succeed.', this.customerRepository.createOne(item));
        };
        this.patchOneById = (id, item) => {
            const patchedCustomer = this.customerRepository.patchOneById(id, item);
            if (patchedCustomer === undefined) {
                return new Result_1.default(400, `Customer patch one by id failed: customer with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Customer patch one by id succeed.', patchedCustomer);
        };
        this.deleteOneById = (id) => {
            const deletedCustomer = this.customerRepository.deleteOneById(id);
            if (deletedCustomer === undefined) {
                return new Result_1.default(400, `Customer delete one by id failed: customer with id ${id} is undefined.`, undefined);
            }
            return new Result_1.default(200, 'Customer delete one by id succeed.', deletedCustomer);
        };
    }
}
exports.default = CustomerService;
