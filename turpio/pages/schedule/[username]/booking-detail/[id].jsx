import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import AppNavbar from '../../../../components/AppNavbar'
import InviteeDetails from '../../../../components/calendar/InviteeDetails'
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
                <title>Enter Booking Details - Turpio</title>
                <meta name="description" content="Enter booking details of your Event" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                nonAuth={true}
                disableSecondControl={true}
            />
            <InviteeDetails
                username={username}
                eventID={id}
            />
        </div>
    )
}

export default schedule
