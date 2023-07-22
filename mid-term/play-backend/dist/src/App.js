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
require("./outers/configurations/DotenvConfiguration");
const OneDatastore_1 = __importDefault(require("./outers/datastores/OneDatastore"));
const RootRoute_1 = __importDefault(require("./outers/routes/RootRoute"));
let app;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app = (0, express_1.default)();
    app.use(express_1.default.json({ type: '*/*' }));
    const oneDatastore = new OneDatastore_1.default();
    try {
        yield oneDatastore.connect();
        console.log('One datastore connected.');
    }
    catch (error) {
        console.log('Error connecting to one datastore: ', error);
    }
    // const oneMigration = new OneMigration(oneDatastore)
    // await oneMigration.down()
    // await oneMigration.up()
    const rootRoute = new RootRoute_1.default(app, oneDatastore);
    yield rootRoute.registerRoutes();
    const port = process.env.NODE_ENV === 'test' ? 0 : Number(process.env.APP_PORT);
    if (port === undefined) {
        throw new Error('Port is undefined.');
    }
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
main()
    .then(() => {
    console.log('App started.');
})
    .catch((error) => {
    console.log('Error starting app: ', error);
});
exports.default = app;
//# sourceMappingURL=App.js.map