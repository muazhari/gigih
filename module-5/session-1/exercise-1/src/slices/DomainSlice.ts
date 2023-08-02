import {createSlice} from '@reduxjs/toolkit';
import Song from "../models/Song.ts";

export interface PlayListDomain {
    songs: Song[] | undefined;
}

export interface RecommendationDomain {
    songs: Song[] | undefined;
}

export interface DomainState {
    playlistDomain: PlayListDomain | undefined;
    recommendationDomain: RecommendationDomain | undefined;
}

export default createSlice({
    name: 'domain',
    initialState: <DomainState>{
        playlistDomain: {
            songs: [],
        },
        recommendationDomain: {
            songs: [],
        },
    },
    reducers: {
        setPlaylistDomain: (state, action) => {
            state.playlistDomain = {...state.playlistDomain, ...action.payload};
        },
        setRecommendationDomain: (state, action) => {
            state.recommendationDomain = {...state.recommendationDomain, ...action.payload};
        }
    },
});



