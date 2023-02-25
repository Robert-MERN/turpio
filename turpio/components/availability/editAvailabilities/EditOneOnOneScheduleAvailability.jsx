import React, { useState, useEffect } from 'react'
import AvailableTimes from '../AvailableTimes'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useRouter } from "next/router";
import { TextField } from '@mui/material';
import useStateContext from '../../../context/ContextProvider';



const EditOneOnOneScheduleAvailability = ({ nextLink, editEvent, setEditEvent }) => {
    const { openModal} = useStateContext();

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

    const [meetingCustomDuration, setMeetingCustomDuration] = useState({
        show: false,
        time: "",
        timeUnit: "hrs"
    });
    const handleCustomDuration = (e) => {
        if (e.target.value >= 0 && e.target.name === "time") {

            setMeetingCustomDuration(prev => ({ ...prev, [e.target.name]: e.target.value }))

        } else {
            setMeetingCustomDuration(prev => ({ ...prev, timeUnit: e.target.value }))
        }
    }


    const [values, setvalues] = useState({
        meetingDuration: "15"
    })

    const handleChange = (e) => {
        setvalues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        if (values.meetingDuration === "custom") {
            setMeetingCustomDuration(prev => ({ ...prev, show: true }));
        } else {
            setMeetingCustomDuration({
                show: false,
                time: "",
                timeUnit: "hrs"
            });
        }
    }, [values.meetingDuration]);


    const [scheduleSelection, setScheduleSelection] = useState("useAnExistingSchedule");

    const router = useRouter();
    const nextPage = () => {
        router.push({
            pathname: `/event/new/${nextLink}`,
            query: {
                data: ""
            }
        }, `/event/new/${nextLink}`)
    }

    return (

        <div className='w-[1000px] shadow-default rounded-md bg-white border-2 border-violet-600 flex flex-col justify-between' >
            {/* head */}
            <div onClick={setEditEvent} className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px] cursor-pointer select-none' >
                <div className='flex gap-3' >
                    <div className={`w-[22px] h-[22px] rounded-full bg-violet-700`} ></div>
                    <div>
                        <p className='text-[15px] text-stone-700' >When can people book this event?</p>
                        <p className='text-[13px] text-stone-500' >{
                            values.meetingDuration === "custom" ?
                                `${meetingCustomDuration.time} ${meetingCustomDuration.timeUnit}`
                                :
                                `${values.meetingDuration} Min`
                        }</p>
                    </div>
                </div>

                {editEvent &&
                    <div className='flex gap-3' >
                        <button onClick={()=> openModal("discardEvent")} className=' text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button onClick={nextPage} className='border text-[14px] bg-violet-700 rounded-full w-[110px] h-[35px] text-white grid place-items-center' >Save & Close</button>
                    </div>
                }

            </div>


            {/* body */}
            {editEvent &&
                <>
                    <div className='flex w-full px-[55px] my-10'>
                        <div className='flex-1' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Duration
                            </label>
                            <FormControl
                                size='small'
                                className='w-full mt-2'
                            >
                                <Select
                                    value={values.meetingDuration}
                                    onChange={handleChange}
                                    name="meetingDuration"
                                >
                                    <MenuItem value="15">15 Min</MenuItem>
                                    <MenuItem value="30">30 Min</MenuItem>
                                    <MenuItem value="45">45 Min</MenuItem>
                                    <MenuItem value="60">60 Min</MenuItem>
                                    <MenuItem value="custom">Custom</MenuItem>
                                </Select>
                            </FormControl>
                            {meetingCustomDuration.show &&

                                <div className='flex gap-3 mt-2 items-center' >
                                    <div className='flex-[2]' >

                                        <TextField
                                            size='small'
                                            className='w-full'
                                            type="number"
                                            name="time"
                                            value={meetingCustomDuration.time}
                                            onChange={handleCustomDuration}
                                        />
                                    </div>
                                    <div className='flex-[1.5]' >

                                        <FormControl
                                            size='small'
                                            className='w-full'

                                        >
                                            <Select
                                                value={meetingCustomDuration.timeUnit}
                                                onChange={handleCustomDuration}
                                                name="timeUnit"
                                            >
                                                <MenuItem value="min">Min</MenuItem>
                                                <MenuItem value="hrs">Hrs</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            }


                        </div>
                        <div className='flex-1 pl-[30px]' >
                            <p className='text-stone-400 text-[15px]' >Define how long your event will be. It can be as long as 12 hours.</p>
                        </div>
                    </div>
                    <div className='flex w-full px-[55px] my-10'>
                        <div className='flex-1 flex flex-col gap-6' >
                            <div>
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    How do you want to offer your availability for this event type?
                                </label>
                                <div className='flex gap-4 my-2' >
                                    <div
                                        onClick={() => setScheduleSelection("useAnExistingSchedule")}
                                        className={`px-[16px] py-[6px]  border-2 hover:border-blue-700 rounded-md text-stone-700 select-none cursor-pointer transition-all 
                                 ${scheduleSelection === "useAnExistingSchedule" ? "border-blue-600" : "border-stone-300"} `}
                                    >
                                        Use an existing schedule
                                    </div>
                                    <div
                                        onClick={() => setScheduleSelection("setCustomHours")}
                                        className={`px-[16px] py-[6px]  border-2 hover:border-blue-600 rounded-md text-stone-600 select-none cursor-pointer transition-all 
                                ${scheduleSelection === "setCustomHours" ? "border-blue-600" : "border-stone-300"} `}
                                    >
                                        Set custom hours
                                    </div>
                                </div>

                            </div>
                            {scheduleSelection === "useAnExistingSchedule" &&
                                <div>
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        Which schedule do you want to use?
                                    </label>
                                    <FormControl
                                        size='small'
                                        className='w-full mt-2'
                                    >
                                        <Select
                                            label=""
                                            value="Working hours"
                                        >
                                            <MenuItem value="Working hours">Working hours</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            }

                        </div>
                        <div className='flex-1 pl-[30px]' >
                            <p className='text-stone-400 text-[15px]' >
                                Select one of your schedules or define custom hours specific to this type of event.
                            </p>

                        </div>
                    </div>
                    <div className='px-[55px] mb-10' >
                        {scheduleSelection === "setCustomHours" ?
                            <div className='w-full border border-stone-300 rounded-md' >
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
                            :
                            <div className='w-full border border-stone-300 rounded-md p-5' >
                                <h1 className='text-stone-700 font-bold text-[12px]' >WEEKLY HOURS</h1>
                                {/* Sun */}
                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Sun"}</p>
                                    {availableTime.Sun.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Sun.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Sun.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>


                                {/* Monday */}

                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Mon"}</p>
                                    {availableTime.Mon.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Mon.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Mon.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>


                                {/* Tuesday */}

                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Tue"}</p>
                                    {availableTime.Tue.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Tue.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Tue.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>

                                {/* Wednsday */}


                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Wed"}</p>
                                    {availableTime.Wed.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Wed.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Wed.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>
                                {/* Thursday */}


                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Thu"}</p>
                                    {availableTime.Thu.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Thu.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Thu.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>

                                {/* Friday */}

                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Fri"}</p>
                                    {availableTime.Fri.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Fri.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Fri.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>

                                {/* Satuarday */}
                                <div className='w-fit flex items-center my-5' >
                                    <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Sat"}</p>
                                    {availableTime.Sat.checked ?
                                        <div className='flex items-center gap-3' >
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Sat.time1.hour12}</p>
                                            -
                                            <p className='text-stone-700 text-[16px]' >{availableTime.Sat.time2.hour12}</p>
                                        </div>
                                        :
                                        <p className='text-stone-500 text-[16px]' >Not available</p>
                                    }
                                </div>



                            </div>
                        }
                    </div>
                </>
            }

            {/* footer */}
            {editEvent &&
                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button onClick={()=> openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button onClick={nextPage} className='border text-[14px] bg-violet-700 rounded-full w-[110px] h-[35px] text-white grid place-items-center' >Save & Close</button>
                    </div>

                </div>
            }

        </div>


    )
}

export default EditOneOnOneScheduleAvailability