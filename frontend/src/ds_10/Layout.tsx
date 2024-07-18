import React from 'react'
import Header from './src/components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout