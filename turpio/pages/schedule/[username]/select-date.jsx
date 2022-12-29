import React from 'react'
import AppNavbar from '../../../components/AppNavbar'
import Head from 'next/head'
import SelectDate from '../../../components/calendar/SelectDate'


const schedule = () => {
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Select A Date & Time - Turpio</title>
                <meta name="description" content="Pick any date for your event" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar />
            <SelectDate />
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