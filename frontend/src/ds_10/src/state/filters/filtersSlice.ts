import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
    year: string
    halfyear: string
}

const initialState: FiltersState = {
    year: '',
    halfyear: ''
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changePeriod: (state, action: PayloadAction<{ year: string, halfyear: string }>) => {
            state.year = action.payload.year
            state.halfyear = action.payload.halfyear
        },
    },
})

export const { changePeriod } = filtersSlice.actions

export default filtersSlice.reducer