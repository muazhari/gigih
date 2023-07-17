"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
    }
});
exports.default = (0, mongoose_1.model)('song', songSchema);
//# sourceMappingURL=SongSchema.js.map