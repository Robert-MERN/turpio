import React, { useState, useEffect } from 'react'
import TextEditor from "../../../utils/quill/TextEditor";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router"
import EventLocationSelect from '../../../utils/EventLocationSelect';
import useStateContext from '../../../context/ContextProvider';

const EditCreateEvent = ({ nextLink, editEvent, setEditEvent }) => {
    const { meetingColor, handleColorsChange, finalselectEventLocation } = useStateContext();

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
    const nextPage = () => {
        if (!Object.values(value).every(e => Boolean(e) === true)) {
            router.push({
                pathname: `/event/new/${nextLink}`,
                query: {
                    data: value
                }
            }, `/event/new/${nextLink}`)
        }
    }

    const [value, setValue] = useState({
        eventName: "",
        desc: "",
        eventLink: "",
        eventLocation: "",
        eventColorBG: meetingColor.bg || "",
        eventColorBorder: meetingColor.border || "",
    });

    const handleChange = (e) => {
        setValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    useEffect(() => {
        if (finalselectEventLocation) {
            setValue(prev => ({ ...prev, eventLocation: finalselectEventLocation.title }))
        }
    }, [finalselectEventLocation])

    return (
        <div className={`w-[1000px] transition-all shadow-default rounded-md bg-white border-2 ${meetingColor.border} flex flex-col justify-between`} >
            {/* head */}
            <div onClick={setEditEvent} className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px] cursor-pointer select-none' >
                <div className='flex gap-3' >
                    <div className={`w-[22px] h-[22px] rounded-full ${meetingColor.bg}`} ></div>
                    <div>
                        <p className='text-[15px] text-stone-700' >What event is this?</p>
                        <div className='text-[14px] text-stone-500' >{
                            value.eventName && finalselectEventLocation ?
                                <div className='flex gap-1 items-center' >
                                    {`${value.eventName}, `}
                                    <div className='flex items-center' >
                                        <div className='scale-[.6]' >
                                            {finalselectEventLocation.icon}

                                        </div>
                                        {finalselectEventLocation.title}
                                    </div>
                                </div>
                                :
                                value.eventName ?
                                    `${value.eventName}, No location given`
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
                {editEvent &&
                    <div className='flex gap-3' >
                        <button className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button onClick={nextPage} className={`text-[14px] ${meetingColor.bg} rounded-full w-[110px] h-[35px] text-white grid place-items-center hover:opacity-80 transition-all`} >Save & Close</button>
                    </div>
                }

            </div>
            {/* body */}
            {editEvent &&
                <div className='px-[55px] w-[550px] py-[35px] flex gap-6 flex-col min-h-[calc(75vh)]' >
                    {/* event name */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]`}
                        >
                            Event name
                        </label>
                        <TextField
                            className='w-full mt-2'
                            name="eventName"
                            onChange={handleChange}
                            placeholder="Event name"
                            size='small'

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
                            <EventLocationSelect />
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
                                value={value.desc}
                                setValue={setValue}
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
                        <p className='text-[15px] text-stone-500' >turpio.com/muneebsafeer/</p>
                        <TextField
                            className='w-full mt-2'
                            name="eventLink"
                            onChange={handleChange}
                            size='small'
                            placeholder="turpio.com/muneebsafeer/"

                        />
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
            }

            {/* footer */}
            {editEvent &&
                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button className='border text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button onClick={nextPage} className={`border text-[14px] ${meetingColor.bg} rounded-full w-[110px] h-[35px] text-white grid place-items-center hover:opacity-80 transition-all`} >Save & Close</button>
                    </div>


                </div>
            }

        </div>
    )
}

export default EditCreateEvent