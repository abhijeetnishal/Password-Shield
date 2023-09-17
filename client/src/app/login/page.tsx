"use client";
import { useState} from 'react'
import { Cookies } from "react-cookie"
import styles from '../../styles/register.module.css'
import LoadingSpinner from '../loading'
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies();

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e: any)=>{
    setIsLoading(true);
    setBtnClick(true);
    e.preventDefault();
    const response = await fetch('https://password-shield-server.vercel.app/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    })

    if(response.ok) {
      await response.json().then(userInfo => {
        
        cookies.set('myCookie', userInfo, { path: '/' }); 
        const cookieValue = cookies.get('myCookie');

        window.localStorage.setItem("userID", userInfo.id);

        setMessage(userInfo.username);

        setRedirect(true);

        setUserId(cookieValue.id)
        setBtnClick(true);
      });
    }
    else{
      const data = await response.json();
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
    return <Link href={`/view/${userId}`} ></Link>
  }
  
  return (
    <div className={styles.register}>
        <div className={styles.container}>
        <div>
        <header>Login</header>
        <form>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
          <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        </form>
        <div>
        {
          (validateEmail(email) && password) ? (
            <input type='button' className={styles.button} onClick={handleSubmit} disabled={isLoading} value='Login' />
          ) : 
          (<div> {
              !email || !password ? (
                <input type='button' className={styles.button} onClick={emptyFieldFunc} disabled={isLoading} value='Login' />
                ) : ( 
                  <div>
                    {
                      !validateEmail(email) ? 
                      (<input type='button' className={styles.button} onClick={invalidEmail} disabled={isLoading} value='Login' />):(
                        <div> </div>  
                      )
                    }
                  </div>
                )
            }
          </div>)
          }
          <div className={styles.messageDiv}>
            {
              btnClick?
              (<div className={styles.message}>
                {
                  isLoading ? (<LoadingSpinner/>) : (message)
                }
              </div>):
              (<div>
              </div>)
            }
          </div>
        </div>
        <div className={styles.signup}>
            <span className={styles.signup}>Don&#39;t have an account?
          <Link href='/register' >Register</Link>
          </span>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Login
