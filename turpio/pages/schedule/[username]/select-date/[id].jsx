import React, { useEffect, useState } from 'react'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'
import SelectDate from '../../../../components/calendar/SelectDate'
import useStateContext from '../../../../context/ContextProvider'
import { useRouter } from 'next/router'


const schedule = () => {
    const { id, username } = useRouter().query;
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const { fetchUserOneEvent } = useStateContext();
    useEffect(() => {
        if (id) fetchUserOneEvent({ id, username }, setEvent, setIsLoading);
    }, [id]);
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Select A Date & Time - Turpio</title>
                <meta name="description" content="Pick any date for your event" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                nonAuth={true}
                disableSecondControl={true}
            />
            <SelectDate
                data={event}
                loading={isLoading}
            />
        </div>
    )
}

export default schedule
