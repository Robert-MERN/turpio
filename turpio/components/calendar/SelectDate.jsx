import React, { useState, useTransition } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Calendar from '../Calendar';
import CallIcon from '@mui/icons-material/Call';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useStateContext from '../../context/ContextProvider';
import TimeZoneSelect from '../../utils/TimeZoneSelect';
import CalendarTimeButton from '../../utils/CalendarTimeButton';
import PublicIcon from '@mui/icons-material/Public';
import { useRouter } from 'next/router';
import cookingTimeArray from '../../utils/cookingTimeArray';
import style from "../../styles/Home.module.css"
import { CircularProgress } from '@mui/material';


const SelectDate = () => {
    const { anchorEl, openTimeZonePopover, closeTimeZonePopover, selectedZone, availableTime, setAvailableTime, selectedAvailableTime, setSelectedAvailableTime } = useStateContext();


    const [value, setvalue] = useState("");
    const [third, setthird] = useState(false);





    const router = useRouter();
    const backPage = () => {
        router.push(`/schedule/${"safeer"}`)
    }




    // test

    const [timesArray, settimesArray] = useState([]);

    const [isPending, startTransition] = useTransition();


    const [intervalTimeID, setIntervaltimeID] = useState(null);

    // let's say we have a 30 mins meeting
    return (
        <div className='w-screen flex justify-center pb-14' >
            <div className={`${third ? "w-[1100px]" : "w-[900px]"} h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >

                {/* meeting details */}
                <div className='flex-1 border-r border-stone-200 p-6' >
                    <IconButton onClick={backPage} className='text-blue-500 mb-6' >
                        <ArrowBackIcon className='scale-[1.2] text-blue-500' />
                    </IconButton>
                    <p className='font-bold text-zinc-500' >
                        Elon musk
                    </p>
                    <p className='font-bold text-[28px] text-stone-700 mb-4' >
                        Tesla Sales Meeting
                    </p>
                    <p className='flex items-center gap-2 mt-3 text-stone-600' >
                        <AccessTimeIcon />
                        15 min
                    </p>
                    <p className='flex items-center gap-2 mt-3 text-stone-600'>
                        <CallIcon />
                        Phone call
                    </p>
                </div>

                {/* calendar */}
                <div className={`${third ? "border-r border-stone-200 flex-[1.5]" : "flex-[1.2]"} transition-all`} >
                    <p className='font-bold text-[22px] text-stone-700 p-6' >
                        Select a Date & Time
                    </p>
                    <Calendar
                        value={value}
                        setValue={setvalue}
                        openThird={setthird}
                        cookingTimeArray={cookingTimeArray}
                        settimesArray={settimesArray}
                        availableTime={availableTime}
                        selectedZone={selectedZone}
                        transition={startTransition}
                        setSelectedAvailableTime={setSelectedAvailableTime}
                        timeID={intervalTimeID}
                        setTtimeID={setIntervaltimeID}
                    />
                    <p className='font-bold text-[16px] text-stone-700 px-6' >
                        Time Zone
                    </p>
                    <p
                        onClick={(e) => openTimeZonePopover(e, "popover3")}
                        aria-describedby={"timezone-popover3"}
                        className='flex items-center gap-2 mt-2 text-[14px] text-stone-800 px-6 select-none cursor-pointer p-2 hover:bg-stone-200' >
                        <PublicIcon className='scale-75'
                        />
                        {`${selectedZone.countryName}, ${selectedZone.zoneName} (${new Date().toLocaleString("en-US", { timeZone: selectedZone.zoneName, hour: "numeric", minute: "2-digit" })})`}
                    </p>
                    <TimeZoneSelect
                        ID="timezone-popover3"
                        anchorEl={anchorEl}
                        popoverName={"popover3"}
                        close={closeTimeZonePopover}
                    />
                </div>

                {/* times slots */}
                <div
                    className={`flex-[.9] transition-all px-6 py-4 overflow-x-hidden overflow-y-auto
                ${third ? "block" : "hidden"} ${style.scrollBar}`}
                >

                    {isPending && !intervalTimeID ?
                        <div className='w-full h-full grid place-items-center' >
                            <CircularProgress color='primary' />
                        </div>
                        :
                        timesArray.map((i, index) => (
                            <CalendarTimeButton
                                key={index}
                                time={new Date(i).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                selected={selectedAvailableTime}
                                setSelected={setSelectedAvailableTime}
                            />
                        ))
                    }


                </div>









            </div>
        </div>
    )
}

export default SelectDate