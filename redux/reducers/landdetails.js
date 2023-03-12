import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    land: 0,
};


export const landsSlice = createSlice({
    name: "lands",
    initialState,
    reducers: {
        setLand: (state, action) => {
            state.land = action.payload;
        }
    },
});

export const { setLand } = landsSlice.actions;
export default landsSlice.reducer;
