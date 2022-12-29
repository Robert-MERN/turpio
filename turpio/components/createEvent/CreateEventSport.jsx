import React, { useState, useEffect } from 'react'
import TextEditor from "../../utils/quill/TextEditor";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router"
import EventLocationSelect from '../../utils/EventLocationSelect';
import useStateContext from '../../context/ContextProvider';

const CreateEventSport = ({ nextLink }) => {
    const { meetingColor, handleColorsChange, finalselectEventLocation, openModal } = useStateContext();

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
        typeOfField: "",
        amountOfFields: "",
        desc: "",
        eventLink: `turpio.com/${"muneebsafeer"}/`,
        eventLocation: "",
        eventColorBG: meetingColor.bg || "",
        eventColorBorder: meetingColor.border || "",
    });
    const [eventLinkEditBool, seteventLinkEditBool] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "typeOfField" && !eventLinkEditBool) {
            setValue(prev => ({ ...prev, typeOfField: e.target.value, eventLink: `turpio.com/${"muneebsafeer"}/${e.target.value}` }));
        } else if (e.target.name === "eventLink") {
            setValue(prev => ({ ...prev, eventLink: `turpio.com/${"muneebsafeer"}/${e.target.value}` }));
            seteventLinkEditBool(true)
        } else {
            setValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }
    useEffect(() => {
        if (finalselectEventLocation) {
            setValue(prev => ({ ...prev, eventLocation: finalselectEventLocation.title }))
        }
    }, [finalselectEventLocation])

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
                                value.typeOfField && finalselectEventLocation ?
                                    <div className='flex gap-1 items-center' >
                                        {`${value.typeOfField}, `}
                                        <div className='flex items-center' >
                                            <div className='scale-[.6]' >
                                                {finalselectEventLocation.icon}

                                            </div>
                                            {finalselectEventLocation.title}
                                        </div>
                                    </div>
                                    :
                                    value.typeOfField ?
                                        `${value.typeOfField}, No location given`
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
                            name="typeOfField"
                            onChange={handleChange}
                            placeholder="Type of Field"
                            size='small'

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
                            value={value.amountOfFields}
                            size='small'
                            type="number"
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
                        <div className='w-full border border-stone-300 rounded-md focus-within:border-blue-600 py-[10px] px-3 mt-2 flex items-center text-[17px]'  >
                            <p className='text-gray-400 text-[15px]' >turpio.com/muneebsafeer/</p>
                            <input
                                name="eventLink"
                                value={value.eventLink.split("/")[2] || ""}
                                onChange={handleChange}
                                spellCheck={false}
                                className='border-none outline-none w-full h-full' type="text" />
                        </div>
                        {/* <TextField
                                className='w-full mt-2'
                                name="eventLink"
                                value={value.eventLink}
                                onChange={handleChange}
                                size='small'
                                spellCheck={false}

                            /> */}
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