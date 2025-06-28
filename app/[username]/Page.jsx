"use client"
import React, { useContext } from 'react'
import Userdetailinfo from './_components/Userdetailinfo'
import Projectlist from './_components/Projectlist'
import { Userdetailcontext } from '../_context/Usedetailcontext';

const Userpage = () => {
  const {userdetail,setuserdetail} = useContext(Userdetailcontext);
  return (
    <div className='p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div className=""><Userdetailinfo userdetail={userdetail}/></div>
      <div className="md:col-span-2"><Projectlist/></div>
    </div>
  )
}

export default Userpage