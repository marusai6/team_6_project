import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { cn } from '../../lib/utils'
import { ScrollArea } from '../ui/scroll-area'
import DonutDashlet from '../dashlets/BaseDashlets/DonutDashlet'
import BarChartDashlet from '../dashlets/BaseDashlets/BarChartCategoryDashlet'
import { motion } from 'framer-motion'
import GeneralDynamicsDashlet from '../dashlets/BaseDashlets/GeneralDynamicsDashlet'
import HiringDynamicsDashlet from '../dashlets/BaseDashlets/HiringDynamicsDashlet'
import TrainingDynamicsDashlet from '../dashlets/BaseDashlets/TrainingDynamicsDashlet'
import GeneralEmpoyeeDashlet from '../dashlets/EmployeeDashlets/EmpoyeeDynamicsDashlet'
import EmployeeContactInfoDashlet from '../dashlets/EmployeeDashlets/EmployeeContactInfoDashlet'
import EmployeeBarChartDashlet from '../dashlets/EmployeeDashlets/EmployeeBarChartDashlet'
import EmployeeDonutDashlet from '../dashlets/EmployeeDashlets/EmployeeDonutDashlet'
import BarChartSkillDashlet from '../dashlets/BaseDashlets/BarChartSkillDashlet'
import BarChartCategoryDashlet from '../dashlets/BaseDashlets/BarChartCategoryDashlet'

function MainDashboard() {


    // UI Code
    const { blurEffect } = useSelector((state: RootState) => state.blurEffect)

    const staggerDalayAnimation = 0.05
    const cardVariants = {
        show: { opacity: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0 }
    }

    const { employee, category } = useSelector((state: RootState) => state.filters)

    return (
        <ScrollArea className="px-20 flex-1 w-full bg-background py-4">
            <motion.div
                variants={{
                    blured: { opacity: 0.2 },
                    notBlured: { opacity: 1 }
                }}
                animate={blurEffect ? "blured" : "notBlured"}
                className={cn('z-20 bg-background h-full w-full flex justify-center items-center')}
            >

                <motion.div
                    initial={"hidden"}
                    animate={"show"}
                    transition={{ staggerChildren: staggerDalayAnimation * 3 }}
                    className='flex flex-col h-full w-full space-y-2'
                >
                    <motion.div
                        transition={{ staggerChildren: staggerDalayAnimation }}
                        className='grid grid-cols-3 gap-2 w-full'
                    >

                        {employee ?
                            <>
                                <motion.div variants={cardVariants}>
                                    <GeneralEmpoyeeDashlet />
                                </motion.div>

                                <motion.div variants={cardVariants} className='col-span-2'>
                                    <EmployeeContactInfoDashlet />
                                </motion.div>
                            </> :
                            <>
                                <motion.div variants={cardVariants}>
                                    <GeneralDynamicsDashlet />
                                </motion.div>

                                <motion.div variants={cardVariants}>
                                    <HiringDynamicsDashlet />
                                </motion.div>

                                <motion.div variants={cardVariants}>
                                    <TrainingDynamicsDashlet />
                                </motion.div>
                            </>
                        }

                    </motion.div>


                    <motion.div
                        transition={{ staggerChildren: staggerDalayAnimation }}
                        className='grid grid-cols-3 gap-2 w-full flex-1'
                    >
                        {employee ?
                            <>
                                <motion.div variants={cardVariants}>
                                    <EmployeeDonutDashlet />
                                </motion.div>

                                <motion.div variants={cardVariants} className='col-span-2'>
                                    <EmployeeBarChartDashlet />
                                </motion.div>
                            </> :
                            <>
                                <motion.div variants={cardVariants}>
                                    <DonutDashlet />
                                </motion.div>

                                <motion.div variants={cardVariants} className='col-span-2'>
                                    {category ? <BarChartSkillDashlet /> : <BarChartCategoryDashlet />}
                                </motion.div>
                            </>
                        }

                    </motion.div>

                </motion.div>
            </motion.div>
        </ScrollArea>

    )
}

export default MainDashboard
