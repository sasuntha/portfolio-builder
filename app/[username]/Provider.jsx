"use client"
import { db } from '@/utils';
import { userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect } from 'react'
import { Userdetailcontext } from '../_context/Usedetailcontext';

const Provider = ({children}) => {
  const {user} = useUser();
  const {userdetail,setuserdetail} = useContext(Userdetailcontext);
  useEffect(()=>{
    user&&getuserdetails();
  },[user])
  const getuserdetails = async()=>{
    const result = await db.query.userinfo.findMany({
      with:{
        project:true
      },
      where:eq(userinfo.email,user?.primaryEmailAddress.emailAddress)
    })
    setuserdetail(result);
  }
  return (
    <div data-theme = {userdetail?.theme}>
        {children}
    </div>
  )
}

export default Provider