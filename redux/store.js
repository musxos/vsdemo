import { configureStore } from "@reduxjs/toolkit";
import attackersSlice from "./reducers/attackers";
import defendersSlice from "./reducers/defenders";
//import deployedHeroes from "./reducers/deployedHeroes"
import totalPowerSlice from "./reducers/totalAttackersPower";
import landsSlice from "./reducers/landdetails";
import playerSlice from "./reducers/player";

export const store = configureStore({
  reducer: {
    attackers: attackersSlice,
    defenders: defendersSlice,
    //deployedheroes: deployedHeroes,
    totalpower: totalPowerSlice,
    lands: landsSlice,
    player: playerSlice,
  },
});
