import { createSlice } from "@reduxjs/toolkit"

const defendersSlice = createSlice({
    name: "defenders",
    initialState: [],
    reducers: {
        setDeployedDefenders: (state, { payload }) => {
            state.splice(0, state.length, ...payload);
        },
    }
})

export const { setDeployedDefenders } = defendersSlice.actions;

export default defendersSlice.reducer