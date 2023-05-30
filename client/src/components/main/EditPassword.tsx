import React, { useState } from 'react'
import '../../styles/EditPassword.css'
import SaveBtn from '../../assets/save-btn.png'

const EditPassword = (props) => {
  const {item, onClose, editData, updateBtn} = props;

  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function updateFunc(){
    if(websiteName && password){
      updateBtn(true);
      editData({websiteName, password});
    }
    else{
      setMessage('Enter All Details');
    }
  }

  return (
    <div onClick={onClose} className='editOverlay'>
      <div onClick={(e) => {e.stopPropagation();}} className='editModalContainer'>
          <div className='editDataText'>
            Edit {item} Data
          </div>
          <div className='websiteNameContainer'>
            <div>
              <label htmlFor="" className='websiteName'>Website Name</label>
            </div>
            <div>
                <input className='inputField' type="text" value={websiteName} onChange={(e)=>setWebsiteName(e.target.value)} placeholder='Google' />
            </div>  
          </div>
          <div className='passwordContainer'>
            <div>
              <label htmlFor="" className='websiteName'>Password</label>
            </div>
            <div>
              <input className='inputField' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='1234567sdfgh' />
            </div> 
          </div>
          <div className='editBtnContainer'>
            <button className='cancelBtn' onClick={onClose}>cancel </button>
            <button className='saveBtn' onClick={updateFunc}>
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

export default EditPassword
