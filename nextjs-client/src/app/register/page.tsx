'use client'
import { useState } from 'react';
import LoadingSpinner from '../layout/loadingSpinner';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirectUser, setRedirectUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async(e: any)=>{
    setIsLoading(true);
    setBtnClick(true);
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_HOST_URL}/auth/register`,{
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
      setRedirectUser(true);
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

  const validateEmail = (email: string)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const invalidEmail = ()=>{
    setBtnClick(true);
    setMessage('Invalid email');
  }

  if(redirectUser){
    redirect('/login')
  }

  return (
    <div data-testid="register" className=''>
      <div className='flex flex-col items-center justify-center'>
        <div className="bg-white p-5  rounded shadow m-2 flex flex-col w-4/5 lg:w-1/3 mt-16">
        <h1 className='text-3xl self-center'>Register</h1>
        <form className='flex flex-col'>
          <input className="border rounded m-2 h-12 p-2 shadow-sm" type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
          <input className="border rounded m-2 h-12 p-2 shadow-sm" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
          <input className="border rounded m-2 h-12 p-2 shadow-sm" type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        </form>
        <div className='flex flex-col items-center w-full '>
        {
          (username && validateEmail(email) && password) ? (
            <input type='button' className="py-4 rounded hover:cursor-pointer hover:bg-teal-700 bg-teal-600 text-white w-4/5 m-2 " onClick={(e) => handleSubmit(e)} disabled={isLoading} value='Register' />
          ) : (<div className='w-full flex items-center justify-center'> {
              !username || !email || !password ? (
                <input type='button' className="py-4 rounded hover:cursor-pointer hover:bg-teal-700 bg-teal-600 text-white w-4/5 m-2 " onClick={emptyFieldFunc} disabled={isLoading} value='Register' />
                ) : ( 
                  <div className='flex flex-col items-center w-full '>
                    {
                      !validateEmail(email) ? 
                      (<input type='button' className='py-4 rounded hover:cursor-pointer hover:bg-teal-700 bg-teal-600 text-white w-4/5 m-2 ' onClick={invalidEmail} disabled={isLoading} value='Register' />):
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
          <div className=''>
            {
              btnClick?
              (<div className=''>
                {
                  isLoading ? (<LoadingSpinner/>) : (message)
                }
              </div>):
              (<div>
              </div>)
            }
          </div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <p className="">Already have an account? <span> <Link className='text-teal-600 hover:underline' href='/login'>Login</Link></span>
         
          </p>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Register