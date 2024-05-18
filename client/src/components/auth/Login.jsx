import { useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Cookies } from "react-cookie"
import '../../styles/Register.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //eslint-disable-next-line
  const cookies = new Cookies();

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e)=>{
    setIsLoading(true);
    setBtnClick(true);
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_HOST_URL}/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include'
    })

    if(response.ok) {
      await response.json().then(userInfo => {
      
        cookies.set('myCookie', userInfo, { path: '/' }); 
        const cookieValue = cookies.get('myCookie');

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

  const validateEmail = (email)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const invalidEmail = ()=>{
    setBtnClick(true);
    setMessage('Invalid email');
  }

  if(redirect){
    return <Navigate to={`/view`} />
  }
  
  return (
    <div className='register'>
        <div className='container'>
        <div className="login form">
        <header>Login</header>
        <form>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
          <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        </form>
        <div>
        <div className='forgetpassword'>
        <Link className='forgetpasswordtext' to='/sendemail'>Forget Password?</Link>
        </div>
        {
          (validateEmail(email) && password) ? (
            <input type='button' className='button' onClick={handleSubmit} disabled={isLoading} value='Login' />
          ) : 
          (<div> {
              !email || !password ? (
                <input type='button' className='button' onClick={emptyFieldFunc} disabled={isLoading} value='Login' />
                ) : ( 
                  <div>
                    {
                      !validateEmail(email) ? 
                      (<input type='button' className='button' onClick={invalidEmail} disabled={isLoading} value='Login' />):(
                        <div> </div>  
                      )
                    }
                  </div>
                )
            }
          </div>)
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
          <span className="signup">Don't have an account?
          <Link to='/register' >Register</Link>
          </span>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Login