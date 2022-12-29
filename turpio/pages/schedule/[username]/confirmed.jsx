import React from 'react'
import AppNavbar from '../../../components/AppNavbar'
import Head from 'next/head'
import Confirmed from "../../../components/calendar/Confirmed";


const schedule = () => {
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Confirmed - Turpio</title>
                <meta name="description" content="Your event is confirmed" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar />
            <Confirmed />
        </div>
    )
}

export default schedule

// export const getServerSideProps = async function ({req, res}) {
//   if (!req.user) {
//       return {
//           redirect: {
//               destination: '/',
//               permanent: true,
//           },
//       }
//   }

//   return {
//       props: req.user ,
//   }
// }