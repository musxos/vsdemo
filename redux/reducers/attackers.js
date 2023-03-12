import { createSlice } from "@reduxjs/toolkit";

const attackersSlice = createSlice({
  name: "attackers",
  initialState: [],
  reducers: {
    setDeployedAttackers: (state, { payload }) => {
      state.splice(0, state.length, ...payload);
    },
  },
});

export const { setDeployedAttackers, setTotalAttackersPower } =
  attackersSlice.actions;

export default attackersSlice.reducer;
