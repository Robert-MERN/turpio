import React, { useState, useEffect } from 'react'
import TextEditor from "../../utils/quill/TextEditor";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router"
import EventLocationSelect from '../../utils/EventLocationSelect';
import useStateContext from '../../context/ContextProvider';
import { FormControl, FormHelperText } from '@mui/material';
import { deleteCookie, getCookie, setCookie } from "cookies-next"

const CreateEventOneOnOne = ({ nextLink, user }) => {
    const {
        meetingColor,
        handleColorsChange,
        openModal,
        finalselectEventLocation,
        selectEventLocationValues,
    } = useStateContext();

    const eventColors = [
        {
            color: "bg-violet-600",
            borderColor: "border-violet-600",
            name: "Violet",
        },
        {
            color: "bg-red-500",
            borderColor: "border-red-500",
            name: "Red",
        },
        {
            color: "bg-red-400",
            borderColor: "border-red-400",
            name: "Light pink",
        },
        {
            color: "bg-fuchsia-500",
            borderColor: "border-fuchsia-500",
            name: "Magenta",
        },
        {
            color: "bg-blue-500",
            borderColor: "border-blue-500",
            name: "Blue",
        },
        {
            color: "bg-cyan-300",
            borderColor: "border-cyan-300",
            name: "Cyan",
        },
        {
            color: "bg-green-400",
            borderColor: "border-green-400",
            name: "Green",
        },
        {
            color: "bg-lime-300",
            borderColor: "border-lime-300",
            name: "Lime",
        },
        {
            color: "bg-yellow-300",
            borderColor: "border-yellow-300",
            name: "Yellow",
        },
        {
            color: "bg-orange-400",
            borderColor: "border-orange-400",
            name: "Orange",
        },

    ]

    const router = useRouter();

    const [values, setValues] = useState({
        eventName: "",
        desc: "",
        eventLink: `turpio.com/${user?.username}/select-date/`,
        eventLocation: selectEventLocationValues,
        eventColorBG: meetingColor.bg || "",
        eventColorBorder: meetingColor.border || "",
        errors: {
            eventName: "",
            eventLocation: "",
            eventLink: "",
        }
    });





    const validateField = (fieldName, value) => {
        let error = ''
        switch (fieldName) {
            case 'eventName':
                if (!value) {
                    error = 'Please enter your event name'
                } else if (value.length > 55) {
                    error = 'Is too long (maximum is 55 characters).'
                }
                break;
            case 'eventLocation':
                if (!value) {
                    error = 'Please select your event location'
                }
                break;
            case 'eventLink':
                if (!value && eventLinkEditBool) {
                    error = 'Please enter any event link name'
                } else if (!eventLinkEditBool && !values.eventName) {
                    error = 'Please enter any event link name'
                }
                break;
            default:
                break;
        }
        return error
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        const error = validateField(name, value)
        setValues(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error
            }
        }));
    }
    const [eventLinkEditBool, seteventLinkEditBool] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "eventName" && !eventLinkEditBool) {
            setValues(prev => ({ ...prev, eventName: value, eventLink: `turpio.com/${user?.username}/select-date/${value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}` }));
        } else if (name === "eventLink") {
            setValues(prev => ({ ...prev, eventLink: `turpio.com/${user?.username}/select-date/${value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}` }));
            seteventLinkEditBool(true)
        } else {
            setValues(prev => ({ ...prev, [name]: value }));
        }
    }

    useEffect(() => {
        setValues(prev => ({ ...prev, eventLocation: selectEventLocationValues }));
    }, [selectEventLocationValues]);
    const nextPage = () => {
        const errors = {}
        Object.keys(values).forEach(fieldName => {
            let error = "";
            if (fieldName === "eventLink") {
                error = validateField(fieldName, values[fieldName].split("/")[3]);
            } else {
                error = validateField(fieldName, values[fieldName]);
            }
            errors[fieldName] = error;
        });
        setValues(prevState => ({
            ...prevState,
            errors: errors
        }))

        if (Object.values(errors).every(e => !e)) {
            const expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));

            const { errors: useLess, ...other } = values
            const firstDetail = JSON.parse(getCookie("eventDetails1"))
            setCookie("eventDetails2", {
                ...other,
                ...firstDetail,
                eventColorBG: meetingColor.bg,
                eventColorBorder: meetingColor.border
            }, { expires: expiryDate });
            router.push(`/event/new/${nextLink}`);
        }
    }
    return (
        <div className='w-screen h-screen grid place-items-center' >
            <div className={`w-[1000px] transition-all shadow-default rounded-md bg-white border-2 ${meetingColor.border} flex flex-col justify-between`} >
                {/* head */}
                <div className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <div className={`w-[22px] h-[22px] rounded-full ${meetingColor.bg}`} ></div>
                        <div>
                            <p className='text-[15px] text-stone-700' >What event is this?</p>
                            <div className='text-[14px] text-stone-500' >{
                                values.eventName && finalselectEventLocation ?
                                    <div className='flex gap-1 items-center' >
                                        {`${values.eventName}, `}
                                        <div className='flex items-center' >
                                            <div className='scale-[.6]' >
                                                {finalselectEventLocation.icon}

                                            </div>
                                            {finalselectEventLocation.title}
                                        </div>
                                    </div>
                                    :
                                    values.eventName ?
                                        `${values.eventName}, No location given`
                                        :
                                        finalselectEventLocation ?

                                            <div className='flex items-center' >
                                                <div className='scale-[.6]' >
                                                    {finalselectEventLocation.icon}

                                                </div>
                                                {finalselectEventLocation.title}
                                            </div>


                                            :
                                            "No location given"
                            }</div>
                        </div>
                    </div>

                    <div className='flex gap-3' >
                        <button onClick={() => openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button onClick={nextPage} className={`text-[14px] ${meetingColor.bg} rounded-full w-[70px] h-[35px] text-white grid place-items-center hover:opacity-80 transition-all`} >Next</button>
                    </div>

                </div>
                {/* body */}

                <div className='px-[55px] w-[550px] py-[35px] flex gap-6 flex-col min-h-[calc(75vh)]' >
                    {/* event name */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]`}
                        >
                            Event name
                        </label>
                        <FormControl
                            className='w-full mt-2'
                        >
                            <TextField
                                name="eventName"
                                onChange={handleChange}
                                placeholder="Event name"
                                size='small'
                                value={values.eventName}
                                onBlur={handleBlur}
                                helperText={values.errors.eventName}
                                error={Boolean(values.errors.eventName)}
                            />
                        </FormControl>
                    </div>
                    {/* event location */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px] `}
                        >
                            Event Location
                        </label>
                        <div className='mt-2' >
                            <EventLocationSelect
                                error={Boolean(values.errors.eventLocation)}
                            />
                        </div>
                        {values.errors.eventLocation &&
                            <FormHelperText error >{values.errors.eventLocation}</FormHelperText>
                        }
                    </div>

                    {/* event description */}
                    <div className='' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]`}
                        >
                            Description/Instructions
                        </label>

                        <div className='mt-2' >
                            <TextEditor
                                value={values.desc}
                                setValue={setValues}
                            />
                        </div>
                    </div>

                    {/* event link */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]  mb-8`}
                        >
                            Event link
                        </label>
                        <div
                            className={`w-full border rounded-md py-[10px] px-3 mt-2 flex items-center text-[17px]
                             ${values.errors.eventLink ?
                                    "focus-within:border-red-700 border-red-600 "
                                    :
                                    "focus-within:border-blue-600 border-stone-300 "
                                }`}
                        >
                            <p className='text-gray-400 text-[15px] whitespace-nowrap' >turpio.com/{user?.username}/select-date/</p>
                            <input
                                name="eventLink"
                                value={values.eventLink.split("/")[3] || ""}
                                onChange={handleChange}
                                spellCheck={false}
                                onBlur={handleBlur}
                                className='border-none outline-none w-full h-full' type="text" />
                        </div>
                        {values.errors.eventLink &&
                            <FormHelperText error >{values.errors.eventLink}</FormHelperText>
                        }
                    </div>

                    {/* event colors */}
                    <div className='w-full' >
                        <p className={`text-stone-800 font-bold text-[14px] mb-2`}>Event color</p>
                        <div className='grid grid-cols-10 gap-1' >
                            {eventColors.map((i, index) => (
                                <div
                                    onClick={() => handleColorsChange(i.color, i.borderColor)}
                                    key={index}
                                    className='relative cursor-pointer'
                                >

                                    <div className={`w-[35px] h-[35px] rounded-full grid place-items-center text-white font-bold ${i.color}`} >
                                        {meetingColor.bg === i.color &&
                                            <p className='select-none' >
                                                ✔
                                            </p>
                                        }
                                    </div>
                                </div>
                            ))
                            }


                        </div>
                    </div>


                </div>


                {/* footer */}

                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button onClick={() => openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button onClick={nextPage} className={`border text-[14px] ${meetingColor.bg} rounded-full w-[70px] h-[35px] text-white grid place-items-center hover:opacity-80 transition-all`} >Next</button>
                    </div>


                </div>


            </div>

        </div >
    )
}

export default CreateEventOneOnOne