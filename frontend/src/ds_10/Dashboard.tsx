import React from 'react'
import Logo from './src/components/Logo'
import { Menu } from 'lucide-react'
import Filters from './src/components/Filters'

function Dashboard() {

    return (
        <div className="relative h-screen w-full flex flex-col">

            <div className='relative flex justify-between bg-primary w-full px-10 pt-6 pb-2'>

                <div className='size-14 cursor-pointer'>
                    <Logo />
                </div>

                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <h1 className='text-3xl text-white font-bold'>Демонстрация Аналитики Развития</h1>
                    <h4 className='text-white'>Эффективная визуализация данных</h4>
                </div>

                <Menu size={50} strokeWidth={2} className='text-white hover:bg-secondary hover:text-primary p-2 cursor-pointer rounded transition-all' />

            </div>

            <div className='flex justify-center bg-gradient-to-b from-primary via-primary via-50% to-white to-50% w-full'>
                <Filters />
            </div>

            <div className="flex-1 grid grid-cols-12 grid-rows-5 gap-4 my-4 mx-4">
                Основная рабочая область
            </div>

        </div>
    )
}

export default Dashboard
