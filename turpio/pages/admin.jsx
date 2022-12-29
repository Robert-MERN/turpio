import React from 'react'
import Head from 'next/head'
import AppNavbar from '../components/AppNavbar'
import ControlPanel from "../components/adminComponents/ControlPanel";
import DataTable from "../components/adminComponents/DataTable";
import Charts from "../components/adminComponents/Charts";
import AddUsers from "../components/adminComponents/AddUsers";
import EditUser from "../components/adminComponents/EditUser";
import useStateContext from '../context/ContextProvider';

const admin = () => {
  const { adminControlPanel, panelName } = useStateContext()
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
              adminControlPanel["Add Users"] ?
                <AddUsers />
                :
                <EditUser />
          }
        </div>
      </div>
    </div>
  )
}

export default admin