import React, { useEffect } from 'react'
import EventType from '../../components/createEvent/EventType'
import AppNavbar from '../../components/AppNavbar'
import Head from 'next/head'
import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken";
import useStateContext from '../../context/ContextProvider'

const type = ({ user }) => {
    const { setCookieUser, setAllSchedule } = useStateContext();
    useEffect(() => {
        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);
        // setting users availability
        setAllSchedule(user.availability);
    }, []);
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Select Your Event Type - Turpio</title>
                <meta name="description" content="Set your availability with Turpio" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Choose Your Event Type"
                disableSecondControl={true}
                backBtn={true}
            />
            <EventType />
        </div>
    )
}

export default type

export const getServerSideProps = async function ({ req, res }) {
    const userToken = getCookie("userAccountToken", { req, res });
    if (!userToken) {
        return {
            redirect: {
                destination: '/login?redirect_url=' + req.url,
                permanent: true,
            },
        }
    } else {
        const user = jwt.verify(userToken, process.env.JWT_KEY)
        return {
            props: { user },
        }
    }
}