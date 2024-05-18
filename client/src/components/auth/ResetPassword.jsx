import { useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Cookies } from "react-cookie"
import '../../styles/Register.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  
  //eslint-disable-next-line
  const cookies = new Cookies();

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e)=>{
    setIsLoading(true);
    
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid= regex.test(email);
    if(!valid){
        setMessage("Enter valid email address")
        return;
    }
    if(valid) setMessage("")
        console.log(process.env.REACT_APP_HOST_URL)
    const response = await fetch(`${process.env.REACT_APP_HOST_URL}/auth/sendemail`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email
     
      }),
      credentials: 'include'
    })
    const data=await response.json();
    if(data.status===true && data.error===false)setMessage("email send successfully")
        else if(data.status===false && data.error===true)setMessage("some  error  has occured")
    else if (data.status===false && data.error===false)setMessage("email  doesn't exists")

    }
  
  return (
    <div className='register'>
    <div className='container'>
    <div className="login form">
   
        <header>Reset password</header>
        <form>
          <input type="email" className='email'    value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
          <span style={{textAlign:"center",color:"red"}}>{message}</span>
          <input type='button' className='button' onClick={handleSubmit} value='Send Email' />

        </form>
      
      
        </div>
        </div>
      </div>
  )
}

export default ResetPassword