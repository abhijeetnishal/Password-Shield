'use client'
import React, { useState } from 'react'
import SaveBtn from '../../public/assets/save-btn.png'
import Image from 'next/image';
import ProtectedRoute from '../protectedRoute';

export type CreatePasswordProps = {
  onClose: () => void
}

const CreatePassword = (props: CreatePasswordProps) => {
    const { onClose } = props;

    const [websiteName, setWebsiteName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function addFunc(){
      if(websiteName && password){
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/passwords`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            websiteName,
            password
        }),
        credentials: 'include',
        });
        response.json().then(data => ({
            data: data,
        })
        ).then(res => {
            //console.log(res);
            window.location.reload(); /* TypeErr: reload() does not take args */
        })
      }
      else{
        setMessage('Enter All Details');
      }
    }
    
    return (
      <ProtectedRoute>
        <div data-testid="create-password" onClick={onClose} className=' min-h-[86vh] flex flex-row items-start justify-center bg-white p-5 '>
            <div onClick={(e) => {e.stopPropagation();}} className='shadow-md border p-6 rounded m-2 flex flex-col w-4/5 lg:w-1/3 '>
                <div className=''>
                  <h1 className='text-xl self-center'>Add New</h1>
                  </div>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="" className='text-gray-500 text-sm'>Website Name</label>
                        <input className='border rounded p-2 text-sm' type="text" name="websitename" value={websiteName} placeholder='websitename' onChange={(e)=>setWebsiteName(e.target.value)} /> 
                    </div>
                <div className='flex flex-col my-2'>
                        <label htmlFor="" className='text-gray-500 text-sm'>Password</label>
                        <input className='border rounded p-2 text-sm' type="password" name="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className=' flex flex-row items-center justify-evenly'>
                    <button className='border border-teal-600 w-full text-teal-600 bg-gray-300 m-1 rounded p-1' onClick={onClose}>Cancel </button>
                    <button className='flex flex-row items-center justify-center border border-teal-600  bg-teal-600 m-1 rounded p-1 text-white w-full' onClick={addFunc}>
                        <Image className='' src={SaveBtn} alt="" />
                        <div className=''>Save</div>
                    </button>
                </div>
                  <p className='text-red-500 self-center m-1 font-light'>
                    {message}
                  </p>
            </div>
        </div>
        </ProtectedRoute>
    )
}

export default CreatePassword