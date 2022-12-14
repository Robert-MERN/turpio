import React from 'react'
import Head from 'next/head'
import AppNavbar from '../../../../components/AppNavbar'
import PaymentMethods from '../../../../components/payment/PaymentMethods'
const payment = () => {
  return (
    <div className='w-screen h-screen' >
      <Head>
        <title>Turpio - Payment -  Creating Event For Barber Booking</title>
        <meta name="description" content="Payment -  Creating Event For Barber Booking" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <AppNavbar
        pageTitle="Set Payment Method"
        disableSecondControl={true}
        backBtn={true}
      />
      <PaymentMethods />
    </div>
  )
}

export default payment