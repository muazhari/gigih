"use strict";
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
const express_1 = __importDefault(require("express"));
require("./outers/configurations");
require("./outers/persistences/DatastoreOne");
const RootRoute_1 = __importDefault(require("./outers/routes/RootRoute"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ type: '*/*' }));
    const rootRoute = new RootRoute_1.default(app);
    rootRoute.registerRoutes();
    const port = process.env.APP_PORT;
    if (port === undefined) {
        throw new Error('Port is undefined.');
    }
    app.listen(port, () => {
        console.log(`Scheduler app listening on port ${port}`);
    });
});
main()
    .then(() => {
    console.log('Scheduler app started.');
})
    .catch((error) => {
    console.log('Error starting scheduler app: ', error);
});
//# sourceMappingURL=App.js.map