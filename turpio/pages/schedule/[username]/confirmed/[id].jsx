import React from 'react'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'
import Confirmed from "../../../../components/calendar/Confirmed";
import { useRouter } from 'next/router';


const schedule = () => {
    const router = useRouter()
    const data = router.query?.data ? JSON.parse(router.query.data) : ""
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Confirmed - Turpio</title>
                <meta name="description" content="Your event is confirmed" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                nonAuth={true}
                disableSecondControl={true}
            />
            <Confirmed data={data} />
        </div>
    )
}

export default schedule
