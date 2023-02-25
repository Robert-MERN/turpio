import React from 'react'
import styles from "../../styles/Home.module.css"
import EventCardForInvitee from "../eventBox/EventCardForInvitee";
import { CircularProgress } from '@mui/material';
import { getTime, getTitle } from '../../utils/eventSortFunctions';


const AllMeetings = ({ events, isLoading, fullName, welcomeMessage }) => {
    return (
        <div className='w-screen flex justify-center pb-14' >
            <div className={`w-[900px] h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >
                {isLoading ?
                    <div className='w-full h-[50vh] grid place-items-center' >
                        <div>
                            <CircularProgress size={50} />
                            <p className='text-[14px] text-stone-400 font-medium' >Loading...</p>
                        </div>

                    </div>
                    :
                    <>
                        {fullName ?
                            <div className={`flex-1 overflow-auto ${styles.scrollBar}`} >
                                <div className='w-full p-4 flex flex-col items-center gap-3 border-b border-stone-300' >
                                    <p className='text-[17px] font-bold text-stone-600 text-center' >{fullName}</p>
                                    <p className='text-[15px] text-gray-400 text-center w-[300px] leading-tight' >
                                        {welcomeMessage}
                                    </p>
                                </div>
                                {isLoading ?
                                    <div className='w-full h-[50vh] grid place-items-center' >
                                        <div>
                                            <CircularProgress size={50} />
                                            <p className='text-[14px] text-stone-400 font-medium' >Loading...</p>
                                        </div>

                                    </div>
                                    :
                                    <>
                                        {events.length ?
                                            <div className='px-8 py-4 grid grid-cols-2  overflow-auto place-items-center gap-4' >
                                                {events.map(i => (
                                                    <EventCardForInvitee
                                                        key={i._id}
                                                        title={getTitle(i)}
                                                        time={`${getTime(i)}, ${i.eventType}`}
                                                        link={i.eventLink}
                                                        userId={i.userId}
                                                        eventLinkName={i.eventLinkName}
                                                        bgColor={i.eventColorBG}
                                                        id={i._id}
                                                        borderColor={i.eventColorBorder}
                                                    />
                                                ))
                                                }

                                            </div>
                                            :
                                            <p className='lg:mt-24 text-[18px] font-medium text-stone-500 text-center' >
                                                User doesn't have events.
                                            </p>
                                        }
                                    </>
                                }
                            </div>
                            :
                            <div className='w-full h-full pt-10 flex justify-center' >
                                <p className='text-[19px] font-medium' >No Calendar exists with this username.</p>
                            </div>

                        }

                    </>

                }

            </div>
        </div>
    )
}

export default AllMeetings