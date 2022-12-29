import React from 'react'
import CreateEventTeam from '../../../../components/createEvent/CreateEventTeam'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'

const index = () => {
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
            <CreateEventTeam nextLink="team-booking/availability" />
        </div>
    )
}

export default index

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