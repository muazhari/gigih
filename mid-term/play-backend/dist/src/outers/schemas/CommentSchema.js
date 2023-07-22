"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    content: {
        type: mongoose_1.Schema.Types.String
    },
    timestamp: {
        type: mongoose_1.Schema.Types.Date
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('comments', commentSchema);
//# sourceMappingURL=CommentSchema.js.map