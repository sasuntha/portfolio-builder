"use client"
import { Userdetailcontext } from '@/app/_context/Usedetailcontext';
import { db } from '@/utils';
import { project } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Link2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';

const Addproject = () => {
    const [openurlinput,setopenurlinput]=useState(false);
    const {user} = useUser();
    const{userdetail,setuserdetail} = useContext(Userdetailcontext);
    const [loading,setloading] = useState(false);
    const handlesubmit=async(e)=>{
        e.preventDefault();
        setloading(true);
        const resul = await db.insert(project).values({
            url:e.target[0].value,
            emailref:user?.primaryEmailAddress.emailAddress,
            userref:userdetail?.id
        })
        setopenurlinput(false);
        if(resul){
            setloading(false);
            toast.success('New project created',{position:'top-right'})
        }
        else{
            setloading(false);
        }
    }
  return (
    <div>
        {!openurlinput ? <button className='btn btn-primary w-full' onClick={()=>setopenurlinput(true)}>+ Add new project</button>
        :
        <form onSubmit={handlesubmit} className='p-3 rounded-lg bg-gray-800'>
            <label className="input w-full my-3">
                <Link2/>
            <input type="url" className="grow w-full" placeholder="Project URL" />
            </label>
            <button className='btn btn-primary w-full' type='submit' disabled={loading}>+ Add new project</button>
        </form>}
    </div>
  )
}

export default Addproject