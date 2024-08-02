import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BlurEffectState = {
    blurEffect: boolean
}

const initialState: BlurEffectState = {
    blurEffect: false
}

const BlurEffectSlice = createSlice({
    name: "blurEffect",
    initialState,
    reducers: {
        changeBlurEffect: (state, action: PayloadAction<boolean>) => {
            state.blurEffect = action.payload
        },
    },
})

export const { changeBlurEffect } = BlurEffectSlice.actions

export default BlurEffectSlice.reducer