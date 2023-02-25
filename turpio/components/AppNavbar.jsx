import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import Logo from "../utils/Logo";
import PersonIcon from '@mui/icons-material/Person';
import DropDown from '@mui/icons-material/ArrowDropDown';
import DropUp from '@mui/icons-material/ArrowDropUp';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackward from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
import UserAccountModal from '../utils/modals/UserAccount';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import useStateContext from '../context/ContextProvider';



const AppNavbar = ({ pageTitle, disableSecondControl, backBtn, backBtnNavigate, nonAuth }) => {
    const { cookieUser } = useStateContext()
    const pages = [
        {
            name: "Home",
            link: "/home",
            link2: "event",
            link3: "profile",
            link4: "admin"
        },
        {
            name: "Availability",
            link: "/home/availability",
        },
        {
            name: "Subscription",
            link: `/subscription`,
            link2: "/subscription/[id]"
        },
    ]
    const [accountBtnHover, setAccountBtnHover] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);


    const handleAccountPop = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const router = useRouter();
    const back = () => {
        if (backBtnNavigate) {
            router.push(backBtnNavigate);
        } else {
            router.back();
        }
    }

    return (
        <div className='w-screen flex justify-center pl-6 pr-2 drop-shadow-xl bg-white' >
            <div className='lg:w-[1200px] w-full' >

                {/* frist row control pannel */}
                <div className='w-full h-[80px] flex items-center justify-between' >
                    <Logo
                        linkToHome={true}
                        title="off"
                    />
                    {nonAuth ?
                        <div className='px-4' >

                            <IconButton>
                                <MenuIcon className='md:scale-[1.2]' />
                            </IconButton>
                        </div>

                        :
                        <div className='flex items-center gap-6' >
                            {pages.map((i, index) => (
                                <Link className='lg:block hidden' key={index} href={i.link} >
                                    <button
                                        className={`text-[15px] p-2 font-bold hover:text-gray-600 cursor-pointer transition-all duration-300
                                 ${router.pathname === i.link ||
                                                router.pathname.includes(i.link2) ||
                                                router.pathname.includes(i.link3) ||
                                                router.pathname.includes(i.link4) ?
                                                "text-stone-900"
                                                :
                                                "text-zinc-400"}
                                 `}>
                                        {i.name}
                                    </button>
                                </Link>
                            ))
                            }
                            <div>
                                <div
                                    onMouseOver={() => setAccountBtnHover(true)}
                                    onMouseLeave={() => setAccountBtnHover(false)}
                                    className='flex lg:gap-2 items-center cursor-pointer p-2'
                                    onClick={handleAccountPop}
                                    aria-describedby='userAccountPop'
                                >
                                    <div className={`border-[3px] rounded-full bg-zinc-400 ${accountBtnHover ? "border-gray-500" : "border-gray-400"} transition-all`} >
                                        <PersonIcon className='text-white m-1 lg:m-[0.4rem]' />
                                    </div>
                                    <p

                                        className={`text-[15px] font-bold select-none lg:block hidden ${accountBtnHover ? "text-gray-600" : "text-zinc-400"} transition-all`}
                                    >
                                        Account
                                    </p>
                                    {Boolean(anchorEl) ?
                                        <DropUp className={`${accountBtnHover ? "text-gray-600" : "text-zinc-400"} transition-all`} />
                                        :
                                        <DropDown className={`${accountBtnHover ? "text-gray-600" : "text-zinc-400"} transition-all`} />

                                    }

                                </div>
                                <UserAccountModal
                                    anchorEl={anchorEl}
                                    close={() => setAnchorEl(null)}
                                />
                            </div>

                        </div>
                    }


                </div>

                {/* second row control panel */}
                <div className={`w-full relative flex ${disableSecondControl ? "justify-center" : "justify-between"} items-center ${!nonAuth && "my-5"}`} >
                    {backBtn &&
                        <button onClick={back} className='px-[12px] hover:bg-violet-500 hover:text-white py-[6px] flex justify-center items-center text-violet-600 text-[18px] gap-1 border border-violet-600 rounded-full absolute left-0 transition-all' >
                            <ArrowBackward className='scale-[.8]' />
                            Back
                        </button>
                    }
                    {!nonAuth &&
                        <p className='text-stone-700 text-[24px] font-medium tracking-wider cursor-default' >{pageTitle || "My Turpio"}</p>
                    }
                    {!disableSecondControl &&
                        <Link href="/event/type">
                            <button className='w-[7rem] flex items-center justify-center gap-1 text-[14px] py-[10px] text-white rounded-full  font-medium bg-gradient-to-r from-violet-700 to-sky-500 hover:opacity-[0.8] transition-all duration-300' >
                                <AddIcon className='font-bold scale-75' />
                                Create
                            </button>
                        </Link>
                    }
                </div>
            </div>

        </div>
    )
}


export default AppNavbar


