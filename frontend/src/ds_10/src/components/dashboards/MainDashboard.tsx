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
import { changePeriod } from '../../state/filters/filtersSlice'

function MainDashboard() {


    // UI Code
    const { blurEffect } = useSelector((state: RootState) => state.blurEffect)

    const staggerDalayAnimation = 0.05
    const cardVariants = {
        show: { opacity: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0 }
    }

    // Filters Handling

    const { year, halfyear } = useSelector((state: RootState) => state.filters)

    const dispatch = useDispatch()

    const callback = useCallback((model) => {
        if (year != model.year || halfyear != model.halfyear) {
            dispatch(changePeriod({ year: model.year, halfyear: model.halfyear }))
        }
    }, [year, halfyear])

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
                            <GeneralDynamicsDashlet />
                        </motion.div>

                        <motion.div variants={cardVariants}>
                            <HiringDynamicsDashlet />
                        </motion.div>

                        <motion.div variants={cardVariants}>
                            <TrainingDynamicsDashlet />
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
