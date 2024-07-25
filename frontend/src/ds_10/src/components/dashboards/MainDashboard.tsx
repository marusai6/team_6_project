import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { cn } from '../../lib/utils'
import { ScrollArea } from '../ui/scroll-area'
import DonutDashlet from '../dashlets/DonutDashlet'
import BarChartDashlet from '../dashlets/BarChartDashlet'
import { motion } from 'framer-motion'
import GeneralDynamicsDashlet from '../dashlets/GeneralDynamicsDashlet'
import HiringDynamicsDashlet from '../dashlets/HiringDynamicsDashlet'
import TrainingDynamicsDashlet from '../dashlets/TrainingDynamicsDashlet'
import { UrlState } from 'bi-internal/core'
import { changeCategory, changeDepartment, changeEmployee, changePeriod, changeSkill } from '../../state/filters/filtersSlice'
import GeneralEmpoyeeDashlet from '../dashlets/GeneralEmpoyeeDashlet'
import EmployeeContactInfoDashlet from '../dashlets/EmployeeContactInfoDashlet'

function MainDashboard() {


    // UI Code
    const { blurEffect } = useSelector((state: RootState) => state.blurEffect)

    const staggerDalayAnimation = 0.05
    const cardVariants = {
        show: { opacity: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0 }
    }

    // Filters Handling

    const { year, halfyear, category, skill, department, employee } = useSelector((state: RootState) => state.filters)

    const dispatch = useDispatch()

    const callback = useCallback((model) => {
        if (year != model.year || halfyear != model.halfyear) {
            dispatch(changePeriod({ year: model.year, halfyear: model.halfyear }))
        }
        if (category != model.knowledgeField) {
            dispatch(changeCategory(model.knowledgeField))
        }
        if (skill != model.skill) {
            dispatch(changeSkill(model.skill))
        }
        if (department != model.department) {
            dispatch(changeDepartment(model.department))
        }
        if (department != model.department) {
            dispatch(changeDepartment(model.department))
        }
        if (employee != model.employee) {
            dispatch(changeEmployee(model.employee))
        }
    }, [year, halfyear, category, skill, department, employee])

    useEffect((): (() => void) => {
        UrlState.subscribeUpdatesAndNotify(callback)
        return () => UrlState.unsubscribe(callback)
    }, [])

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
