import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from 'next/link'
import { useRouter } from 'next/router';
import EventCardSettingModal from '../../utils/modals/EventCardSettingModal';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const EventCard = ({ title, time }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const cardSettingOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }


    const router = useRouter();
    const navigate = () => {
        router.push(`/schedule/${"safeer"}/select-date`)
    }
    const toastConfig = {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        toastId: "toast-copied"
    }
    const [copied, setcopied] = useState(false)
    const copyText = () => {
        navigator.clipboard.writeText("https://turpio.com/muneebsafeer/tesla")
        toast.success("Copied", toastConfig);
        setcopied(true);
        setTimeout(() => {
            setcopied(false);
        }, 2000);
    }
    return (
        <div id="parent-container-event-card" className='w-[380px] h-fit overflow-hidden rounded-md shadow-default border-t-[6px] border-blue-700 bg-white select-none'>

            <div className='flex flex-col gap-6 mt-6' >


                <div>

                    <div onClick={navigate} className='px-5 cursor-pointer' >
                        <div className='flex items-start gap-4 mb-6' >
                            <p className='w-[30px] h-[30px] rounded-full bg-violet-600' ></p>
                            <p className='text-[20px] text-stone-800 w-[170px] overflow-hidden text-ellipsis whitespace-nowrap' >{title}</p>
                        </div>
                        <p className='text-[15px] text-stone-500 font-medium' >{time}</p>
                    </div>
                </div>


                <div className='flex justify-end items-center border px-5 py-2' >
                    {copied ?
                        <div className='flex items-center cursor-default bg-green-500 rounded-full pl-3 pr-5 py-[.25rem] transition-all' >
                            <CheckIcon className='scale-[.60] font-bold text-white' />
                            <p id="text" className='text-[14px] text-white select-none' >Copied</p>
                        </div>
                        :
                        <div onClick={copyText} className='flex items-center cursor-pointer bg-blue-600 rounded-full pl-3 pr-4 py-[.25rem] hover:bg-blue-500 transition-all' >
                            <ContentCopyIcon className='scale-[.60] text-white' />
                            <p id="text" className='text-[14px] text-white select-none ' >Copy link</p>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default EventCard