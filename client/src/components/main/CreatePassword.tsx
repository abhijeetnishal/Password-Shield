import React, { useState } from 'react'
import SaveBtn from '../../assets/save-btn.png'
import '../../styles/EditPassword.css'

const CreatePassword = (props) => {
    const {onClose} = props;

    const [websiteName, setWebsiteName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function addFunc(){
      if(websiteName && password){
        const response = await fetch('https://passwordmanagerserver.vercel.app/passwords',{
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
            window.location.reload(false);
        })
      }
      else{
        setMessage('Enter All Details');
      }
    }
    
    return (
        <div onClick={onClose} className='editOverlay'>
            <div onClick={(e) => {e.stopPropagation();}} className='editModalContainer'>
                <div className='editDataText'>Add New </div>
                <div className='websiteNameContainer'>
                    <div>
                        <label htmlFor="" className='websiteName'>Website Name</label>
                    </div>
                    <div>
                        <input className='inputField' type="text" name="websitename" value={websiteName} placeholder='websitename' onChange={(e)=>setWebsiteName(e.target.value)} /> 
                    </div>
                </div>
                <div className='passwordContainer'>
                    <div>
                        <label htmlFor="" className='websiteName'>Password</label>
                    </div>
                    <div>
                        <input className='inputField' type="password" name="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='editBtnContainer'>
                    <button className='cancelBtn' onClick={onClose}>cancel </button>
                    <button className='saveBtn' onClick={addFunc}>
                        <img className='saveBtnImg' src={SaveBtn} alt="" />
                        <div className='saveText'>Save</div>
                    </button>
                </div>
                <div className='editMessage'>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default CreatePassword