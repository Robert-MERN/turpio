import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Confirmed = () => {
    return (
        <div className='w-screen flex justify-center pb-14' >
            <div className={`w-[900px] h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >

                {/* confirmed */}
                <div className={`flex-1 overflow-auto`} >
                    <div className='w-full p-4 flex flex-col items-center gap-3 border-b border-stone-300' >
                        <p className='text-[19px] font-bold text-stone-700 text-center' >Confirmed</p>
                        <p className='text-[16px] text-stone-600 text-center leading-tight' >
                            You are scheduled with Safeer aur Muneeb.
                        </p>
                    </div>
                    <div className='py-6 grid place-items-center' >
                        <div className='w-fit border-b border-stone-300 p-4' >

                            <div className='flex items-center text-stone-700 gap-3 my-6' >
                                <div className={`w-[22px] h-[22px] rounded-full bg-violet-600`} ></div>
                                <p className='text-[17px] font-bold' >
                                    Tesla meeting
                                </p>
                            </div>

                            <div className='flex items-center text-stone-500 gap-3 my-4' >
                                <CalendarTodayIcon />
                                <p className='text-[17px] font-bold' >
                                    9:00am - 9:30am, Wednesday, December 28, 2022
                                </p>
                            </div>

                            <div className='flex items-center text-stone-500 gap-3 my-4' >
                                <PublicIcon />
                                <p className='text-[17px] font-bold ' >
                                    Pakistan, Maldives Time
                                </p>
                            </div>

                            <div className='flex items-center text-stone-500 gap-3 my-4' >
                                <VideoCallIcon className='scale-[1.2]' />
                                <p className='text-[17px] font-bold ' >
                                    Web conferencing details to follow.
                                </p>
                            </div>

                            <p className='text-[16px] font-bold text-stone-800 text-center px-4 mt-2' >
                                A calendar invitation has been sent to your email address.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmed