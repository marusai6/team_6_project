import React, { useState } from 'react'
import Popover from '../ui/Popover'
import { Button } from '../ui/Button'
import SelectWithSearch from '../ui/SelectWithSearch'
import { SkillType } from '../dashboards/RecruitmentPage'
import useAllSkillOptions from '../../hooks/useAllSkillOptions'

const SkillsPopoverSelect = ({ setPickedSkills }: { setPickedSkills: React.Dispatch<React.SetStateAction<SkillType[]>> }) => {

    const { allSkillsOptions } = useAllSkillOptions()
    const [open, setOpen] = useState(false)

    return (
        <Popover setOpen={setOpen}>
            <Popover.Trigger setOpen={setOpen}>
                <Button variant='outline' className='w-fit h-10'>
                    Выбрать навыки
                </Button>
            </Popover.Trigger>
            <Popover.Content open={open} top='2.9rem' align='left'>
                <SelectWithSearch
                    options={allSkillsOptions}
                    onClick={(value: string) => {
                        setPickedSkills((prev) => [...prev, { name: value, level: 3 }])
                    }}
                    onReset={() => {
                        setOpen(false)
                        setPickedSkills([])
                    }}
                />
            </Popover.Content>
        </Popover>
    )
}

export default SkillsPopoverSelect