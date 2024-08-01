import React from 'react'
import Logo from '../svgs/Logo'
import Filters from './Filters'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../App'

const Header = () => {
    return (
        <header>
            <div className='relative flex justify-between bg-primary w-full px-20 pt-6 pb-2'>

                <Link to={`${BASE_URL}`}>
                    <div className='size-14 cursor-pointer'>
                        <Logo />
                    </div>
                </Link>

                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <h1 className='text-3xl text-white font-bold'>Демонстрация Аналитики Развития</h1>
                    <h4 className='text-white'>Эффективная визуализация данных</h4>
                </div>

                <Menu />

            </div>

            <div className='flex justify-center bg-gradient-to-b from-primary via-primary via-50% to-background to-50% w-full'>
                <Filters />
            </div>
        </header>
    )
}

export default Header