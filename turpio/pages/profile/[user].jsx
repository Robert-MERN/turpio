import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import unknown from "../../public/images/unknown.jpg"
import AppNavbar from '../../components/AppNavbar'
import TimeZoneSelect from '../../utils/TimeZoneSelect';
import useStateContext from '../../context/ContextProvider';




const user = () => {
  const { anchorEl, openTimeZonePopover, closeTimeZonePopover, language, setLanguage, openModal } = useStateContext();
  return (
    <div>
      <Head>
        <title>Profile - Account Settings - Turpio</title>
        <meta name="description" content="Free Online Appointment Scheduling Software | Turpio" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <AppNavbar
        pageTitle="Account Settings"
        disableSecondControl={true}
        backBtn={true}
        backBtnNavigate="/home"
      />
      <div className='w-screen flex justify-center' >
        <div className='w-[450px] pt-[40px] pb-[80px] flex flex-col items-center gap-8' >

          <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />

          <div className='w-full' >
            <label
              htmlFor=""
              className={`text-stone-800 font-bold text-[14px]`}
            >
              Name
            </label>
            <TextField
              className='w-full mt-2'
              id="name"
              placeholder="Name"
            />
          </div>

          <div className='w-full' >
            <label
              htmlFor=""
              className={`text-stone-800 font-bold text-[14px]`}
            >
              Welcome Message
            </label>

            <TextField
              id="outlined-multiline-static"
              className='w-full mt-2'
              multiline
              rows={4}
              placeholder="Welcome to my scheduling page. Please follow the instructions to add an event to my calendar."
            />
          </div>

          <div className='w-full' >
            <label
              htmlFor=""
              className={`text-stone-800 font-bold text-[14px]`}
            >
              Language
            </label>
            <FormControl
              className='w-full mt-2'
            >
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value={"spanish"}>Spanish</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='w-full' >
            <label
              htmlFor=""
              className={`text-stone-800 font-bold text-[14px]`}
            >
              Country
            </label>
            <FormControl
              className='w-full mt-2'
            >
              <Select
                value="pakistan"

              >
                <MenuItem value="pakistan">pakistan</MenuItem>
                <MenuItem value={""}>Spanish</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='w-full' >
            <div className='w-full flex justify-between' >

              <label
                htmlFor=""
                className={`text-stone-800 font-bold text-[14px]`}
              >
                Time Zone
              </label>
              <label
                className={`text-stone-500`}
              >
                Current Time: 6:47am
              </label>
            </div>
            <div
              onClick={(e) => openTimeZonePopover(e, "popover2")}
              aria-describedby={"timezone-popover2"}
              className='px-[16px] py-[12px] mt-2 border-stone-300 border-2 hover:border-blue-700 rounded-md text-stone-700 select-none cursor-pointer transition-all'
            >
              Pakistan, Maldives
            </div>
            <TimeZoneSelect
              ID="timezone-popover2"
              anchorEl={anchorEl}
              popoverName={"popover2"}
              close={closeTimeZonePopover}
            />
          </div>

          <div className='flex justify-between w-full' >
            <div className='flex gap-4' >
              <button className='border border-violet-700 bg-violet-700 rounded-full px-[18px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all' >
                Save changes
              </button>
              <button className='border border-stone-400 rounded-full px-[18px] py-[8px] text-[15px] hover:bg-stone-200 transition-all' >
                Cancel
              </button>
            </div>
            <button onClick={() => openModal("logout")} className='border border-red-500 bg-red-500 rounded-full px-[18px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all' >
              Logout
            </button>
          </div>

          {/* <input dir="ltr" type="text" inputmode="numeric" placeholder="MM / YY" autocomplete="billing cc-exp" />
          <input dir="ltr" type="text" inputmode="numeric" placeholder="1234 1234 1234 1234" autocomplete="billing cc-number" /> */}
        </div>
      </div>
    </div>
  )
}

export default user

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