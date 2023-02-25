import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react'
import useStateContext from '../../context/ContextProvider';
import { getTime, getTitle } from '../../utils/eventSortFunctions';
import EventCard from './EventCard'

const EventCardContainer = ({ user }) => {
    const [events, setevents] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { fetchUserAllEvents } = useStateContext();
    useEffect(() => {
        fetchUserAllEvents(user.id, setevents, setIsLoading);
    }, []);
    return (
        <div className='w-screen flex flex-col items-center px-12' >
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
                        <div className='mt-12 w-[1200px] grid sm:grid-cols-2 lg:grid-cols-3 gap-14' >
                            {events.map(i => (
                                <EventCard
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
                        <div className='w-[1200px] lg:mt-12 ' >
                            <p className='text-[21px] font-bold text-stone-800 text-left' >
                                You don't have any event types yet.
                            </p>
                            <p className='text-stone-800 text-left' >
                                You'll want to add an event type to allow people to schedule with you.
                            </p>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default EventCardContainer