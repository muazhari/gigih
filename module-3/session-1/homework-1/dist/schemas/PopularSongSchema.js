"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const popularSongSchema = new mongoose_1.Schema({
    songId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    playCount: {
        type: mongoose_1.Schema.Types.Number,
    },
    periodOfTime: {
        type: mongoose_1.Schema.Types.Number,
    }
});
exports.default = (0, mongoose_1.model)('popular_songs', popularSongSchema);
//# sourceMappingURL=PopularSongSchema.js.map