import React from 'react'
import styles from '../styles/landingPage.module.css'
import getStartedImage from '../../public/getStartedImage.png'
import rightArrow from '../../public/rightArrow.png'
import subMoreInfoImg1 from '../../public/subMoreInfoImg1.png'
import subMoreInfoImg2 from '../../public/subMoreInfoImg2.png'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.getStarted}>
        <div className={styles.getStartedImage}>
          <Image src={getStartedImage} alt="" />
        </div>
        <div className={styles.getStartedinfo1}>
          Transparent & Secured
        </div>
        <div className={styles.getStartedinfo2}>
          Only you can see your personal data. All your password within a reach so you don&#39;t have to crack your head to remember them.
        </div>
        <Link href='/register'  className={styles.getStartedBtn}>
          <div className={styles.getStartedIcon}> Get Started </div>
          <Image className={styles.rightArrow} src={rightArrow} alt="" />
        </Link>
      </div>
      <div className={styles.subMoreInfoContainer}>
          <div className={styles.subMoreInfo1}>
              <Image className={styles.subMoreInfo1image} src={subMoreInfoImg1} alt="" />
            <div className={styles.subMoreInfo1heading}>All password within a reach</div>
              <div className={styles.subMoreInfo1text}>All your password within a reach so you don&#39;t have to crack your head to remember them.</div>
          </div>
          <div className={styles.subMoreInfo2}>
            <Image className={styles.subMoreInfo1image} src={subMoreInfoImg2} alt="" />
            <div className={styles.subMoreInfo1heading}>Easy & Convenient</div>
            <div className={styles.subMoreInfo1text}>Save all your password at one place within minutes.</div>
          </div>
      </div> 
    </div>
  )
}

export default LandingPage
