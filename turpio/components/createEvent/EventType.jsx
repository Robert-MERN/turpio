import React, { useState } from 'react'
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import CastleIcon from '@mui/icons-material/Castle';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Link from "next/link";

const EventType = () => {
    const defaultOptions = {
        hoverOpt1: false,
        hoverOpt2: false,
        hoverOpt3: false,
        hoverOpt4: false,
    }
    const [options, setOptions] = useState(defaultOptions);
    const onHover = (name) => {
        setOptions({ ...defaultOptions, [name]: true })
    }
    const onLeave = (name) => {
        setOptions({ ...defaultOptions, [name]: false })
    }
    return (
        <div className='w-screen flex justify-center pb-[80px] mt-[80px]' >
            <div className='w-[600px] shadow-default bg-white rounded-md flex flex-col justify-between' >
                <Link href="/event/new/one-on-one">
                    <div onMouseLeave={() => onLeave("hoverOpt1")} onMouseOver={() => onHover("hoverOpt1")} className='w-full px-10 rounded-t-md h-32 border hover:border-violet-600 transition-all cursor-pointer flex items-center gap-10' >
                        <div>
                            <GroupsIcon className={`scale-[1.4] ${options.hoverOpt1 ? "text-violet-600" : "text-stone-700"}`} />
                        </div>
                        <div className='flex w-full justify-between items-center' >
                            <div>
                                <p className='text-[19px] text-black' >One on One</p>
                                <p className='text-[16px] font-bold text-stone-700' >A host <span className='font-[400] text-black' >with</span>  A Guest</p>
                                <p className='text-stone-500 text-[15px]'>Good for: Interviews, meetings etc...</p>
                            </div>
                            <div>
                                <ArrowForward className={`scale-[.7] ${options.hoverOpt1 ? "text-violet-600" : "text-stone-500"}`} />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/event/new/hotel-reservation">
                    <div onMouseLeave={() => onLeave("hoverOpt2")} onMouseOver={() => onHover("hoverOpt2")} className='w-full px-10 h-32 border hover:border-violet-600 transition-all cursor-pointer flex items-center gap-10' >
                        <div>
                            <CastleIcon className={`scale-[1.4] ${options.hoverOpt2 ? "text-violet-600" : "text-stone-700"}`} />
                        </div>
                        <div className='flex w-full justify-between items-center' >
                            <div>
                                <p className='text-[19px] text-black' >Hotel Reservation</p>
                                <p className='text-[16px] font-bold text-stone-700' >Hotels <span className='font-[400] text-black' >with</span> various room options</p>
                                <p className='text-stone-500 text-[15px]'>Good for: Long bookings</p>
                            </div>
                            <div>
                                <ArrowForward className={`scale-[.7] ${options.hoverOpt2 ? "text-violet-600" : "text-stone-500"}`} />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/event/new/sport-fields">
                    <div onMouseLeave={() => onLeave("hoverOpt3")} onMouseOver={() => onHover("hoverOpt3")} className='w-full px-10 h-32 border hover:border-violet-600 transition-all cursor-pointer flex items-center gap-10' >
                        <div>
                            <SportsVolleyballIcon className={`scale-[1.4] ${options.hoverOpt3 ? "text-violet-600" : "text-stone-700"}`} />
                        </div>
                        <div className='flex w-full justify-between items-center' >
                            <div>
                                <p className='text-[19px] text-black' >Sports fields</p>
                                <p className='text-[16px] font-bold text-stone-700' >Businesses <span className='font-[400] text-black' >with</span> several court options</p>
                                <p className='text-stone-500 text-[15px]'>Good for: Reservation of sports fields</p>
                            </div>
                            <div>
                                <ArrowForward className={`scale-[.7] ${options.hoverOpt3 ? "text-violet-600" : "text-stone-500"}`} />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/event/new/team-booking">
                    <div onMouseLeave={() => onLeave("hoverOpt4")} onMouseOver={() => onHover("hoverOpt4")} className='w-full px-10 rounded-b-md h-32 border hover:border-violet-600 transition-all cursor-pointer flex items-center gap-10' >
                        <div>
                            <ContentCutIcon className={`scale-[1.4] ${options.hoverOpt4 ? "text-violet-600" : "text-stone-700"}`} />
                        </div>
                        <div className='flex w-full justify-between items-center' >
                            <div>
                                <p className='text-[19px] text-black' >Teams</p>
                                <p className='text-[16px] font-bold text-stone-700 leading-tight' >
                                    Groups <span className='font-[400] text-black' >with</span> many members with the option
                                    of having different availability and prices.
                                </p>
                                <p className='text-stone-500 text-[15px]'>Good for: Barbershops, beauty salons etc...</p>
                            </div>
                            <div>
                                <ArrowForward className={`scale-[.7] ${options.hoverOpt4 ? "text-violet-600" : "text-stone-500"}`} />
                            </div>
                        </div>
                    </div>
                </Link>


            </div>
        </div >
    )
}

export default EventType