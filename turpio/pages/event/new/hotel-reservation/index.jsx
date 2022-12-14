import React from 'react'
import CreateEventHotel from '../../../../components/createEvent/CreateEventHotel'
import AppNavbar from '../../../../components/AppNavbar'
import Head from 'next/head'

const index = () => {
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio | Creating Event For Hotel Booking</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Hotel Reservation"
                disableSecondControl={true}
                backBtn={true}
            />
            <CreateEventHotel nextLink="hotel-reservation/availability"  />
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