import React from 'react'
import '../../styles/LandingPage.css'
import getStartedImage from '../../assets/getStartedImage.png'
import rightArrow from '../../assets/rightArrow.png'
import subMoreInfoImg1 from '../../assets/subMoreInfoImg1.png'
import subMoreInfoImg2 from '../../assets/subMoreInfoImg2.png'
import {Link} from 'react-router-dom'

const LandingPage = () => {

  const startServer = async ()=>{
    await fetch('http://localhost:4000/',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    });
  }
  startServer();

  return (
    <div className='landingPage'>
      <div className='getStarted'>
        <div className='getStartedImage'>
          <img src={getStartedImage} alt="" />
        </div>
        <div className='getStartedinfo-1'>
          Transparent & Secured
        </div>
        <div className='getStartedinfo-2'>
          Only you can see your personal data. All your password within a reach so you don't have to crack your head to remember them.
        </div>
        <Link to='/register'  className='getStartedBtn'>
          <div className='getStartedIcon'> Get Started </div>
          <img className='rightArrow' src={rightArrow} alt="" />
        </Link>
      </div>
      <div className='subMoreInfoContainer'>
          <div className='subMoreInfo-1'>
            <img className='subMoreInfo-1-image' src={subMoreInfoImg1} alt="" />
            <div className='subMoreInfo-1-heading'>All password within a reach</div>
            <div className='subMoreInfo-1-text'>All your password within a reach so you don't have to crack your head to remember them.</div>
          </div>
          <div className='subMoreInfo-2'>
            <img className='subMoreInfo-1-image' src={subMoreInfoImg2} alt="" />
            <div className='subMoreInfo-1-heading'>Easy & Convenient</div>
            <div className='subMoreInfo-1-text'>Save all your password at one place within minutes.</div>
          </div>
      </div> 
    </div>
  )
}

export default LandingPage