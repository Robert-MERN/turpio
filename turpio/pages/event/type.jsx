import React from 'react'
import EventType from '../../components/createEvent/EventType'
import AppNavbar from '../../components/AppNavbar'
import Head from 'next/head'

const type = () => {
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Working Hours - Set Your Availability - Turpio</title>
                <meta name="description" content="Set your availability with Turpio" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Choose Your Event Type"
                disableSecondControl={true}
                backBtn={true}
            />
            <EventType />
        </div>
    )
}

export default type

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