import React, { useState } from 'react'
import Popover from './ui/Popover'
import { X } from 'lucide-react'
import Select from './ui/Select'
import { GradeType, SkillType } from './dashboards/RecruitmentPage'

const PickedSkill = ({ skill, onClick, updateGrade }: { skill: SkillType, onClick: () => void, updateGrade: (skill: string, grade: GradeType) => void }) => {

    const [open, setOpen] = useState(false)
    return (
        <Popover setOpen={setOpen}>
            <Popover.Trigger setOpen={setOpen}>
                <div
                    className='h-10 px-2 flex gap-1 items-center bg-secondary text-primary rounded cursor-pointer hover:bg-primary hover:text-white transition-all'
                    key={skill.name}
                >
                    <p>{skill.name}</p>
                    <X size={18}
                        className='cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation()
                            onClick()
                        }}
                    />
                </div>
            </Popover.Trigger>
            <Popover.Content open={open} top='2.9rem' align='center'>
                <Select active={skill.grade} options={["Использовал на проекте", "Novice", "Junior", "Middle", "Senior", "Expert"]} onClick={(value: GradeType) => { setOpen(false); updateGrade(skill.name, value) }} />
            </Popover.Content>
        </Popover>
    )
}

export default PickedSkill