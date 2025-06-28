"use client"
import { db } from '@/utils'
import { userinfo } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
import Formcontent from './_components/Formcontent'
import Mobilepreview from './_components/Mobilepreview'

const Admin = () => {
  const {user} = useUser();
  const router = useRouter();

  useEffect(()=>{
    user&&checkuser();
  },[user])
  const checkuser = async()=>{
    const result = await db.select().from(userinfo).where(eq(userinfo.email,user?.primaryEmailAddress?.emailAddress))

    if(result?.length == 0){
      router.push('/create') 

    }
  }
  return (
    <div className='p-5'>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2"><Formcontent/></div>
        <div><Mobilepreview/></div>
      </div>
    </div>
  )
}

export default Admin