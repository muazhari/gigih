"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CustomerController_1 = __importDefault(require("../controllers/CustomerController"));
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const router = express_1.default.Router();
router.use('/customers', new CustomerController_1.default().router);
router.use('/transactions', new TransactionController_1.default().router);
exports.default = router;
