import { UserButton } from '@clerk/nextjs'
import { BarChart, Brush, Layers3, Settings } from 'lucide-react'
import React from 'react'

const Sidenav = () => {
    const menulist = [
        {
            id:1,
            name:'Pages',
            icon:Layers3
        },
        {
            id:2,
            name:'Style',
            icon:Brush
        },
        {
            id:3,
            name:'Stats',
            icon:BarChart
        },
        {
            id:4,
            name:'Settings',
            icon:Settings
        }
    ]
  return (
    <div className='p-4 bg-[#00000052] h-screen'>
        {menulist.map((menu,index)=>(
            <div className="p-2 py-4 rounded-lg bg-primary flex items-center justify-center cursor-pointer mb-5 tooltip tooltip-primary tooltip-right" data-tip={menu.name}><menu.icon className='text-white'/></div>
        ))}
        <div className="fixed bottom-5 px-4">
            <UserButton/>
        </div>
    </div>
  )
}

export default Sidenav