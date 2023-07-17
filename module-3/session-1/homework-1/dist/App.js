"use strict";
// migration requirements using mongoose
// 1. Create a database that stores the following information:
// - Songs, containing the following data: the title of the song, the name of the artist(s), and the album
// - Artist.ts, containing the following data: name, date of birth, genre(s)
// - Popular Songs, containing the following data: the title of the song, how many times it’s played, period of time
//
// 2. Populate the database you’ve created above with at least 10 data for each collection
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
const dotenv_1 = __importDefault(require("dotenv"));
const OneDatastore_1 = __importDefault(require("./datastores/OneDatastore"));
const OneMigration_1 = __importDefault(require("./migrations/OneMigration"));
dotenv_1.default.config({
    path: './.env'
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const oneDatastore = new OneDatastore_1.default();
    yield oneDatastore.connect()
        .then(() => console.log('Connected to one datastore.'))
        .catch((error) => console.log('Error connecting to one datastore: ', error));
    const oneMigration = new OneMigration_1.default(oneDatastore);
    yield oneMigration.up();
    // await oneMigration.down()
});
main()
    .then(() => console.log('Migration completed.'))
    .catch((error) => console.log('Error migrating: ', error));
//# sourceMappingURL=App.js.map