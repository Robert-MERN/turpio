import React, { useEffect } from 'react'
import AppNavbar from '../../components/AppNavbar'
import Head from 'next/head'
import EventCardContainer from '../../components/eventBox/EventCardContainer'
import LanguageSelect from '../../utils/LanguageSelect'
import jwt from "jsonwebtoken";
import { getCookie, deleteCookie } from "cookies-next"
import useStateContext from '../../context/ContextProvider'




const index = ({ user }) => {
    const { setSignupUser, setCookieUser, setAllSchedule } = useStateContext();
    useEffect(() => {
        // removing deatils retrieved in signupUser state after signing up
        setSignupUser(null);
        // deleting deatils retrieved in signupUser cookie after signing up
        deleteCookie("signupUser")

        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);

        // setting users availability
        setAllSchedule(user.availability);
    }, []);

    return (
        <div className='w-screen min-h-screen' >
            <Head>
                <title>Turpio | Home</title>
                <meta name="description" content="Leave your event mangement on Turpio and get yourself better experience" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar />
            <LanguageSelect />
            <EventCardContainer user={user} />
        </div>
    )
}

export default index

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
