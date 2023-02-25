import React, { useState, useEffect } from 'react'
import TextEditor from "../../utils/quill/TextEditor";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router"
import EventLocationSelect from '../../utils/EventLocationSelect';
import useStateContext from '../../context/ContextProvider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormHelperText } from '@mui/material';
import { getCookie, setCookie } from "cookies-next"


const CreateEventTeam = ({ nextLink, user }) => {
    const { meetingColor, handleColorsChange, finalselectEventLocation, openModal, selectEventLocationValues } = useStateContext();

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
        serviceName: "",
        eventLocation: "",
        eventLink: `turpio.com/${user.username}/select-date/`,
        teamMembers: [],
        desc: "",
        eventColorBG: meetingColor.bg || "",
        eventColorBorder: meetingColor.border || "",
        errors: {
            serviceName: '',
            eventLink: '',
            eventLocation: '',
        }
    });
    const [eventLinkEditBool, seteventLinkEditBool] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        if (e.target.name === "serviceName" && !eventLinkEditBool) {
            setValues(prev => ({ ...prev, serviceName: value, eventLink: `turpio.com/${user.username}/select-date/${value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}` }));
        } else if (name === "eventLink") {
            setValues(prev => ({ ...prev, eventLink: `turpio.com/${user.username}/select-date/${value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}` }));
            seteventLinkEditBool(true)
        } else {
            setValues(prev => ({ ...prev, [name]: value }));
        }
    }
    useEffect(() => {
        setValues(prev => ({ ...prev, eventLocation: selectEventLocationValues }));
    }, [selectEventLocationValues]);



    // adding more members
    const [teamMembers, setteamMembers] = useState(0);
    const handleTeamMembersVal = (e, id) => {
        const { name, value } = e.target
        const members = values.teamMembers
        let oldObj = members.find(i => i.id === id)
        members.splice(members.findIndex(i => i.id === id), 1, { ...oldObj, [name]: value })
        setValues((prev) => ({ ...prev, teamMembers: members }));
    }

    const addTeamMembers = () => {
        setValues((prev) => ({
            ...prev, teamMembers: [...prev.teamMembers, {
                memberName: "",
                memberService: "",
                id: teamMembers.toString(),
                errors: {
                    memberName: '',
                    memberService: ''
                }
            }
            ]
        }))
        setteamMembers(prev => prev + 1);
    }



    const validateField = (fieldName, value) => {
        let error = ''
        switch (fieldName) {
            case 'serviceName':
                if (!value) {
                    error = 'Please enter your service name'
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
                } else if (!eventLinkEditBool && !values.serviceName) {
                    error = 'Please enter any event link name'
                }
                break;
            case 'memberName':
                if (!value) {
                    error = "Please enter the team member name"
                }
                break;
            case 'memberService':
                if (!value) {
                    error = 'Please select the team member service'
                }
                break;
            default:
                break;
        }
        return error
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setValues(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error
            }
        }))
    }

    const handleBlurMember = (id) => (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        const members = values.teamMembers;
        const oldObj = members.find(i => i.id === id);
        members.splice(members.findIndex(i => i.id === id),
            1, {
            ...oldObj,
            errors:
            {
                ...oldObj?.errors,
                [name]: error
            }
        });
        setValues(prevState => ({ ...prevState, teamMembers: members }));

    }

    const deleteTeamMember = () => {
        const members = values.teamMembers;
        members.splice(members.length - 1, 1);
        setValues(prevState => ({ ...prevState, teamMembers: members }));
        setteamMembers(prev => prev - 1);
    }

    const nextPage = () => {
        const errors = {};
        const memberErrorsArr = []
        for (let i = 0; i < values.teamMembers.length; i++) {
            const members = values.teamMembers
            const memberErrors = {}
            Object.keys(members[i]).forEach(fieldName => {
                let error = validateField(fieldName, members[i][fieldName]);
                memberErrors[fieldName] = error;
                let oldObj = members.find(e => e.id === i.toString());
                members.splice(members.findIndex(e => e.id === i.toString()), 1, { ...oldObj, errors: memberErrors })
            });
            setValues(prevState => ({
                ...prevState,
                teamMembers: members
            }));
            if (Object.keys(memberErrors).length) {
                memberErrorsArr.push(memberErrors);
            }
        };

        Object.keys(values).forEach(fieldName => {
            let error = "";
            if (fieldName === "eventLink") {
                error = validateField(fieldName, values[fieldName].split("/")[3]);
            } else {
                error = validateField(fieldName, values[fieldName]);
            }
            errors[fieldName] = error
        })
        setValues(prevState => ({
            ...prevState,
            errors
        }));
        if (memberErrorsArr.length) {
            if (Object.values(errors).every(e => !e) && memberErrorsArr.every(e => Object.values(e).every(val => !val))) {
                const expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));
                const { errors: useLess, ...other } = values
                let teamMembersArray = [];
                if (values.teamMembers.length) {
                    for (let i = 0; i < values.teamMembers.length; i++) {
                        const { errors, ...other } = values.teamMembers[i];
                        teamMembersArray.push(other);
                    }
                }
                const firstDetail = JSON.parse(getCookie("eventDetails1"))
                setCookie("eventDetails2", {
                    ...other,
                    ...firstDetail,
                    eventColorBG: meetingColor.bg,
                    eventColorBorder: meetingColor.border,
                    teamMembers: teamMembersArray
                }, { expires: expiryDate });
                router.push(`/event/new/${nextLink}`);
            };
        } else {
            if (Object.values(errors).every(e => !e)) {
                const expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));
                const { errors: useLess, ...other } = values
                let teamMembersArray = [];
                if (values.teamMembers.length) {
                    for (let i = 0; i < values.teamMembers.length; i++) {
                        const { errors, ...other } = values.teamMembers[i];
                        teamMembersArray.push(other);
                    }
                }
                const firstDetail = JSON.parse(getCookie("eventDetails1"));
                setCookie("eventDetails2", {
                    ...other,
                    ...firstDetail,
                    eventColorBG: meetingColor.bg,
                    eventColorBorder: meetingColor.border,
                    teamMembers: teamMembersArray
                }, { expires: expiryDate });
                router.push(`/event/new/${nextLink}`);
            };
        }
    };

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
                                values.serviceName && finalselectEventLocation ?
                                    <div className='flex gap-1 items-center' >
                                        {`${values.serviceName}, `}
                                        <div className='flex items-center' >
                                            <div className='scale-[.6]' >
                                                {finalselectEventLocation.icon}

                                            </div>
                                            {finalselectEventLocation.title}
                                        </div>
                                    </div>
                                    :
                                    values.serviceName ?
                                        `${values.serviceName}, No location given`
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
                            error={Boolean(values.errors.serviceName)}
                            helperText={values.errors.serviceName}
                            onChange={handleChange}
                            placeholder="Add Services"
                            size='small'
                            onBlur={handleBlur}
                        />
                    </div>



                    {
                        Boolean(values.teamMembers.length) &&
                        values.teamMembers.map((i, index) => (
                            <div key={index} className='flex flex-col gap-1' >

                                <div className='w-full' >
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        {`Name of Member ${index + 1}`}
                                    </label>
                                    <TextField
                                        className='w-full'
                                        name="memberName"
                                        helperText={i?.errors?.memberName}
                                        error={Boolean(i?.errors?.memberName)}
                                        onChange={e => handleTeamMembersVal(e, index.toString())}
                                        placeholder="Name"
                                        size='small'
                                        onBlur={handleBlurMember(index.toString())}

                                    />
                                </div>
                                <div className='w-full' >
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        {`Select The Service of Member ${index + 1}`}
                                    </label>
                                    <FormControl
                                        className='w-full'
                                    >
                                        <Select
                                            error={Boolean(i?.errors?.memberService)}
                                            size="small"
                                            value={i?.memberService || ""}
                                            name="memberService"
                                            placeholder="Select the service of member"
                                            defaultValue='Mechanic'
                                            onChange={e => handleTeamMembersVal(e, index.toString())}
                                            onBlur={handleBlurMember(index.toString())}
                                        >
                                            <MenuItem value="Mechanic">Mechanic</MenuItem>
                                            <MenuItem value={"barber"}>Barber</MenuItem>

                                        </Select>
                                        {i?.errors?.memberService &&
                                            <FormHelperText error>{i.errors.memberService}</FormHelperText>

                                        }

                                    </FormControl>
                                </div>
                            </div>
                        ))
                    }
                    {values.teamMembers.length > 0 &&
                        <p onClick={deleteTeamMember} className='text-white text-[13px] cursor-pointer w-fit select-none transition-all hover:bg-red-400 bg-red-500 rounded-md px-4 py-2 mb-2' >
                            remove team member
                        </p>
                    }
                    {values.teamMembers.length < 6 &&
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
                            <EventLocationSelect
                                error={Boolean(values.errors.eventLocation)}
                            />
                            {values.errors.eventLocation &&
                                <FormHelperText className='text-red-600 mt-[4px] mx-[14px]' >{values.errors.eventLocation}</FormHelperText>
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
                                onBlur={handleBlur}
                                spellCheck={false}
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

export default CreateEventTeam