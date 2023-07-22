"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.Schema.Types.String
    },
    pictureUrl: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('users', userSchema);
//# sourceMappingURL=UserSchema.js.map