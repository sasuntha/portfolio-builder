"use client"
import { db } from '@/utils';
import { userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { Userdetailcontext } from '../_context/Usedetailcontext';

const Provider = ({children}) => {
  
  return (
    
    <div>{children}</div>

  )
}

export default Provider