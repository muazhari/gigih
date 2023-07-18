"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genreSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
    }
});
exports.default = (0, mongoose_1.model)('genres', genreSchema);
//# sourceMappingURL=GenreSchema.js.map