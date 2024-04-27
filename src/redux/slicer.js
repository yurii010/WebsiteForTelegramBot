import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    arr: [],
}

export const counterSlice = createSlice({
    name: 'addedArray',
    initialState,
    reducers: {
        add: (state, action) => {
            state.arr.push(action.payload);
        },
        remove: (state, action) => {
            state.arr = state.arr.filter(item => item.id !== action.payload.id); 
        },
    },
})

export const { add, remove } = counterSlice.actions

export default counterSlice.reducer