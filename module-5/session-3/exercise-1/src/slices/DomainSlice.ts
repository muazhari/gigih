import {createSlice} from '@reduxjs/toolkit';
import Track from "../models/Track.ts";
import Playlist from "../models/Playlist.ts";

export interface PlaylistDomain {
    selectedTrack: Track | undefined;
    selectedPlaylist: Playlist | undefined;
    selectedPlaylistTracks: Track[] | undefined;
    playlists: Playlist[] | undefined;
    playlistsTracks: Track[][] | undefined;
}

export interface RecommendationDomain {
    tracks: Track[] | undefined;
}

export interface SearchDomain {
    searchValue: string | undefined;
    tracks: Track[] | undefined;
}

export interface DomainState {
    playlistDomain: PlaylistDomain | undefined;
    recommendationDomain: RecommendationDomain | undefined;
    searchDomain: SearchDomain | undefined;
}

export default createSlice({
    name: 'domain',
    initialState: <DomainState>{
        playlistDomain: {
            selectedTrack: undefined,
            playlists: [],
            selectedPlaylist: undefined,
            selectedPlaylistTracks: [],
            playlistsTracks: [[]],
        },
        recommendationDomain: {
            tracks: [],
        },
        searchDomain: {
            searchValue: '',
            tracks: [],
        }
    },
    reducers: {
        setPlaylistDomain: (state, action) => {
            state.playlistDomain = {...state.playlistDomain, ...action.payload};
        },
        setRecommendationDomain: (state, action) => {
            state.recommendationDomain = {...state.recommendationDomain, ...action.payload};
        },
        setSearchDomain: (state, action) => {
            state.searchDomain = {...state.searchDomain, ...action.payload};
        }
    },
});



