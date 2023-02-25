import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getTitle } from '../../utils/eventSortFunctions';

const Confirmed = ({ data }) => {
    console.log(data)
    return (
        <div className='w-screen flex justify-center pb-14' >
            <div className={`w-[900px] h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >
                {/* confirmed */}
                {data ?

                    <div className={`flex-1 overflow-auto`} >
                        <div className='w-full p-4 flex flex-col items-center gap-3 border-b border-stone-300' >
                            <p className='text-[19px] font-bold text-stone-700 text-center' >Confirmed</p>
                            <p className='text-[16px] text-stone-600 text-center leading-tight' >
                                You are scheduled with {data.eventDB.userFullName}.
                            </p>
                        </div>
                        <div className='py-6 grid place-items-center' >
                            <div className='w-fit border-b border-stone-300 p-4' >

                                <div className='flex items-center text-stone-700 gap-3 my-6' >
                                    <div className={`w-[22px] h-[22px] rounded-full bg-violet-600`} ></div>
                                    <p className='text-[17px] font-bold' >
                                        {getTitle(data.eventDB)}
                                    </p>
                                </div>

                                <div className='flex items-center text-stone-500 gap-3 my-4' >
                                    <CalendarTodayIcon />
                                    <p className='text-[17px] font-bold' >
                                        {data.eventDB.eventType === "hotel-reservation" ?
                                            `${data.guestInfo.date[0].startWeekday}, ${data.guestInfo.date[0].startMonth} ${data.guestInfo.date[0].startDay}, ${data.guestInfo.date[0].startYear}  - ${data.guestInfo.date[1].endWeekday}, ${data.guestInfo.date[1].endMonth} ${data.guestInfo.date[1].endDay}, ${data.guestInfo.date[1].endYear}`
                                            :
                                            `${data.guestInfo.startTime} - ${data.guestInfo.endTime}, ${data.guestInfo.day}, ${data.guestInfo.month} ${data.guestInfo.dayNumeric}, ${data.guestInfo.year}`}
                                    </p>
                                </div>

                                <div className='flex items-center text-stone-500 gap-3 my-4' >
                                    <PublicIcon />
                                    <p className='text-[17px] font-bold ' >
                                        {data.guestInfo.timeZone}
                                    </p>
                                </div>
                                {data.eventDB.eventLocation.location === "Zoom" || data.eventDB.eventLocation.location === "Google Meet" ?
                                    <div className='flex items-center text-stone-500 gap-3 my-4' >
                                        <VideoCallIcon className='scale-[1.2]' />
                                        <p className='text-[16px] font-bold text-stone-600 px-1' >
                                            Web conferencing details to follow.
                                        </p>
                                    </div>
                                    : data.eventDB.eventLocation.location === "Custom" ?
                                        <p className='text-[16px] font-bold text-stone-600 px-1' >
                                            {data.eventDB.eventLocation.customLocation}
                                        </p>
                                        :
                                        <p className='text-[16px] font-bold text-stone-600 px-1' >
                                            {data.eventDB.eventLocation.location}
                                        </p>
                                }
                                <p className='text-[16px] font-bold text-stone-800 text-center px-4 mt-2' >
                                    A calendar invitation has been sent to your email address.
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <p className='text-[21px] font-bold text-stone-800 text-left p-4' >
                        You don't have any event confirmed yet.
                    </p>
                }
            </div>
        </div>
    )
}

export default Confirmed