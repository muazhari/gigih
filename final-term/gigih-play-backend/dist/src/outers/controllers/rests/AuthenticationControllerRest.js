"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = __importDefault(require("../../../inners/models/value_objects/Result"));
class AuthenticationControllerRest {
    constructor(router, loginAuthentication, registerAuthentication) {
        this.registerRoutes = () => {
            this.router.post('/logins', this.login);
            this.router.post('/registers', this.register);
        };
        this.login = (request, response) => {
            const { method } = request.query;
            if (method === 'username_and_password') {
                const requestToLoginByUsernameAndPassword = request.body;
                this.loginAuthentication.loginByUsernameAndPassword(requestToLoginByUsernameAndPassword)
                    .then((result) => {
                    response.status(result.status).json(result);
                })
                    .catch((error) => {
                    response.status(500).json(new Result_1.default(500, `Login by method ${method} failed: ${error.message}`, null));
                });
            }
            else {
                response.status(400).json(new Result_1.default(400, `Login by method ${method} failed, unknown method.`, null));
            }
        };
        this.register = (request, response) => {
            const { method } = request.query;
            if (method === 'username_and_password') {
                const requestToRegisterByUsernameAndPassword = request.body;
                this.registerAuthentication.registerByUsernameAndPassword(requestToRegisterByUsernameAndPassword)
                    .then((result) => {
                    response.status(result.status).json(result);
                })
                    .catch((error) => {
                    response.status(500).json(new Result_1.default(500, `Register by method ${method} failed: ${error.message}`, null));
                });
            }
            else {
                response.status(400).json(new Result_1.default(400, `Register by method ${method} failed, unknown method.`, null));
            }
        };
        this.router = router;
        this.loginAuthentication = loginAuthentication;
        this.registerAuthentication = registerAuthentication;
    }
}
exports.default = AuthenticationControllerRest;
//# sourceMappingURL=AuthenticationControllerRest.js.map