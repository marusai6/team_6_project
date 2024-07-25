import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
    year: string
    halfyear: string
    category: string
    skill: string
    department: string
    employee: string
}

const initialState: FiltersState = {
    year: '',
    halfyear: '',
    category: '',
    skill: '',
    department: '',
    employee: ''
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changePeriod: (state, action: PayloadAction<{ year: string, halfyear: string }>) => {
            state.year = action.payload.year
            state.halfyear = action.payload.halfyear
        },
        changeCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
        changeSkill: (state, action: PayloadAction<string>) => {
            state.skill = action.payload
        },
        changeDepartment: (state, action: PayloadAction<string>) => {
            state.department = action.payload
        },
        changeEmployee: (state, action: PayloadAction<string>) => {
            state.employee = action.payload
        },
    },
})

export const { changePeriod, changeCategory, changeSkill, changeDepartment, changeEmployee } = filtersSlice.actions

export default filtersSlice.reducer