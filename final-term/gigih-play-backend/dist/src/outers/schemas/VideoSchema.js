"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    thumbnailUrl: {
        type: mongoose_1.Schema.Types.String
    },
    contentUrl: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('videos', videoSchema);
//# sourceMappingURL=VideoSchema.js.map