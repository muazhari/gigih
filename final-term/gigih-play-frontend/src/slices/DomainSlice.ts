import {createSlice} from '@reduxjs/toolkit';
import Video from "../models/entities/Video.ts";
import Product from "../models/entities/Product.ts";
import VideoCommentMapAggregate from "../models/aggregates/VideoCommentMapAggregate.ts";
import VideoProductMapAggregate from "../models/aggregates/VideoProductMapAggregate.ts";
import CommentAggregate from "../models/aggregates/CommentAggregate.ts";
import User from "../models/entities/User.ts";

export interface VideoDomain {
    video: Video | undefined
    videos: Video[] | undefined
    videoCommentMaps: VideoCommentMapAggregate[] | undefined
    videoProductMaps: VideoProductMapAggregate[] | undefined
}

export interface ProductDomain {
    product: Product | undefined
    products: Product[] | undefined
}

export interface CommentDomain {
    comment: CommentAggregate | undefined
    comments: CommentAggregate[] | undefined
}

export interface UserDomain {
    user: User | undefined
}

export interface SearchDomain {
    videos: Video[] | undefined
    products: Product[] | undefined
}

export interface DomainState {
    videoDomain: VideoDomain | undefined
    productDomain: ProductDomain | undefined
    commentDomain: CommentDomain | undefined
    userDomain: UserDomain | undefined
    searchDomain: SearchDomain | undefined
}

export default createSlice({
    name: 'domain',
    initialState: <DomainState>{
        videoDomain: <VideoDomain>{
            video: undefined,
            videos: [],
            videoCommentMaps: [],
            videoProductMaps: []
        },
        productDomain: <ProductDomain>{
            product: undefined,
            products: []
        },
        commentDomain: <CommentDomain>{
            comment: undefined,
            comments: []
        },
        userDomain: <UserDomain>{
            user: undefined
        },
        searchDomain: <SearchDomain>{
            products: [],
            videos: []
        }
    },
    reducers: {
        setVideoDomain: (state, action) => {
            state.videoDomain = {...state.videoDomain, ...action.payload};
        },
        setProductDomain: (state, action) => {
            state.productDomain = {...state.productDomain, ...action.payload};
        },
        setCommentDomain: (state, action) => {
            state.commentDomain = {...state.commentDomain, ...action.payload};
        },
        commentDomainAddComment: (state, action) => {
            state.commentDomain = {
                ...state.commentDomain!,
                comments: [...state.commentDomain!.comments!, action.payload]
            };
        },
        setUserDomain: (state, action) => {
            state.userDomain = {...state.userDomain, ...action.payload};
        },
        setSearchDomain: (state, action) => {
            state.searchDomain = {...state.searchDomain, ...action.payload};
        }
    },
});



