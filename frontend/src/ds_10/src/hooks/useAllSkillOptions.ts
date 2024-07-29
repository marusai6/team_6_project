import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"

const useAllSkillOptions = () => {
    const { skillsByCategories } = useSelector((state: RootState) => state.filterOptions)

    const [allSkillsOptions, setAllSkillsOptions] = useState<string[]>([])

    const getAllSkills = () => {
        let allSkills = []
        Object.values(skillsByCategories).forEach((skills) => allSkills = allSkills.concat(skills))
        const allSkillsSet = new Set(allSkills)
        return Array.from(allSkillsSet)
    }

    useEffect(() => {
        if (skillsByCategories) {
            setAllSkillsOptions(getAllSkills())
        }
    }, [skillsByCategories])

    return { allSkillsOptions }
}

export default useAllSkillOptions