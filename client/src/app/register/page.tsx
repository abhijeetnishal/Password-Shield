"use client";
import { useState } from 'react';
import '../../styles/register.module.css'
import LoadingSpinner from '../../app/loading'
import Link from 'next/link';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async(e: any)=>{
    setIsLoading(true);
    setBtnClick(true);
    e.preventDefault();
    const response = await fetch(process.env.server_url + 'auth/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    const data = await response.json();

    if(response.status === 404){
      setMessage('User Already Exist');
      setIsLoading(false);
    }
    
    else if(data) {
        console.log(data);
        setMessage(data.message);
        setRedirect(true);
        setIsLoading(false);
        setBtnClick(true);
    }
    else{
      setIsLoading(false);
      setBtnClick(true);
      setMessage(data.message);
    }
  }

  const emptyFieldFunc = ()=>{
      setBtnClick(true);
      setMessage('Please enter all details')
  }

  const validateEmail = (email: string)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const invalidEmail = ()=>{
    setBtnClick(true);
    setMessage('Invalid email');
  }

  if(redirect){
    return <Link href='/login'> </Link>
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
          <Link href='/login'>Login</Link>
          </span>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Register
