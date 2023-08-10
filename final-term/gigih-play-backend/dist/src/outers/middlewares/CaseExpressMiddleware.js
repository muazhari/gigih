"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const humps_1 = __importDefault(require("humps"));
const caseExpressMiddleware = (options) => {
    const snakeCaseResHandler = (_req, res, next) => {
        const send = res.send;
        res.send = function (body) {
            try {
                const parsedBody = JSON.parse(body);
                body = humps_1.default.decamelizeKeys(parsedBody, options);
                const stringifiesBody = JSON.stringify(body);
                send.call(this, stringifiesBody);
            }
            catch (error) {
                send.call(this, body);
            }
            return res;
        };
        next();
    };
    const snakeCaseReqHandler = (req, _res, next) => {
        req.body = humps_1.default.camelizeKeys(req.body, options);
        req.params = humps_1.default.camelizeKeys(req.params, options);
        req.query = humps_1.default.camelizeKeys(req.query, options);
        next();
    };
    return [snakeCaseResHandler, snakeCaseReqHandler];
};
exports.default = caseExpressMiddleware;
//# sourceMappingURL=CaseExpressMiddleware.js.map