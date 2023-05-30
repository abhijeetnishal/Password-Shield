"use client";
import React from "react";
import headerLock from '../../../public/lockHeader.png'
import profilePhoto from '../../../public/user-profile.png'
import styles from '../../styles/header.module.css'
import Link from "next/link";
import Image from "next/image";
import { Cookies } from "react-cookie";

const Header = () => {
  const cookies = new Cookies();
  const cookieValue = cookies.get('myCookie');
  const userName = cookieValue?.username;
  const logout = () => {
    const fetchData = async () => {
      // get the data from the api
      await fetch('https://passwordmanagerserver.vercel.app/api/auth/logout',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
    }
    fetchData();

    window.localStorage.clear();
  };

  return (
    <div className="navbar">
      {!userName ? (
        <div className={styles.noAuthNavbar}>
          <Image className={styles.headerLock} src={headerLock} alt="" />
        <Link className={styles.keySafeIcon} href="/">Key Safe</Link>
          <div className={styles.headerLoginBtn}>
            <Link className={styles.headerLoginIcon} href="/login">Login</Link>
          </div>
        </div>
      ) : (
        <div className={styles.noAuthNavbar}>
          <Image className={styles.headerLock} src={headerLock} alt="" />
          <Link className={styles.keySafeIcon} href="/">Key Safe</Link>
          <div className={styles.userInfoAndLogin}>
            <div className={styles.userInfo}>
              <Image className={styles.profilePhoto} src={profilePhoto} alt="" />
              <div className={styles.userName}> {userName} </div>
            </div>
            <div className={styles.headerLoginBtn}>
              <Link href='/' className={styles.headerLogoutIcon} onClick={logout}>Logout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;