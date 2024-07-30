import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '../lib/utils'

export const levelsToTitlesMap = new Map([
    [1, 'Использовал на проекте'],
    [2, 'Novice'],
    [3, 'Junior'],
    [4, 'Middle'],
    [5, 'Senior'],
    [6, 'Expert'],
])

const LevelGroupSection = ({ levelGroup, pickedSkillNames }: { levelGroup: { level: string, skills: string[] }, pickedSkillNames: string[] }) => {

    if (!levelGroup.skills.length) return

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`skillGroup-${levelGroup.level}`}
            className='space-y-1'
        >
            <h3 className='text-lg font-medium'>{levelGroup.level}</h3>
            <motion.div
                initial={"hidden"}
                animate={"visible"}
                transition={{ staggerChildren: 0.05 }}
                className='flex gap-1 flex-wrap'
            >
                {levelGroup.skills.map((skill) => {
                    return (
                        <motion.p
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 }
                            }}
                            className={cn("px-2 py-1 rounded bg-accent", pickedSkillNames.includes(skill) && 'bg-secondary')} key={`${skill}`}
                        >
                            {skill}
                        </motion.p>)
                })}
            </motion.div>
        </motion.div>
    )
}

export default LevelGroupSection