import { configureStore } from "@reduxjs/toolkit"
import blurEffectReducer from "./blurEffect/blurEffectSlice"
import filtersReducer from "./filters/filtersSlice"
import filterOptionsReducer from "./filterOpitons/filterOptionsSlice"

export const store = configureStore({
    reducer: {
        blurEffect: blurEffectReducer,
        filters: filtersReducer,
        filterOptions: filterOptionsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch