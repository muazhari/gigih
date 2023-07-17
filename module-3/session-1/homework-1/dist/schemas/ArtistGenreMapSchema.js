"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const artistGenreMapSchema = new mongoose_1.Schema({
    artistId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    genreId: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = (0, mongoose_1.model)('artist_genre_map', artistGenreMapSchema);
//# sourceMappingURL=ArtistGenreMapSchema.js.map