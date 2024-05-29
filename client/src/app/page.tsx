// import Header from '@/src/components/Headers/Header'
"use client"; // Mark the file as a client component

import React from 'react'
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import Ribbon1 from "@/public/assets/Ribbon-1.png"
import illustration1 from "@/public/assets/Illustration-1.svg";
import illustration1Dark from "@/public/assets/Illustration-1-dark.svg";
import illustration2 from "@/public/assets/Illustration-2.svg";
import illustration3 from "@/public/assets/Illustration-3.svg";
import illustration2Dark from "@/public/assets/Illustration-2-dark.svg";
import icon1 from "@/public/assets/icon1.svg";
import icon2 from "@/public/assets/icon2.svg";
import icon3 from "@/public/assets/icon3.svg";
import icon4 from "@/public/assets/icon4.svg";
import icon5 from "@/public/assets/icon5.svg";
import { useThemeContext } from './layout';

import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Headers/Header';
import Navbar from '@/src/components/Headers/Navbar';
import Link from "next/link";



const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });



export default function LandingPages() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <>
      {/* <Header/> */}
      <Navbar landingPage={true} />
      <div data-testid="landing-page" className=' h mx-auto'>
        <section>
          <div className={`flex p-24 section1 pb-44 ${theme === 'light' ? 'bg-[#fffcd7]  text-black' : 'bg-[#12141d] text-white'}`}>

            <Image src={theme ==='light'? illustration1 : illustration1Dark} className='w-[35rem] px-5' alt="" />
            <div className='px-5'>
              <div className='pt-2 text-lg text-[#f43f5e] font-medium'>
                <p>Ensuring maximum security</p>
              </div>
              <div className='pt-8'>
                <h2 className={`text-7xl  ${spaceGrotesk.className} font-bold`}>Secure your digital life with the power of open source.</h2>
              </div>
              <div>
                <h2 className='mr-40 pt-7 pb-5 text-[#595a61] text-lg'>Key Safe liberates you from the burden of memorizing passwords, ensuring your credentials are securely stored and easily accessible whenever you need them.</h2>
                <Link data-testid="get-started-link" href='/auth/register'>
                  <button className='bg-[#ef4444] shadow-md hover:bg-[#e04747] text-white py-3 px-8'>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <Image src={Ribbon1} alt='decoration' className='absolute p-0 ml-[75rem] inline-block top-[25rem]' />
          </div>
        </section>



        <section id='about'>
          <div className=' '></div>
          <div className=' flex px-24 py-16 justify-between'>
            <div className='p-3 w-96 '>
              <Image src={icon1} alt='' />
              <h2 className='font-bold py-5'>Easy & Convenient</h2>
              <p className='text-[#595a61]'>Real-time problem solving is not just about time, it's about time. This allows you to solve problems within a specified time problem has a solution.</p>
            </div>

            <div className='p-3 w-96 '>
              <Image src={icon2} alt='' />
              <h2 className='font-bold py-5'>Unmatched Security</h2>
              <p className='text-[#595a61]'>Real-time problem solving is not just about time, it's about time. This allows you to solve problems within a specified time problem has a solution.</p>
            </div>

            <div className='p-3 w-96 '>
              <Image src={icon3} alt='' />
              <h2 className='font-bold py-5'>Open Source Transparency</h2>
              <p className='text-[#595a61]'>Real-time problem solving is not just about time, it's about time. This allows you to solve problems within a specified time problem has a solution.</p>
            </div>
          </div>
        </section>

        <section>
          <div className={`flex py-10  px-24 section3  ${theme === 'light' ? 'bg-[#fffcd7]  text-black' : 'bg-[#12141d] text-white'}`}>

            <div className='px-5 py-36 flex-col flex align-middle'>
              <div className='mr-56 '>
                <h2 className={`text-5xl  ${spaceGrotesk.className} font-bold`}>Key Safe takes care of your credentials.</h2>
              </div>
              <div>
                <h2 className='mr-72 pt-7 text-[#595a61] text-base'>With Key Safe, you can trust that your credentials are only accessible to you, providing peace of mind in an increasingly digital world.</h2>
              </div>
            </div>
            <Image src={theme ==='light'? illustration2 : illustration2Dark} className='w-[35rem] px-5' alt="" />
          </div>
        </section>

        <section>
          <div className='flex pb-10 pt-0  px-24  bg-[#fafafa]'>

            <Image src={illustration3} className='w-[35rem] px-5' alt="" />
            <div className='px-5 py-36 flex-col flex align-middle'>
              <div className='ml-56 '>
                <h2 className={`text-5xl  ${spaceGrotesk.className} font-bold`}>All password within a reach</h2>
              </div>
              <div>
                <h2 className='ml-56 mr-20 text-left pt-7 text-[#595a61] text-base'>Save all your password at one place within minutes. And you don't have to crack your head to remember them.</h2>
              </div>
            </div>
          </div>
        </section>

        <section id='contact'>
          <div className='text-center p-16 py-20 section4 bg-[#18181b]'>
            <h2 className={`text-5xl ${spaceGrotesk.className} font-bold text-white py-5`}>Join Our Community</h2>
            <p className='text-white text-center py-5 px-80'>Key Safe thrives on community support and contributions. Whether you're a developer, a security enthusiast, or simply someone who values secure password management, we welcome you to join us. Contribute to the project, report issues, or share your feedback.</p>
            <div className='flex mx-auto justify-center font-semibold  text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              <Link href='https://github.com/abhijeetnishal/Password-Shield'>
                <p className='px-3 hover:underline'>
                  Github</p>
              </Link>

                <svg className='ml-10' xmlns="http://www.w3.org/2000/svg" fill='white' width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" /></svg>
              <Link href='https://www.linkedin.com/in/abhijeetkumar7565/'>
                <p className='px-3 hover:underline'>Linkedin</p>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className='flex py-20  px-24  bg-[#fafafa]'>


            <div className='px-5 flex-col pt-10 flex align-middle'>
              <div className=''>
                <h2 className={`text-3xl  ${spaceGrotesk.className} font-bold`}>Ready to get started?</h2>
              </div>
              <div>
                <h2 className='text-left mr-40 pt-5 pb-3 text-[#595a61] text-base'>Save all your password at one place within minutes. And you don't have to crack your head to remember them.</h2>
                <Link href='/auth/login'>
                  <button className='bg-[#ef4444] shadow-md hover:bg-[#e04747] text-white py-3 px-8'>
                    Login
                  </button>
                </Link>
              </div>

            </div>

            <div className='flex py-10 w-[95rem] justify-center'>
              <div className='mx-10 px-5 w-72 border-2 rounded py-5 bg-white'>
                <Image src={icon5} alt='' />
                <h2 className='font-bold py-3'>Store data on cloud</h2>
                <p className='text-[#595a61]'>Create beautiful landing pages with Rareblocks that converts. </p>
              </div>
              <div className='mx-10 px-5 w-72 border-2 rounded py-5 bg-white'>
                <Image src={icon4} alt='' />
                <h2 className='font-bold py-3'>Connect dots smartly</h2>
                <p className='text-[#595a61]'>Real-time problem solving is not just about time, it's about time. </p>
              </div>
            </div>


          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
