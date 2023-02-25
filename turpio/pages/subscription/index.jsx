import React, { useEffect } from 'react'
import AppNavbar from '../../components/AppNavbar'
import Head from 'next/head';
import Packages from "../../components/payment/Packages";
import useStateContext from '../../context/ContextProvider';
import { getCookie } from 'cookies-next';
import jwt from "jsonwebtoken"

const subscription = ({ user }) => {
    const { setCookieUser, setAllSchedule } = useStateContext();
    useEffect(() => {
        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);
        // setting users availability
        setAllSchedule(user.availability);
    }, []);
    return (
        <div>
            <Head>
                <title>Subscription - Turpio</title>
                <meta name="description" content="Free Online Appointment Scheduling Software - Turpio" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Subscription"
                disableSecondControl={true}
                backBtn={true}
                backBtnNavigate="/home"
            />
            <Packages />
        </div>
    )
}

export default subscription

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