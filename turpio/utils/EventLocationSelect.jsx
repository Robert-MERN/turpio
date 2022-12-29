import React, { useRef } from 'react'
import Popover from '@mui/material/Popover';
import { IconButton, TextField } from '@mui/material';
import useStateContext from '../context/ContextProvider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import Image from "next/image"
import zoomIcon from "../public/images/zoom.svg"
import googleMeetIcon from "../public/images/google-meet.svg"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from '@mui/icons-material/Clear';


const EventLocationSelect = () => {
    const { anchorEl,
        openTimeZonePopover,
        closeTimeZonePopover,
        openModal,
        modals,
        selectEventLocation,
        finalselectEventLocation,
        setSelectEventLocation,
        setFinalSelectEventLocation,
        setEditEventLocation,
        editEventLocation,
        setEditLocationCancel,

    } = useStateContext();
    const open = Boolean(anchorEl["popover4"]);
    const id = open ? "timezone-popover4" : undefined;

    const inputRef = useRef();


    const locationsName = [
        {
            title: "In-person meeting",
            desc: "Set an address or place",
            icon: <LocationOnIcon className='scale-[1.1] text-pink-500 mt-1' />,
        },
        {
            title: "Phone call",
            desc: "Inbound or outbound calls",
            icon: <LocalPhoneIcon className='scale-[1.1] text-blue-500 mt-2' />,
        },
        {
            title: "Google Meet",
            desc: "Web confrence",
            icon: <Image alt="Google Meet" src={googleMeetIcon} className='object-contain' />,
        },
        {
            title: "Zoom",
            desc: "Web confrence",
            icon: <Image alt="Zoom" src={zoomIcon} className='object-contain' />,
        },
        {
            title: "Custom",
            desc: "Leave Customized location details",
            icon: <DashboardCustomizeIcon className='scale-[1] text-violet-600 mt-2' />,
        },
        {
            title: "Ask invitee",
            desc: "My invitee will set the location",
            icon: <MapsUgcIcon className='scale-[1.1] text-blue-800 mt-2' />,
        },
    ]

    return (
        <div>
            <div
                onClick={(e) => {
                    if (!finalselectEventLocation || modals.eventLocation) {
                        openTimeZonePopover(e, "popover4");
                    }
                }}
                ref={inputRef}
                aria-describedby={"timezone-popover4"}

                className={`w-full cursor-pointer select-none  rounded-md px-4 py-2  text-[16px]  border
                ${(!finalselectEventLocation || modals.eventLocation) ? "cursor-pointer" : "cursor-default"}
                 ${open ? "border-blue-500" : "border-stone-300"}`}

            >
                {modals.eventLocation || finalselectEventLocation ?
                    <div className='w-full flex items-center justify-between' >
                        <div className='flex items-center gap-2' >
                            {modals.eventLocation ? selectEventLocation.icon : finalselectEventLocation.icon}
                            <p className='text-[16px] text-stone-900' >
                                {modals.eventLocation ? selectEventLocation.title : finalselectEventLocation.title}
                            </p>
                        </div>
                        {(finalselectEventLocation && !modals.eventLocation) &&
                            <div className='flex items-center gap-2' >
                                <p onClick={() => {
                                    setEditEventLocation(true);
                                    openModal("eventLocation")
                                }} className='text-[16px] text-blue-500 hover:underline cursor-pointer pr-3 border-r border-stone-300' >
                                    Edit
                                </p>

                                <ClearIcon onClick={() => {
                                    setFinalSelectEventLocation(null);
                                    setSelectEventLocation(null);
                                    setEditEventLocation(null)
                                }}
                                    className='text-stone-500 scale-[1] cursor-pointer' />

                            </div>
                        }
                    </div>
                    :
                    <div className='w-full flex items-centre justify-between' >
                        <p className='text-gray-400' >Add Location</p>
                        <>
                            {open ?
                                <KeyboardArrowUpIcon className='text-blue-500' />
                                :
                                <KeyboardArrowDownIcon className='text-blue-500' />
                            }
                        </>
                    </div>
                }
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl["popover4"]}
                onClose={() => closeTimeZonePopover("popover4")}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={`${modals.eventLocation ? "w-[345px]" : "w-[440px]"} h-[225px] overflow-y-auto py-3`} >

                    {locationsName.map((i, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                closeTimeZonePopover("popover4");

                                openModal("eventLocation");
                              if (selectEventLocation) {
                                    setSelectEventLocation(i);
                                    setFinalSelectEventLocation(i);
                                } else {
                                    setSelectEventLocation(i);
                                    setEditLocationCancel(i);
                                }
                            }}
                            className={`flex px-4 py-[6px] hover:bg-stone-200 cursor-pointer gap-3 border-stone-200 transition-all select-none
                                      ${i.title === "Ask invitee" ? "border-none" : "border-b"}`}
                        >

                            {i.icon}
                            <div className='' >
                                <p className='text-[14px] text-stone-900' >{i.title}</p>
                                <p className='text-[12px] text-gray-500' >{i.desc}</p>
                            </div>
                        </div>
                    ))
                    }
                </div>

            </Popover>

        </div >
    )
}

export default EventLocationSelect