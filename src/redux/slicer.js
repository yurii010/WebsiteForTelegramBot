import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    arr: [],
}

export const counterSlice = createSlice({
    name: 'addedArray',
    initialState,
    reducers: {
        increment: (state, value) => {
            state.value += value
        },
        decrement: (state, value) => {
            state.value -= value
        },
    },
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer