import {createSlice} from '@reduxjs/toolkit';
import Video from "../models/entities/Video.ts";
import Product from "../models/entities/Product.ts";
import VideoCommentMapAggregate from "../models/aggregates/VideoCommentMapAggregate.ts";
import VideoProductMapAggregate from "../models/aggregates/VideoProductMapAggregate.ts";
import CommentAggregate from "../models/aggregates/CommentAggregate.ts";

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

export interface DomainState {
    videoDomain: VideoDomain | undefined
    productDomain: ProductDomain | undefined
    commentDomain: CommentDomain | undefined
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
        }
    },
});



