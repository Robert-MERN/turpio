import React, { useEffect, useState } from 'react'
import AppNavbar from '../../../components/AppNavbar'
import Head from 'next/head'
import AllMeetings from '../../../components/calendar/AllMeetings'
import { useRouter } from 'next/router'
import useStateContext from '../../../context/ContextProvider'


const schedule = () => {
    const { fetchUserAllEvents, fetchFullNameUser } = useStateContext();
    const { username } = useRouter().query;
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        if (username) {
            fetchUserAllEvents(username, setEvents, setIsLoading);
            fetchFullNameUser(username, setUserInfo, setIsLoading)
        }
    }, [username])

    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio - {username}</title>
                <meta name="description" content="Schedule with the Turpio" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                nonAuth={true}
                disableSecondControl={true}
            />
            <AllMeetings
                isLoading={isLoading}
                events={events}
                fullName={userInfo?.fullName}
                welcomeMessage={userInfo?.welcomeMessage}
            />
        </div>
    )
}

export default schedule
