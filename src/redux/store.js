import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slicer'

export const store = configureStore({
    reducer: {
        addedArray: counterReducer,
    },
})