import { useState} from 'react'
import { Link, Navigate ,useLocation, useNavigate} from 'react-router-dom'
import { Cookies } from "react-cookie"
import '../../styles/Register.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const SetPassword = () => {
 
  const location =useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate=useNavigate();
  // Access individual query parameters
  const email = searchParams.get('email');
  console.log(location)
  //eslint-disable-next-line
  const cookies = new Cookies();
   
 
  const [message, setMessage] = useState('');
  const [password,setPassword]=useState('')
  const [confirmpassword,setConfirmPassword]=useState('')
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e)=>{
    
    setIsLoading(true);
    
    e.preventDefault();
    if(!password){
                
setMessage(" enter password")
return;
    }
    if(!confirmpassword){
                
        setMessage(" enter confirm password")
        return;
            }

    if(password!==confirmpassword){
        setMessage("Both the passwords are not matching")
        return;
    }
     setMessage("")
    const response = await fetch(`${process.env.REACT_APP_HOST_URL}/auth/resetpassword`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       
        email:email,
        password:password
     
      }),
      credentials: 'include'
    })
    const data=await response.json();
    if(data.status===true && data.error===false){
        setMessage("password updated successfully ... redirecting you to login page in 3..2..1")
       
        setTimeout(()=>{
            navigate("/login");
        },5000);

        
    }
        else if(data.status===false && data.error===true)setMessage("some  error  has occured")
    else if (data.status===false && data.error===false)setMessage("email  doesn't exists")

}

 

  
  
  return (
    <div className='register'>
    <div className='container'>
    <div className="login form">
   
        <header>Reset password</header>
        <form>
          <input type="password"    value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          <input type="password"     value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Pasword" />

          <span style={{textAlign:"center",color:"red"}}>{message}</span>
          <input type='button' className='button' onClick={handleSubmit} value='Reset Password' />
           
        </form>
      
      
        </div>
        </div>
      </div>
  )
}

export default SetPassword