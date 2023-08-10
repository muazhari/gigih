import {createSlice} from '@reduxjs/toolkit';

export interface MessageState {
    isShow: boolean | undefined;
    message: string | undefined;
    type: string | undefined;
}

export default createSlice({
    name: 'message',
    initialState: <MessageState>{
        isShow: false,
        message: undefined,
        type: undefined,
    },
    reducers: {
        set: (state, action) => {
            state.isShow = action.payload.isShow;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        configure: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hide: (state) => {
            state.isShow = false;
        },
        show: (state) => {
            state.isShow = true;
        }
    },
});



