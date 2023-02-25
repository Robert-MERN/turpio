import React, { useEffect } from 'react'
import Head from 'next/head'
import AppNavbar from '../components/AppNavbar'
import ControlPanel from "../components/adminComponents/ControlPanel";
import DataTable from "../components/adminComponents/DataTable";
import Charts from "../components/adminComponents/Charts";
import AddUsers from "../components/adminComponents/AddUsers";
import EditUser from "../components/adminComponents/EditUser";
import useStateContext from '../context/ContextProvider';
import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken";
import DeleteUser from '../components/adminComponents/DeleteUser';

const admin = ({ user, CJS_KEY }) => {
  const { adminControlPanel, panelName, setCookieUser, setAllSchedule } = useStateContext()
  useEffect(() => {
    // setting logged-in user from cookie in contextAPI 
    setCookieUser(user);
    // setting users availability
    setAllSchedule(user.availability);
  }, []);
  return (
    <div className='w-screen h-screen' >
      <Head>
        <title>Admin Management - Turpio</title>
        <meta name="description" content="Admin Management" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <AppNavbar
        pageTitle="Admin Dashborad"
        disableSecondControl={true}
        backBtn={true}
      />
      <h1 className='text-[26px] font-bold text-center text-stone-600 pt-8 ' >{panelName}</h1>
      <div className='w-screen flex justify-center py-6' >
        <div className='w-[1200px]  flex gap-10' >
          <ControlPanel />
          {adminControlPanel.Table ?

            <DataTable />
            :
            adminControlPanel.Charts ?
              <Charts />
              :
              adminControlPanel["Add User"] ?
                <AddUsers CJS_KEY={CJS_KEY} />
                : adminControlPanel["Delete User"] ?
                  <DeleteUser />
                  :
                  <EditUser />
          }
        </div>
      </div>
    </div>
  )
}

export default admin


export const getServerSideProps = async function ({ req, res }) {
  const userToken = getCookie("userAccountToken", { req, res });
  if (!userToken) {
    return {
      redirect: {
        destination: '/login?redirect_url=' + req.url,
        permanent: true,
      },
    }
  } else {
    const user = jwt.verify(userToken, process.env.JWT_KEY)
    if (user.isAdmin) {
      return {
        props: { user, CJS_KEY: process.env.CJS_KEY },
      }
    } else {
      return {
        redirect: {
          destination: '/login?redirect_url=' + req.url,
          permanent: true,
        },
      }
    }
  }
}