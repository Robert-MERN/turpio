import React from 'react'
import styles from '../styles/Home.module.css'
import logoImg from "../public/images/logo.png"
import Image from "next/image"
import Link from 'next/link'


const Logo = ({ title }) => {
    return (
        <Link href="/" >
            <div className={`flex gap-4 select-none cursor-pointer items-center ${styles.logo1}`} >

                <div className={`w-[60px] h-[60px] flex justify-center items-center`} >
                    <Image
                        alt="logo"
                        src={logoImg}
                        className="object-contain w-full h-full"
                    />
                </div>

                {title !== "off" &&
                    <p className='text-violet-700 text-[32px] font-black' >Turpio</p>
                }
            </div>
        </Link>
    )
}

export default Logo