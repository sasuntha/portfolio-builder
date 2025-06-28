"use client"
import { db } from '@/utils';
import { userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Createusername = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const[success,setsuccess] = useState('');
    const {user} = useUser();
    const router = useRouter();
    useEffect(()=>{
        user&&checkuser();
    },[user])

    const checkuser = async()=>{
        const result = await db.select().from(userinfo).where(eq(userinfo.email,user?.primaryEmailAddress?.emailAddress))
    
        if(result?.length > 0){
          router.push('/admin') 
    
        }
      }

    const createbtn = async() => {
        if (username.length > 10) {
            setError('Name length cannot be more than 10');
            return;
        }
        setError('');
        const result = await db.insert(userinfo).values({
            name:user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress,
            username:username.replace(' ','')
        })
        if(result){
            setsuccess('Creation completed');
            router.push('/admin');
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="p-10 border rounded-lg text-center flex flex-col">
                <h2 className='font-bold text-2xl py-3'>Create portfolio username</h2>
                <label className='mb-2'>Add username</label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <button className='btn btn-primary mt-3' disabled={!username} onClick={createbtn}>
                    Create
                </button>

                {error && (
                    <div role="alert" className="alert alert-error mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Your purchase has been confirmed!</span>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Createusername
