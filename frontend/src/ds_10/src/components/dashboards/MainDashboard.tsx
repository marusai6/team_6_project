import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { cn } from '../../lib/utils'
import DonutDashlet from '../dashlets/BaseDashlets/DonutDashlet'
import { motion } from 'framer-motion'
import GeneralDynamicsDashlet from '../dashlets/BaseDashlets/GeneralDynamicsDashlet'
import HiringDynamicsDashlet from '../dashlets/BaseDashlets/HiringDynamicsDashlet'
import TrainingDynamicsDashlet from '../dashlets/BaseDashlets/TrainingDynamicsDashlet'
import EmployeeContactInfoDashlet from '../dashlets/EmployeeDashlets/EmployeeContactInfoDashlet'
import EmployeeDonutDashlet from '../dashlets/EmployeeDashlets/EmployeeDonutDashlet'
import BarChartSkillDashlet from '../dashlets/BaseDashlets/BarChartSkillDashlet'
import BarChartCategoryDashlet from '../dashlets/BaseDashlets/BarChartCategoryDashlet'
import EmployeeDynamicsDashlet from '../dashlets/EmployeeDashlets/EmpoyeeDynamicsDashlet'
import EmployeeSkillBarChartDashlet from '../dashlets/EmployeeDashlets/EmployeeSkillBarChartDashlet copy'
import EmployeeCategoryBarChartDashlet from '../dashlets/EmployeeDashlets/EmployeeCategoryBarChartDashlet'

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
        <div className='flex flex-1 w-full px-20 py-4 3xl:py-10 h-full justify-center items-center bg-background'>
            <motion.div
                variants={{
                    blured: { opacity: 0.2 },
                    notBlured: { opacity: 1 }
                }}
                animate={blurEffect ? "blured" : "notBlured"}
                className={cn('z-20 bg-background w-full h-full flex justify-center items-center')}
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
                                    <EmployeeDynamicsDashlet />
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
                                    {category ? <EmployeeSkillBarChartDashlet /> : <EmployeeCategoryBarChartDashlet />}
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

        </div>

    )
}

export default MainDashboard
