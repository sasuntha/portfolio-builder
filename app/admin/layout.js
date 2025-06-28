
import React from 'react'
import Sidenav from './_components/sidenav'
import Provider from './Provider'

export const metadata = {
  title: 'Admin',
  description: 'Admin dashboard',
}

export default function AdminLayout({ children }) {
  return (
    <div >
        <div className='w-24 fixed'>
            <Sidenav />
        </div>
        <div className='ml-24'>
          <Provider>
            {children}
          </Provider>
        </div>
      
    </div>
  )
}
