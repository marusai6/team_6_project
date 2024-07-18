import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { cn } from '../lib/utils'
import Badge from './ui/Badge'
import { ScrollArea } from './ui/scroll-area'
import DonutDashlet from './dashlets/DonutDashlet'
import BarChartDashlet from './dashlets/BarChartDashlet'
import { motion } from 'framer-motion'
import DynamicsByDepartmentDashlet from './dashlets/DynamicsByDepartmentDashlet'
import DynamicsBySkillSetDashlet from './dashlets/DynamicsBySkillSetDashlet'
import DynamicsBySkillDashlet from './dashlets/DynamicsBySkillDashlet'

function MainDashboard() {

    const { blurEffect } = useSelector((state: RootState) => state.blurEffect)

    const staggerDalayAnimation = 0.05
    const cardVariants = {
        show: { opacity: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0 }
    }

    return (
        <ScrollArea className="px-20 flex-1 w-full bg-background py-4">
            <motion.div
                variants={{
                    blured: { opacity: 0.2 },
                    notBlured: { opacity: 1 }
                }}
                animate={blurEffect ? "blured" : "notBlured"}
                className={cn('z-20 bg-background h-full w-full flex justify-center items-center')}>

                <motion.div
                    initial={"hidden"}
                    animate={"show"}
                    transition={{ staggerChildren: staggerDalayAnimation * 3 }}
                    className='max-h-full w-full space-y-2'
                >
                    <motion.div
                        transition={{ staggerChildren: staggerDalayAnimation }}
                        className='grid grid-cols-3 gap-2 w-full'
                    >

                        <motion.div variants={cardVariants}>
                            <DynamicsByDepartmentDashlet />
                        </motion.div>

                        <motion.div variants={cardVariants}>
                            <DynamicsBySkillSetDashlet />
                        </motion.div>

                        <motion.div variants={cardVariants}>
                            <DynamicsBySkillDashlet />
                        </motion.div>

                    </motion.div>


                    <motion.div
                        transition={{ staggerChildren: staggerDalayAnimation }}
                        className='grid grid-cols-3 gap-2 w-full'
                    >

                        <motion.div variants={cardVariants}>
                            <DonutDashlet />
                        </motion.div>

                        <motion.div variants={cardVariants} className='col-span-2'>
                            <BarChartDashlet />
                        </motion.div>

                    </motion.div>

                </motion.div>
            </motion.div>
        </ScrollArea>

    )
}

export default MainDashboard
