import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { cn } from '../lib/utils'
import Header from '../components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ScrollArea } from '../components/ui/scroll-area'
import DonutDashlet from '../components/dashlets/DonutDashlet'
import BarChartDashlet from '../components/dashlets/BarChartDashlet'

function MainPage() {

    const { blurEffect } = useSelector((state: RootState) => state.blurEffect)

    return (
        <div className="flex flex-col relative h-screen w-full bg-background">

            <Header />

            <ScrollArea className="px-20 flex-1 w-full bg-background py-4">
                <div className={cn('z-20 bg-background h-full w-full flex justify-center items-center', blurEffect ? 'opacity-20' : 'opacity-100')}>

                    <div className='max-h-full w-full space-y-2'>
                        <div className='grid grid-cols-3 gap-2 w-full'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Динамика развития</CardTitle>
                                    <CardDescription>по подразделению</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-3xl font-semibold'>118</h2>
                                        <Badge number={5.97} />
                                    </div>
                                    <p className='text-muted-foreground'>Micorosoft BI</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Динамика развития</CardTitle>
                                    <CardDescription>по области знаний</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-3xl font-semibold'>53</h2>
                                        <Badge number={-0.97} />
                                    </div>
                                    <p className='text-muted-foreground'>Базы Данных</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Динамика развития</CardTitle>
                                    <CardDescription>по навыку</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-3xl font-semibold'>29</h2>
                                        <Badge number={1.27} />
                                    </div>
                                    <p className='text-muted-foreground'>Mongo DB</p>
                                </CardContent>
                            </Card>

                        </div>

                        <div className='grid grid-cols-3 gap-2 w-full'>

                            <DonutDashlet />
                            <BarChartDashlet />

                        </div>
                    </div>
                </div>
            </ScrollArea>

        </div>
    )
}

export default MainPage
