import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topicsArray: []
};

export const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {
        setTopics: (state, action) => {
            state.topicsArray = action.payload;
        }
    }
});

export const { setTopics } = topicSlice.actions;
export default topicSlice.reducer;
