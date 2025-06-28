import { MapPin } from 'lucide-react'
import React from 'react'

const Userdetailinfo = ({userdetail}) => {
  return (
    <div className='flex flex-col justify-center md:h-screen'>
        <div className="w-full flex items-center justify-center">
            <div className="flex md:flex-col items-center md:items-start gap-4">
                <img src={userdetail?.profileimage} alt="" className='w-[70px] h-[70px] rounded-full'/>
                <div className="">
                    <h2 className='font-bold text-lg md:text-2xl'>{userdetail?.name}</h2>
                    <h2 className='flex gap-2 items-center'><MapPin>{userdetail.location}</MapPin></h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Userdetailinfo