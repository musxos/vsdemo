import { createSlice } from "@reduxjs/toolkit"

const deployedHeroesSlice = createSlice({
    name: "deployedHeroes",
    initialState: [],
    reducers: {
        setDeployedHeroes: (state, action) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        }
    }
})

export const { setDeployedHeroes } = deployedHeroesSlice.actions;

export default deployedHeroesSlice.reducer