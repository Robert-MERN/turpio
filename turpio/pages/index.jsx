import Head from 'next/head'
import Navbar from '../components/Navbar'
import Section1 from '../components/landingPage/Section1'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import Section2 from '../components/landingPage/Section2'
import Section3 from '../components/landingPage/Section3'
import Section4 from '../components/landingPage/Section4'
import { getCookie } from "cookies-next"






export default function Home() {
  return (
    <div className={`w-screen min-h-screen relative ${styles.container}`} >
      <Head>
        <title>Free Online Appointment Scheduling Software - Turpio</title>
        <meta name="description" content="Free Online Appointment Scheduling Software - Turpio" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      {/* <Logo /> */}
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />


    </div>
  )
}
