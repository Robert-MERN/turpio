import React from 'react'
import AppNavbar from '../../components/AppNavbar'
import Head from 'next/head'
import LanguageSelect from '../../utils/LanguageSelect'
import Integration from '../../components/payment/Integration'


const integeration = () => {
  return (
    <div className='w-screen h-screen' >
      <Head>
        <title>Integeration - Turpio</title>
        <meta name="description" content="Integrate your payment method" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <AppNavbar
        pageTitle="Integeration"
        disableSecondControl={true}
        backBtn={true}
        backBtnNavigate="/home"
      />
      <LanguageSelect />
      <Integration />

    </div>
  )
}

export default integeration