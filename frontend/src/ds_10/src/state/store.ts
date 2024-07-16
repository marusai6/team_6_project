import { configureStore } from "@reduxjs/toolkit"
import blurEffectReducer from "./blurEffect/blurEffectSlice"

export const store = configureStore({
    reducer: {
        blurEffect: blurEffectReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch