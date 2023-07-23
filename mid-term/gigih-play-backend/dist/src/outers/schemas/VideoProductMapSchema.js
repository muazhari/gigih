"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoProductMapSchema = new mongoose_1.Schema({
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('video_product_maps', videoProductMapSchema);
//# sourceMappingURL=VideoProductMapSchema.js.map