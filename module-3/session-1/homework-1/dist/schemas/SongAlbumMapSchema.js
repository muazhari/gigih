"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songAlbumMapSchema = new mongoose_1.Schema({
    songId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    albumId: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = (0, mongoose_1.model)('song_album_maps', songAlbumMapSchema);
//# sourceMappingURL=SongAlbumMapSchema.js.map