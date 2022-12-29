import React from 'react'
import EventCard from './EventCard'

const EventCardContainer = () => {

    return (
        <div className='w-screen flex flex-col items-center px-12' >
            <div className='mt-12 w-[1200px] grid sm:grid-cols-2 lg:grid-cols-3 gap-14' >
                
                <EventCard
                    title="Business"
                    time="30 mins, Group"
                />
                <EventCard
                    title="Duo"
                    time="60 mins, Duo"
                />
                <EventCard
                    title="Barber"
                    time="15 mins, Group"
                />
                <EventCard
                    title="Teacher"
                    time="30 mins, One on one"
                />
            </div>
        </div>
    )
}

export default EventCardContainer