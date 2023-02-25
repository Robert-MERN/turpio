import React, { useEffect } from 'react'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'
import SportScheduleAvailability from "../../../../components/availability/SportScheduleAvailability";
import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken";
import useStateContext from '../../../../context/ContextProvider';
import { useRouter } from 'next/router';
import axios from 'axios'


const availability = ({ user }) => {

    const { setCookieUser, setAllSchedule } = useStateContext();
    useEffect(() => {
        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);
        // setting users availability
        setAllSchedule(user.availability);
    }, []);
    const router = useRouter();
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio | Creating Event</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Set your availability"
                disableSecondControl={true}
                backBtn={true}
            />
            <SportScheduleAvailability
                eventDetails={router.query.data}
                nextLink="sport-fields/payment"
            />
        </div>
    )
}

export default availability

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