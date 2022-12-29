import React from 'react'
import Head from 'next/head'
import AppNavbar from '../../../components/AppNavbar'
import InviteeDetails from '../../../components/calendar/InviteeDetails'


const schedule = () => {
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Enter Booking Details - Turpio</title>
                <meta name="description" content="Enter booking details of your Event" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar />
            <InviteeDetails />
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