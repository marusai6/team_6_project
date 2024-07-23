import { configureStore } from "@reduxjs/toolkit"
import blurEffectReducer from "./blurEffect/blurEffectSlice"
import filtersReducer from "./filters/filtersSlice"

export const store = configureStore({
    reducer: {
        blurEffect: blurEffectReducer,
        filters: filtersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch