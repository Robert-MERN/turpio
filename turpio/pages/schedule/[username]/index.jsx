import React from 'react'
import AppNavbar from '../../../components/AppNavbar'
import Head from 'next/head'
import AllMeetings from '../../../components/calendar/AllMeetings'
import { useRouter } from 'next/router'


const schedule = () => {

    const router = useRouter()
    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio - {router.query.username}</title>
                <meta name="description" content="Schedule with the Turpio" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar />
            <AllMeetings />
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