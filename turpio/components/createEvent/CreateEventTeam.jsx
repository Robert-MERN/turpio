import React, { useState, useEffect } from 'react'
import TextEditor from "../../utils/quill/TextEditor";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router"
import EventLocationSelect from '../../utils/EventLocationSelect';
import useStateContext from '../../context/ContextProvider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CreateEventTeam = ({ nextLink }) => {
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
        serviceName: "",
        teamMembers: [],
        desc: "",
        eventLink: `turpio.com/${"muneebsafeer"}/`,
        eventLocation: "",
        eventColorBG: meetingColor.bg || "",
        eventColorBorder: meetingColor.border || "",
    });
    const [eventLinkEditBool, seteventLinkEditBool] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "serviceName" && !eventLinkEditBool) {
            setValue(prev => ({ ...prev, serviceName: e.target.value, eventLink: `turpio.com/${"muneebsafeer"}/${e.target.value}` }));
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
    }, [finalselectEventLocation]);



    // adding more members
    const [teamMembers, setteamMembers] = useState(0)
    const handleTeamMembersVal = (e, id) => {
        const memebers = value.teamMembers
        let oldObj = memebers.find(i => i.id === id)
        if (e.target.name === "service") {
            memebers.splice(memebers.findIndex(i => i.id === id), 1, { ...oldObj, [e.target.name]: e.target.value })
        } else {
            memebers.splice(memebers.findIndex(i => i.id === id), 1, { ...oldObj, [e.target.name]: oldObj[e.target.name] + e.target.value })
        }
        setValue((prev) => ({ ...prev, teamMembers: memebers }));
    }

    const addTeamMembers = () => {
        setValue((prev) => ({ ...prev, teamMembers: [...prev.teamMembers, { name: "", service: "", id: teamMembers.toString() }] }))
        setteamMembers(prev => prev + 1);
    }

    return (
        <div className='w-screen min-h-screen grid place-items-center py-12' >
            <div className={`w-[1000px] transition-all shadow-default rounded-md bg-white border-2 ${meetingColor.border} flex flex-col justify-between`} >
                {/* head */}
                <div className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <div className={`w-[22px] h-[22px] rounded-full ${meetingColor.bg}`} ></div>
                        <div>
                            <p className='text-[15px] text-stone-700' >What event is this?</p>
                            <div className='text-[14px] text-stone-500' >{
                                value.serviceName && finalselectEventLocation ?
                                    <div className='flex gap-1 items-center' >
                                        {`${value.serviceName}, `}
                                        <div className='flex items-center' >
                                            <div className='scale-[.6]' >
                                                {finalselectEventLocation.icon}

                                            </div>
                                            {finalselectEventLocation.title}
                                        </div>
                                    </div>
                                    :
                                    value.serviceName ?
                                        `${value.serviceName}, No location given`
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
                    {/* Add Services */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[14px]`}
                        >
                            Add Services
                        </label>
                        <TextField
                            className='w-full mt-2'
                            name="serviceName"
                            onChange={handleChange}
                            placeholder="Add Services"
                            size='small'
                        />
                    </div>



                    {value.teamMembers.map((i, index) => (

                        <div key={index} className='flex flex-col gap-1 my-2' >
                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    {`Name of Member ${index + 1}`}
                                </label>
                                <TextField
                                    className='w-full'
                                    id={index.toString()}
                                    name="name"
                                    onChange={e => handleTeamMembersVal(e, index.toString())}
                                    placeholder="Add Services"
                                    size='small'
                                />
                            </div>
                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    {`Select The Service of Member ${index + 1}`}
                                </label>
                                <Select
                                    className='w-full'
                                    size="small"
                                    value={i.service || ""}
                                    name="service"
                                    placeholder="Select the service of member"
                                    defaultValue='Mechanic'
                                    onChange={e => handleTeamMembersVal(e, index.toString())}
                                >
                                    <MenuItem value="Mechanic">Mechanic</MenuItem>
                                    <MenuItem value={"barber"}>Barber</MenuItem>

                                </Select>
                            </div>
                        </div>
                    ))
                    }
                    {value.teamMembers.length < 6 &&
                        <p onClick={addTeamMembers} className='text-blue-600 font-medium cursor-pointer select-none hover:underline transition-all text-[16px]' >
                            + Add team members
                        </p>
                    }






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

export default CreateEventTeam