import React from 'react'
import Logo from '../utils/Logo'
import { useState, useEffect } from 'react'
import Link from "next/link"



const Navbar = () => {
  const [showNavBG, setShowNavBG] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY < 100) {
      setShowNavBG(true);
    } else {
      setShowNavBG(false);

    }
  }
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  }, []);
  return (
    <div
      className={`w-screen h-[80px] px-[12px] fixed  flex items-center justify-center z-[15] transition-all duration-300 ${!showNavBG ? "bg-white drop-shadow-md" : "bg-transparent"}`}
    >
      <div className='flex items-center justify-between lg:w-[1200px] w-full' >
        <Logo />
        <div className='hidden gap-12 lg:flex' >

          <Link href="/home" >
            <button className=' text-stone-900 text-[15px] hover:text-violet-800 font-bold cursor-pointer transition-all duration-300' >My Page</button>
          </Link>

          {/* <Link href="/about" >
            <button className=' text-stone-900 text-[15px] hover:text-violet-800 font-bold cursor-pointer transition-all duration-300' >About</button>
          </Link> */}
            <Link href="/event/type" >
            <button className=' text-stone-900 text-[15px] hover:text-violet-800 font-bold cursor-pointer transition-all duration-300' >Create</button>
          </Link>

          <Link href="/contact-us" >
            <button className=' text-stone-900 text-[15px] hover:text-violet-800 font-bold cursor-pointer transition-all duration-300' >Contact Us</button>
          </Link>
          <Link href="/terms-conditions" >
            <button className=' text-stone-900 text-[15px] hover:text-violet-800 font-bold cursor-pointer transition-all duration-300' >{"Terms & conditions"}</button>
          </Link>


        </div>
        <div className='flex gap-6 items-center' >
          <Link href="/login" >
            <button className=' text-stone-900 text-[15px] hover:text-violet-800 font-bold cursor-pointer transition-all duration-300' >Login</button>
          </Link>
          <Link href="/signup" >
            <button className='w-[7rem] py-[10px] text-white rounded-full  font-medium bg-gradient-to-r from-violet-700 to-sky-500 hover:opacity-[0.8] transition-all duration-300' >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar