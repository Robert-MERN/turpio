import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import AppNavbar from '../../components/AppNavbar'
import AvailableTimes from '../../components/availability/AvailableTimes';
import AddIcon from '@mui/icons-material/Add';
import TimeZoneSelect from '../../utils/TimeZoneSelect';
import useStateContext from '../../context/ContextProvider';
import LanguageSelect from '../../utils/LanguageSelect'
import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken";
import defaultAvailableTimes from '../../utils/defaultAvailableTimes';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';


const availability = ({ user }) => {

    const {
        anchorEl,
        openTimeZonePopover,
        closeTimeZonePopover,
        selectedZone,
        setCookieUser,
        cookieUser,
        openModal,
        updateSchedule,
        deleteSchedule,
        updateAvailabilityStatus,
        setUpdateAvailabilityStatus,
        allSchedule,
        setAllSchedule,
        handleGoogleCalendarConnectAPI,
        handleGoogleCalendarDisconnectAPI,
    } = useStateContext();
    useEffect(() => {
        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);
        // setting users availability
        setAllSchedule(user.availability);
    }, []);

    const [availableTime, setAvailableTime] = useState(defaultAvailableTimes);

    useEffect(() => {
        if (allSchedule) setAvailableTime(allSchedule?.find(each => Object.keys(each)[0] === "Working hours")["Working hours"]);
    }, [allSchedule]);

    const [selectedTab, setSelectedTab] = useState("Working hours");

    const switchScheduleTabs = (name) => {
        const oneSchedule = allSchedule.find(each => Object.keys(each)[0] === name)[name];
        setAvailableTime(oneSchedule);
        setSelectedTab(name);
        if (updateAvailabilityStatus) {
            setUpdateAvailabilityStatus("");
        }
    }
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


                    {/* header */}
                    <div className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px] cursor-pointer select-none' >
                        <div className='flex gap-3' >
                            <div className={`w-[22px] h-[22px] rounded-full bg-violet-700`} ></div>
                            <div>
                                <p className='text-[15px] text-stone-700' >Your Availability for people.</p>
                            </div>
                        </div>

                        <button
                            disabled={updateAvailabilityStatus !== selectedTab}
                            onClick={() => updateSchedule(selectedTab, availableTime)}
                            className={`border text-[14px] rounded-full w-[75px] h-[35px] text-white grid place-items-center transition-all ${updateAvailabilityStatus ? "bg-violet-600 hover:opacity-80" : "bg-violet-300"}`}
                        >
                            Update
                        </button>

                    </div>



                    {/* body */}
                    <div className='px-[55px] mt-10' >
                        {cookieUser ?
                            <button
                                onClick={() => {
                                    cookieUser.calendarAccessToken ?
                                        handleGoogleCalendarDisconnectAPI()
                                        :
                                        handleGoogleCalendarConnectAPI()
                                }}
                                className={`py-[8px] px-[20px] text-[14px] rounded-md  text-white hover:opacity-80 transition-all ${cookieUser.calendarAccessToken ? "bg-red-500" : "bg-green-500"}`}
                            >
                                {cookieUser.calendarAccessToken ?

                                    "Disconnect to Google Calendar"
                                    :

                                    "Connect to Google Calendar"
                                }
                            </button>
                            :
                            <p className='text-zinc-600' >Loading...</p>
                        }
                    </div>
                    <p className={`text-stone-600 font-bold text-[14px] px-[55px] mt-10`}>
                        Choose a schedule below to edit or create a new one that you can apply to your event types
                    </p>

                    <div className='flex w-full px-[55px] my-10'>
                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                SCHEDULE
                            </label>
                            <div className='flex justify-between w-full' >
                                <div className='flex gap-4 my-2' >
                                    {allSchedule &&
                                        allSchedule.map((each, index) => (
                                            <div
                                                onClick={() => switchScheduleTabs(Object.keys(each)[0])}
                                                key={index}
                                                className={`px-[16px] py-[6px] border-stone-300 border-2 hover:border-blue-700 rounded-md text-stone-700 select-none cursor-pointer transition-all
                                        ${Object.keys(each)[0] === selectedTab ? "border-blue-700" : "border-stone-300"}
                                        `}
                                            >
                                                {Object.keys(each)[0]}
                                            </div>
                                        ))
                                    }


                                    <div onClick={() => openModal("newAvailabilityAdd")} className='px-[16px] py-[6px] border-stone-300 border-2 hover:border-blue-600 rounded-full text-stone-600 select-none cursor-pointer transition-all flex items-center gap-1' >
                                        <AddIcon />
                                        New schedule
                                    </div>
                                </div>
                                {(
                                    selectedTab !== "Working hours"
                                    &&
                                    allSchedule?.length > 1
                                )
                                    &&
                                    <Tooltip title="Delete schedule" placement="top" >
                                        <IconButton onClick={() => deleteSchedule(selectedTab)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
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
                            {`${selectedZone.countryName}, ${selectedZone.zoneName}`}
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
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Sun"
                            />
                            <AvailableTimes
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Mon"
                            />
                            <AvailableTimes
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Tue"
                            />
                            <AvailableTimes
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Wed"
                            />
                            <AvailableTimes
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Thu"
                            />
                            <AvailableTimes
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Fri"
                            />
                            <AvailableTimes
                                setAvailableTime={setAvailableTime}
                                availableTime={availableTime}
                                tab={selectedTab}
                                day="Sat"
                            />
                        </div>
                    </div>



                    {/* Footer */}
                    <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px] cursor-pointer select-none'>
                        <button
                            disabled={updateAvailabilityStatus !== selectedTab}
                            onClick={() => updateSchedule(selectedTab, availableTime)}
                            className={`border text-[14px] rounded-full w-[75px] h-[35px] text-white grid place-items-center transition-all ${updateAvailabilityStatus ? "bg-violet-600 hover:opacity-80" : "bg-violet-300"}`}
                        >
                            Update
                        </button>
                    </div>



                </div>

            </div >

        </div>
    )
}

export default availability

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
        return {
            props: { user },
        }
    }
}