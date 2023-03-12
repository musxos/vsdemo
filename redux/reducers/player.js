import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: {},
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
