"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const artistSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
    },
    dob: {
        type: mongoose_1.Schema.Types.Date,
    },
});
exports.default = (0, mongoose_1.model)('artists', artistSchema);
//# sourceMappingURL=ArtistSchema.js.map