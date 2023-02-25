import React, { useEffect, useState } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@mui/material/TextField';
import CallIcon from '@mui/icons-material/Call';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/router";
import { getCookie } from 'cookies-next';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { getTime, getTitle } from '../../utils/eventSortFunctions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideocamIcon from '@mui/icons-material/Videocam';
import style from "../../styles/Home.module.css"
import PublicIcon from '@mui/icons-material/Public';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import useStateContext from "../../context/ContextProvider";


const InviteeDetails = ({ username, eventID }) => {

    const { scheduleConfirmingMails } = useStateContext();
    const [data, setData] = useState(null);
    const [updatedInfo, setUpdatedInfo] = useState(null);

    useEffect(() => {
        const cookie = getCookie("schedulingEvent");
        if (cookie) {
            const { update, data: cookieData } = JSON.parse(cookie);
            setData(cookieData);
            setUpdatedInfo(update);
        }
    }, []);
    const router = useRouter();

    const [values, setValues] = useState({
        guestName: "",
        guestEmail: "",
        guestAdditionalInfo: "",
        guestPhoneNo: "",
        guestLocation: "",
        errors: {
            guestName: "",
            guestEmail: "",
            guestPhoneNo: "",
            guestLocation: "",
        }
    });

    const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const validateForm = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
            case "guestName":
                if (!value) {
                    error = "Can't be blank.";
                }
                break;
            case "guestEmail":
                if (!value) {
                    error = "Can't be blank.";
                } else if (!emailTest.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case "guestPhoneNo":
                if (!value && data?.eventLocation?.strategy === "I will call my invitee") {
                    error = "Can't be blank.";
                }
                break;
            case "guestLocation":
                if (!value && data?.eventLocation?.location === "Ask invitee") {
                    error = "Can't be blank.";
                }
                break;
            default:
                break;
        }
        return error;
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prevVal => ({ ...prevVal, [name]: value }));
    }
    const handleBlur = (e) => {
        const { name, value } = e.target
        const error = validateForm(name, value);
        setValues(prevVal => ({ ...prevVal, errors: { ...prevVal.errors, [name]: error } }));
    }


    const nextPage = () => {
        let errors = {}
        Object.keys(values).forEach(i => {
            const error = validateForm(i, values[i]);
            if (error) {
                errors[i] = error;
            }
        });
        setValues(prevVal => ({ ...prevVal, errors }));
        if (Object.values(errors).every(i => !i)) {
            const { errors, ...restValues } = values;
            const DBeventData = { ...data, guests: [...data.guests, { ...restValues, ...updatedInfo }] } // data will be saved in db
            const guestInfo = { ...restValues, ...updatedInfo } // guest informations

            scheduleConfirmingMails(DBeventData, guestInfo, username, DBeventData._id);
        }
    }
    const backPage = () => {
        router.push(`/schedule/${username}/select-date/${eventID}`)
    }
    return (
        <div className='w-screen flex justify-center pb-14' >
            {data && updatedInfo ?
                <div className={`w-[900px] h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >


                    {/* meeting details */}
                    <div className='flex-1 border-r border-stone-200 p-6' >
                        <IconButton onClick={backPage} className='text-blue-500 mb-6' >
                            <ArrowBackIcon className='scale-[1.2] text-blue-500' />
                        </IconButton>
                        <p className='font-bold text-zinc-500' >
                            {data.userFullName}
                        </p>
                        <p className='font-bold text-[28px] text-stone-700 mb-4 w-[360px] overflow-hidden text-ellipsis whitespace-nowrap' >
                            {getTitle(data)}
                        </p>
                        <p className='flex items-center gap-2 mt-3 text-stone-600 font-medium' >
                            <AccessTimeFilledIcon />
                            {getTime(data)}
                        </p>

                        {data.eventLocation.location !== "Ask invitee" &&
                            <p className='flex gap-2 mt-3 text-stone-600 font-medium'>
                                {/* icon logic */}
                                {
                                    data.eventLocation.location === "In-person meeting" || data.eventLocation.location === "Custom" ?
                                        <LocationOnIcon />
                                        :
                                        data.eventLocation.location === "Zoom" || data.eventLocation.location === "Google Meet" ?
                                            <VideocamIcon />
                                            :
                                            //if data.eventLocation.location is "Phone call"
                                            <CallIcon />
                                }
                                {/* text logic */}
                                {data.eventLocation.location === "Zoom" || data.eventLocation.location === "Google Meet" ?
                                    'Web conferencing details provided upon confirmation.'
                                    : data.eventLocation.location === "Custom" ?
                                        `${data.eventLocation.customLocation}`
                                        :
                                        `${data.eventLocation.location}`
                                }
                            </p>
                        }
                        <p className='flex gap-2 mt-3 text-stone-600 font-medium'>
                            <CalendarTodayIcon />
                            {data.eventType === "hotel-reservation" ?
                                `${updatedInfo.date[0].startWeekday}, ${updatedInfo.date[0].startMonth} ${updatedInfo.date[0].startDay}, ${updatedInfo.date[0].startYear}  - ${updatedInfo.date[1].endWeekday}, ${updatedInfo.date[1].endMonth} ${updatedInfo.date[1].endDay}, ${updatedInfo.date[1].endYear}`
                                :
                                `${updatedInfo.startTime} - ${updatedInfo.endTime}, ${updatedInfo.day}, ${updatedInfo.month} ${updatedInfo.dayNumeric}, ${updatedInfo.year}`}
                        </p>

                        {data.eventType === "hotel-reservation" &&
                            < p className='flex gap-2 mt-3 text-stone-600 font-medium'>
                                <MeetingRoomIcon />
                                Total Rooms: {updatedInfo.rooms}
                            </p>
                        }
                        {data.eventType === "hotel-reservation" &&
                            < p className='flex gap-2 mt-3 text-stone-600 font-medium'>
                                <Diversity3Icon />
                                Total Guests: {updatedInfo.guests}

                            </p>
                        }
                        <p className='flex gap-2 mt-3 text-stone-600 font-medium'>
                            <PublicIcon />
                            {updatedInfo.timeZone}

                        </p>
                    </div>

                    {/* invitee's details */}
                    <div className={`flex-[1.3] overflow-y-scroll p-6 ${style.scrollBar}`}>
                        <p className='font-bold text-[22px] text-stone-700 mb-6' >
                            Enter Details
                        </p>
                        <div className='w-full flex flex-col gap-6' >

                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    Name
                                </label>
                                <TextField
                                    className='w-full mt-2'
                                    placeholder="Name"
                                    size='small'
                                    error={Boolean(values.errors.guestName)}
                                    helperText={values.errors.guestName}
                                    name="guestName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.guestName}
                                />
                            </div>

                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    Email
                                </label>
                                <TextField
                                    className='w-full mt-2'
                                    placeholder="Email"
                                    size='small'
                                    error={Boolean(values.errors.guestEmail)}
                                    helperText={values.errors.guestEmail}
                                    name="guestEmail"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.guestEmail}

                                />
                            </div>
                            {data.eventLocation.location === "Ask invitee" &&
                                <div className='w-full' >
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        Location
                                    </label>
                                    <TextField
                                        className='w-full mt-2'
                                        placeholder="Location"
                                        size='small'
                                        error={Boolean(values.errors.guestLocation)}
                                        helperText={values.errors.guestLocation}
                                        name="guestLocation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.guestLocation}
                                    />
                                </div>
                            }


                            {data.eventLocation.location === "Phone call" &&
                                <>
                                    {data.eventLocation.strategy === "I will call my invitee" &&

                                        <div className='w-full' >
                                            <label
                                                htmlFor=""
                                                className={`text-stone-800 font-bold text-[14px]`}
                                            >
                                                Phone number
                                            </label>

                                            <MuiPhoneNumber
                                                className='w-full mt-2'
                                                onChange={e => handleChange({ target: { name: "guestPhoneNo", value: e } })}
                                                variant='outlined'
                                                size='small'
                                                onBlur={e => handleBlur({ target: { name: "guestPhoneNo", value: e } })}
                                                error={Boolean(values.errors.guestPhoneNo)}
                                                helperText={values.errors.guestPhoneNo}
                                                defaultCountry={'us'}
                                            />
                                        </div>
                                    }
                                </>

                            }

                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    Please share anything that will help prepare for our meeting.
                                </label>

                                <TextField
                                    className='w-full mt-2'
                                    size='small'
                                    name="guestAdditionalInfo"
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    value={values.guestAdditionalInfo}
                                />
                            </div>

                            <div className='w-full my-4' >
                                <button
                                    className='bg-violet-600 hover:bg-violet-500 active:bg-violet-400 px-8 py-[10px] rounded-full text-white font-medium text-[16px] transition-all duration-200'
                                    onClick={nextPage}
                                >
                                    Schedule event
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                :
                <p className='text-[21px] font-bold text-stone-800 text-left p-6' >
                    No event is Booked.
                </p>

            }
        </div >
    )
}

export default InviteeDetails