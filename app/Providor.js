"use client"
import { db } from '@/utils';
import { userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { Userdetailcontext } from './_context/Usedetailcontext';

const Providor = ({children}) => {
    const {user} = useUser();
  const [userdetail,setuserdetail] = useState([]);
  useEffect(()=>{
    user&&getuserdetails();
  },[user])
  const getuserdetails=async ()=>{
    const result = await db.select().from(userinfo).where(eq(userinfo.email,user?.primaryEmailAddress.emailAddress))
    setuserdetail(result[0]);
  }
  return (
    <div>
        <Userdetailcontext.Provider value={{userdetail,setuserdetail}}>
        {children}
        </Userdetailcontext.Provider>
    </div>
  )
}

export default Providor