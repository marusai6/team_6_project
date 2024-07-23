import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type KnowledgeCategory = {
    knowledgeCategory: string
    skills: string[]
}

type FilterOptionsState = {
    departments: string[]
    employees: string[]
    knowledgeCategories: KnowledgeCategory[]
}

const initialState: FilterOptionsState = {
    departments: [],
    employees: [],
    knowledgeCategories: []
}

const filterOptionsSlice = createSlice({
    name: "filterOptions",
    initialState,
    reducers: {
        changefilterOptions: (state, action: PayloadAction<boolean>) => {
            console.log('check')
        },
    },
})

export const { changefilterOptions } = filterOptionsSlice.actions

export default filterOptionsSlice.reducer