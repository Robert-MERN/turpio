import React, { useState, useEffect } from 'react'
import TextEditor from "../../utils/quill/TextEditor";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router"
import EventLocationSelect from '../../utils/EventLocationSelect';
import useStateContext from '../../context/ContextProvider';
import { FormHelperText } from '@mui/material';
import { getCookie, setCookie } from "cookies-next"


const CreateEventSport = ({ nextLink, user }) => {
    const { meetingColor, handleColorsChange, finalselectEventLocation, selectEventLocationValues, openModal } = useStateContext();

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
        typeOfFields: "",
        amountOfFields: 1,
        desc: "",
        eventLink: `turpio.com/${user.username}/select-date/`,
        eventLocation: "",
        eventColorBG: meetingColor.bg || "",
        eventColorBorder: meetingColor.border || "",
        errors: {
            typeOfFields: "",
            amountOfRooms: "",
            eventLocation: "",
            eventLink: "",
        }
    });
    const [eventLinkEditBool, seteventLinkEditBool] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "typeOfFields" && !eventLinkEditBool) {
            setValues(prev => ({ ...prev, typeOfFields: value, eventLink: `turpio.com/${user?.username}/select-date/${value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}` }));
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


    const validateField = (fieldName, value) => {
        let error = ''
        switch (fieldName) {
            case 'typeOfFields':
                if (!value) {
                    error = 'Please enter the type of field'
                } else if (value.length > 55) {
                    error = 'Is too long (maximum is 55 characters).'
                }
                break;
            case 'amountOfFields':
                if (value < 1) {
                    error = 'Please enter the numbers of fields'
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
                } else if (!eventLinkEditBool && !values.typeOfFields) {
                    error = 'Please enter any event link name'
                }
                break;
            default:
                break;
        }
        return error
    };

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
            errors
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
                                values.typeOfFields && finalselectEventLocation ?
                                    <div className='flex gap-1 items-center' >
                                        {`${values.typeOfFields}, `}
                                        <div className='flex items-center' >
                                            <div className='scale-[.6]' >
                                                {finalselectEventLocation.icon}

                                            </div>
                                            {finalselectEventLocation.title}
                                        </div>
                                    </div>
                                    :
                                    values.typeOfFields ?
                                        `${values.typeOfFields}, No location given`
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
                    {/* Type of Field */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]`}
                        >
                            Type of Field
                        </label>
                        <TextField
                            className='w-full mt-2'
                            name="typeOfFields"
                            onChange={handleChange}
                            placeholder="Type of Field"
                            size='small'
                            onBlur={handleBlur}
                            helperText={values.errors.typeOfFields}
                            error={Boolean(values.errors.typeOfFields)}
                        />
                    </div>
                    {/* Amount of Fields */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]`}
                        >
                            Amount of Fields
                        </label>
                        <TextField
                            className='w-full mt-2'
                            name="amountOfFields"
                            onChange={handleChange}
                            value={values.amountOfFields}
                            size='small'
                            type="number"
                            onBlur={handleBlur}
                            helperText={values.errors.amountOfFields}
                            error={Boolean(values.errors.amountOfFields)}
                            inputProps={{
                                min: 1,
                                max: 20,
                                pattern: "[1-9]*"
                            }}
                        />
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
                            {values.errors.eventLocation &&
                                <FormHelperText error>
                                    {values.errors.eventLocation}
                                </FormHelperText>

                            }
                        </div>
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
                            <FormHelperText error>
                                {values.errors.eventLink}
                            </FormHelperText>
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

export default CreateEventSport