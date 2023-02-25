import React, { useEffect } from 'react'
import CreateEventTeam from '../../../../components/createEvent/CreateEventTeam'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'
import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken";
import useStateContext from '../../../../context/ContextProvider'
import { useRouter } from 'next/router';
import axios from 'axios'

const teamBooking = ({ user }) => {
    const { setCookieUser, setAllSchedule } = useStateContext();
    useEffect(() => {
        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);
        // setting users availability
        setAllSchedule(user.availability);
    }, []);
    const { eventType } = useRouter().query;
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio | Creating Event For Barber Booking</title>
                <meta name="description" content="Creating Event For Barber Booking" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Teams Booking"
                disableSecondControl={true}
                backBtn={true}
            />
            <CreateEventTeam
                user={user}
                eventType={eventType}
                nextLink="team-booking/availability"
            />
        </div>
    )
}

export default teamBooking

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
        let subStatus = ""
        try {
            const res = await axios.post(`${process.env.URL_APP}/api/userSubscriptionVerification`, { id: user.id });
            subStatus = res.data.message;
        } catch (err) {
            return {
                redirect: {
                    destination: '/event/type',
                    permanent: true,
                },
            }
        }
        if (user.isAdmin) {
            return {
                props: { user },
            }
        }
        if (subStatus === "trial" || subStatus === "monthly" || subStatus === "yearly") {
            return {
                props: { user },
            }
        } else {
            return {
                redirect: {
                    destination: '/event/type',
                    permanent: true,
                },
            }
        }
    }
}