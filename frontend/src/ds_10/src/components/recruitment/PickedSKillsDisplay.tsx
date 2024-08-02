import { motion } from 'framer-motion'
import React from 'react'
import PickedSkill from './PickedSkill'
import { GradeType, SkillType } from '../dashboards/RecruitmentPage'

const GradesToLevelMap = new Map([
    ['Использовал в проекте', 1],
    ['Novice', 2],
    ['Junior', 3],
    ['Middle', 4],
    ['Senior', 5],
    ['Expert', 6],
])

const PickedSKillsDisplay = ({ pickedSkills, setPickedSkills }: { pickedSkills: SkillType[], setPickedSkills: React.Dispatch<React.SetStateAction<SkillType[]>> }) => {
    return (
        <motion.div
            className='flex gap-2 flex-wrap w-full'>
            {pickedSkills.map((skill) => {
                return (
                    <PickedSkill
                        skill={skill}
                        onClick={() => setPickedSkills((prev) => prev.filter(item => item !== skill))}
                        updateGrade={(skill: string, grade: GradeType) => {
                            setPickedSkills((prev) => {
                                return prev.map((pickedSkill) => ({ name: pickedSkill.name, level: pickedSkill.name == skill ? GradesToLevelMap.get(grade) : pickedSkill.level }))
                            })
                        }}
                    />
                )
            })}
        </motion.div>
    )
}

export default PickedSKillsDisplay