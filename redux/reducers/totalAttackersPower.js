import { createSlice } from "@reduxjs/toolkit"

const totalPowerSlice = createSlice({
    name: "totalPower",
    initialState: {
        attackPower: 0,
        defencePower: 0,
    },
    reducers: {
        setTotalAttackPower: (state, action) => {
            state.attackPower = action.payload
        },
        setTotalDefencePower: (state, action) => {
            state.defencePower = action.payload
        }
    }
})

export const { setTotalAttackPower, setTotalDefencePower } = totalPowerSlice.actions;

export default totalPowerSlice.reducer