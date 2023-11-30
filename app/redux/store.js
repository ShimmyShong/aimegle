import { configureStore } from "@reduxjs/toolkit";
import topicReducer from './features/topicSlice'

export const store = configureStore({
    reducer: {
        topicReducer
    }
})

