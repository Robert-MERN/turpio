import React from 'react'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'
import TeamScheduleAvailability from "../../../../components/availability/TeamScheduleAvailability";


const availability = () => {
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio | Creating Event</title>
                <meta name="description" content="Turpio | Creating Event" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Set your availability"
                disableSecondControl={true}
                backBtn={true}
            />
            <TeamScheduleAvailability nextLink="team-booking/payment" />
        </div>
    )
}

export default availability

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