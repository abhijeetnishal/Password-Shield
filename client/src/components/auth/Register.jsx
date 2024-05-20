import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../styles/Register.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async(e)=>{
    setIsLoading(true);
    setBtnClick(true);
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/auth/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: username,
        email: email,
        password: password
      }),
      credentials: 'include'
    })

    const data = await response.json();
   
    if(response.status === 201) {
      setMessage(data);
      setRedirect(true);
      setBtnClick(true);
    }
    else{
      setIsLoading(false);
      setBtnClick(true);
      setMessage(data);
    }
  }

  const emptyFieldFunc = ()=>{
      setBtnClick(true);
      setMessage('Please enter all details')
  }

  const validateEmail = (email)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const invalidEmail = ()=>{
    setBtnClick(true);
    setMessage('Invalid email');
  }

  if(redirect){
    return <Navigate to={'/login'} />
  }
  

  return (
    <div className='register'>
      <div className='container'>
        <div className="registration form">
        <header>Register</header>
        <form>
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
          <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        </form>
        <div>
        {
          (username && validateEmail(email) && password) ? (
            <input type='button' className="button" onClick={handleSubmit} disabled={isLoading} value='Register' />
          ) : (<div> {
              !username || !email || !password ? (
                <input type='button' className="button" onClick={emptyFieldFunc} disabled={isLoading} value='Register' />
                ) : ( 
                  <div>
                    {
                      !validateEmail(email) ? 
                      (<input type='button' className='button' onClick={invalidEmail} disabled={isLoading} value='Register' />):
                      (
                        <div> </div>  
                      )
                    }
                  </div>
                )
            }
            </div>
          )
          }
          <div className='messageDiv'>
            {
              btnClick?
              (<div className='message'>
                {
                  isLoading ? (<LoadingSpinner/>) : (message)
                }
              </div>):
              (<div>
              </div>)
            }
          </div>
        </div>
        <div className="signup">
          <span className="signup">Already have an account?
          <Link to='/login'>Login</Link>
          </span>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Register