import React, { useEffect, useState } from 'react'
import Basicdetails from './Basicdetails'
import Addproject from './Addproject'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils'
import { project } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import Projectlistedit from './Projectlistedit'
import { toast } from 'react-toastify'

const Formcontent = () => {
  const {user} = useUser();
  const [projectlist, setprojectlist] = useState([]);
   useEffect(()=>{
    user&&getprojectlist();
   },[user])

   const getprojectlist=async()=>{
    const result = await db.select().from(project).where(eq(project.emailref,user?.primaryEmailAddress.emailAddress)).orderBy(desc(project.id))

    setprojectlist(result);

    
   }
  return (
    <div className='py-12 px-6 overflow-auto'>
      <h1 className='text-3xl font-bold text-gray-500'>Start designing your portfolio</h1>
      <Basicdetails/>
      <hr className='my-5'/>
      <Addproject/>
      <Projectlistedit projectList={projectlist} refreshdata={getprojectlist}/>
    </div>
  )
}

export default Formcontent