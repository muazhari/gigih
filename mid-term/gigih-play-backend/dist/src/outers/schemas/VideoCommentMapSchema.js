"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoCommentMapSchema = new mongoose_1.Schema({
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    commentId: {
        type: mongoose_1.Schema.Types.ObjectId
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('video_comment_maps', videoCommentMapSchema);
//# sourceMappingURL=VideoCommentMapSchema.js.map