"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CustomerService_1 = __importDefault(require("../services/CustomerService"));
class CustomerController {
    constructor() {
        this.customerService = new CustomerService_1.default();
        this.router = express_1.default.Router();
        this.readAll = (request, response) => {
            const result = this.customerService.readAll();
            response.status(result.status).json(result);
        };
        this.readOneById = (request, response) => {
            const customerId = request.params.customerId;
            const result = this.customerService.readOneById(customerId);
            response.status(result.status).json(result);
        };
        this.createOne = (request, response) => {
            const result = this.customerService.createOne(request.body);
            response.status(result.status).json(result);
        };
        this.patchOneById = (request, response) => {
            const customerId = request.params.customerId;
            const result = this.customerService.patchOneById(customerId, request.body);
            response.status(result.status).json(result);
        };
        this.deleteOneById = (request, response) => {
            const customerId = request.params.customerId;
            const result = this.customerService.deleteOneById(customerId);
            response.status(result.status).json(result);
        };
        this.router.get('/', this.readAll);
        this.router.get('/:customerId', this.readOneById);
        this.router.post('/', this.createOne);
        this.router.patch('/:customerId', this.patchOneById);
        this.router.delete('/:customerId', this.deleteOneById);
    }
}
exports.default = CustomerController;
