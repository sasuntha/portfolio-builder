import React from 'react'

const Mobilepreview = () => {
  return (
    <div className='p-5 md:fixed'>
        <div className="border-[13px] min-w-[340px] w-full max-w-[400px] max-h-[650px] border-black h-screen rounded-[40px] m-2 shadow-md shadow-primary"></div>
        <iframe title='profile' width="100%" height="100%" className='rounded-[25px]'/>
    </div>
  )
}

export default Mobilepreview