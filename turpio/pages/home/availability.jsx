import React, { useState } from 'react'
import Head from 'next/head';
import AppNavbar from '../../components/AppNavbar'
import AvailableTimes from '../../components/availability/AvailableTimes';
import AddIcon from '@mui/icons-material/Add';
import TimeZoneSelect from '../../utils/TimeZoneSelect';
import useStateContext from '../../context/ContextProvider';
import LanguageSelect from '../../utils/LanguageSelect'


const availability = () => {

    const { anchorEl, openTimeZonePopover, closeTimeZonePopover } = useStateContext();

    const [availableTime, setAvailableTime] = useState({
        Sun: {
            checked: false,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        },
        Mon: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        },
        Tue: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        },
        Wed: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        },
        Thu: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        },
        Fri: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        },
        Sat: {
            checked: false,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
                minutes: "00"
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
                minutes: "00"
            },
        }
    });

    return (
        <div className='w-screen h-screen' >
            <Head>
                <title>Working Hours - Set Your Availability - Turpio</title>
                <meta name="description" content="Set Your Availability with Turpio" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <AppNavbar
                pageTitle="Set your availability"
                disableSecondControl={true}
                backBtn={true}
                backBtnNavigate="/home"
            />
            <LanguageSelect />
            <div className='w-screen flex justify-center pb-[80px] mt-[80px]' >
                <div className='w-[1000px] shadow-default rounded-md bg-white border-2 border-violet-600 flex flex-col justify-between' >

                    {/* body */}

                    <p
                        className={`text-stone-600 font-bold text-[14px] px-[55px] mt-10`}
                    >
                        Choose a schedule below to edit or create a new one that you can apply to your event types
                    </p>

                    <div className='flex w-full px-[55px] my-10'>
                        <div>
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                SCHEDULE
                            </label>
                            <div className='flex gap-4 my-2' >
                                <div className='px-[16px] py-[6px] border-stone-300 border-2 hover:border-blue-700 rounded-md text-stone-700 select-none cursor-pointer transition-all' >
                                    Working hours
                                </div>
                                <div className='px-[16px] py-[6px] border-stone-300 border-2 hover:border-blue-600 rounded-full text-stone-600 select-none cursor-pointer transition-all flex items-center gap-1' >
                                    <AddIcon />
                                    New schedule
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='px-[55px] w-fit' >
                        <label
                            className={`text-stone-500 font-medium text-[15px]`}
                        >
                            TIME ZONE
                        </label>
                        <p
                            onClick={(e) => openTimeZonePopover(e, "popover1")}
                            aria-describedby={"timezone-popover1"}
                            className={`text-blue-600 font-medium text-[15px] mt-4 mb-10 select-none cursor-pointer`}
                        >
                            Pakistan, Maldives Time
                        </p>

                        <TimeZoneSelect
                            ID="timezone-popover1"
                            anchorEl={anchorEl}
                            popoverName={"popover1"}
                            close={closeTimeZonePopover}
                        />
                    </div>

                    <div className='px-[55px] mb-10' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[17px]`}
                        >
                            Set your weekly hours
                        </label>
                        <div className='w-full border border-stone-300 rounded-md mt-4' >
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Sun"
                            />
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Mon"
                            />
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Tue"
                            />
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Wed"
                            />
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Thu"
                            />
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Fri"
                            />
                            <AvailableTimes
                                set={setAvailableTime}
                                data={availableTime}
                                day="Sat"
                            />
                        </div>
                    </div>
                </div>

            </div >

        </div>
    )
}

export default availability

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