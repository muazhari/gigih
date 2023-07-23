"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String
    },
    price: {
        type: mongoose_1.Schema.Types.Number
    },
    linkUrl: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('products', productSchema);
//# sourceMappingURL=ProductSchema.js.map