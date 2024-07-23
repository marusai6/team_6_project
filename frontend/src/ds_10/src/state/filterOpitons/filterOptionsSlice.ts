import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SkillsByCategoryType = {
    [category: string]: string[]
}

type FilterOptionsState = {
    departments: string[]
    employees: string[]
    knowledgeCategories: string[]
    skillsByCategories: SkillsByCategoryType
}

const initialState: FilterOptionsState = {
    departments: [],
    employees: [],
    knowledgeCategories: [],
    skillsByCategories: {},
}

const filterOptionsSlice = createSlice({
    name: "filterOptions",
    initialState,
    reducers: {
        updateSkillsByCategories: (state, action: PayloadAction<SkillsByCategoryType>) => {
            state.skillsByCategories = action.payload
        },
        updateKnowledgeCategories: (state, action: PayloadAction<string[]>) => {
            state.knowledgeCategories = action.payload
        },
        updateDepartments: (state, action: PayloadAction<string[]>) => {
            state.departments = action.payload
        },
        updateEmployees: (state, action: PayloadAction<string[]>) => {
            state.employees = action.payload
        },
    },
})

export const { updateSkillsByCategories, updateKnowledgeCategories, updateDepartments, updateEmployees } = filterOptionsSlice.actions

export default filterOptionsSlice.reducer