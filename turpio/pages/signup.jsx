import React from 'react'
import Head from 'next/head'
import SignupPart1 from '../components/signup/SignupPart1'
import SignupPart2 from '../components/signup/SignupPart2'
import { getCookie } from "cookies-next"
import useStateContext from '../context/ContextProvider'





const Signup = ({ CJS_KEY }) => {
    const { signupUser } = useStateContext();
    const signupUserInfo = getCookie("signupUser") ? JSON.parse(getCookie("signupUser")) : signupUser

    return (
        <div className='w-screen min-h-screen bg-wave-4 bg-bottom lg:bg-right bg-contain bg-no-repeat' >
            <Head>
                <title>Signup - Turpio</title>
                <meta name="description" content="Sign up with Turpio for free" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            {signupUserInfo ?
                <SignupPart2 CJS_KEY={CJS_KEY}  />
                :
                <SignupPart1 CJS_KEY={CJS_KEY} />
            }
        </div>
    )
}

export default Signup



export const getServerSideProps = async function ({ req, res }) {
    const userToken = getCookie("userAccountToken", { req, res });
    if (userToken) {
        return {
            redirect: {
                destination: '/home',
                permanent: true,
            },
        }
    }
    return { props: { message: "not signed up", CJS_KEY: process.env.CJS_KEY } }

}