import React from 'react'
import AppNavbar from '../../components/AppNavbar'
import Head from 'next/head'
import EventCardContainer from '../../components/eventBox/EventCardContainer'
import LanguageSelect from '../../utils/LanguageSelect'




const index = () => {

    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Turpio | Home</title>
                <meta name="description" content="Leave your event mangement on Turpio and get yourself better experience" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar />
            <LanguageSelect />
            <EventCardContainer />
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