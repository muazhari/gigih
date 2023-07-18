"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songArtistMapSchema = new mongoose_1.Schema({
    songId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    artistId: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = (0, mongoose_1.model)('song_artist_maps', songArtistMapSchema);
//# sourceMappingURL=SongArtistMapSchema.js.map