import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import Popover from './ui/Popover'
import { cn } from '../lib/utils';

const GeneralEmployeeSkillCategoryPopover = ({ category, skills }: { category: string, skills: { skill: string; level: string; }[] }) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover setOpen={setOpen}>
            <Popover.Trigger setOpen={setOpen}>
                <div className={cn('flex gap-2 items-center cursor-pointer hover:bg-accent hover:text-primary px-3 py-1 rounded transition-all', open && 'bg-accent text-primary')}>
                    <h3 className='font-medium text-lg'>{category}</h3>
                    <ChevronDown />
                </div>
            </Popover.Trigger>
            <Popover.Content align='center' open={open} top='2.5rem' activateBlur={false}>
                <div className='rounded bg-card shadow w-[500px] divide-y'>
                    {skills.map((skill) => {
                        return (
                            <div className='grid grid-cols-3 px-4 py-2 hover:bg-accent transition-all'>
                                <p className='col-span-1'>{skill.skill}</p>
                                <p className='col-span-2'>{skill.level}</p>
                            </div>
                        )
                    })}
                </div>
            </Popover.Content>
        </Popover>
    )
}

export default GeneralEmployeeSkillCategoryPopover