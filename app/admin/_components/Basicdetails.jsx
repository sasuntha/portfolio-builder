
import { Userdetailcontext } from '@/app/_context/Usedetailcontext';
import { db } from '@/utils';
import { storage } from '@/utils/firebaseConfig';
import { userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { ref, uploadBytes } from 'firebase/storage';
import { Camera, Link2, MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Basicdetails = () => {
  const timeoutIdRef = useRef(null);
  const {user} = useUser();
  const [selectedoption,setselectedoption] = useState();
  const [profileimage,setprofileimage] = useState();

  const{userdetail,setuserdetail} = useContext(Userdetailcontext);

  useEffect(()=>{
    userdetail&&setprofileimage(userdetail?.profileimage)
  },[userdetail])

  const onInputChange = (event, fieldname) => {
    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(async () => {
      try {
        const result = await db.update(userinfo).set({
          [fieldname]: event.target.value,
        }).where(eq(userinfo.email,user?.primaryEmailAddress.emailAddress))

        if (result) {
          toast.success('Saved',{position:'bottom-right'})
        } else {
          toast.error('Try agin later',{position:'bottom-right'})
        }
      } catch {
        toast.error('Try agin later',{position:'bottom-right'})
        
      }
    }, 1000);
  };

  const handlefileinput = (event)=>{
    const file = event.target.files[0]
    const filename = Date.now().toString()+'.'+file.type.split('/')[1]
    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, file).then(async(snapshot) => {
      console.log('Uploaded a blob or file!');
      const result = await db.update('userinfo').set({
        profileimage:filename+"?alt=media"
      }).where(eq(userinfo.email,user?.primaryEmailAddress.emailAddress))
      if(result){
        setprofileimage(filename)
        toast.success('Success',{position:'bottom-right'})
      }
    });
  }

  return (
    <div className='p-7 rounded-lg bg-gray-800 my-7'>
      <div className="flex gap-2 items-center mb-3">
        {profileimage? 
          <Image src={profileimage} width={40} height={40} alt='profile-image'/>
        :<div>
        <label htmlFor='file-input'>
          <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full' />
        </label>

        
        </div>}
        <input type="file" id='file-input' style={{display:'none'}} onChange={handlefileinput}/>
        <input
          type="text"
          placeholder="Username"
          className="input w-full"
          defaultValue={userdetail?.name}
          onChange={(event) => onInputChange(event, 'name')}
        />
      </div>

      <textarea
        className="textarea w-full"
        placeholder="About you"
        defaultValue={userdetail.bio}
        onChange={(event) => onInputChange(event, 'bio')}
      ></textarea>
      <div className="">
        <div className="flex gap-3 mt-3">
          <MapPin className={`h-12 w-12 p-3 rounded-md hover:bg-gray-400 ${selectedoption=='map'&&'bg-gray-600'} `} onClick={()=>setselectedoption('map')}/>
          <Link2 className={`h-12 w-12 p-3 rounded-md hover:bg-gray-400 ${selectedoption=='link'&&'bg-gray-600'}`} onClick={()=>setselectedoption('link')}/>
        </div>
        {selectedoption == 'map'?<div className="mt-5">
          <label className="input w-full">
          <MapPin/>
          <input type="text" className="grow" placeholder="Location" key={1} onChange={(event) => onInputChange(event, 'location')} defaultValue={userdetail?.location}/>
          </label>
        </div>: selectedoption == 'link'?<div className="mt-5">
          <label className="input w-full">
          <Link2/>
          <input type="text" className="grow" placeholder="URL" key={2} onChange={(event) => onInputChange(event, 'link')} defaultValue={userdetail?.link}/>
          </label>
        </div>: null}
      </div>
    </div>
  );
};

export default Basicdetails;
