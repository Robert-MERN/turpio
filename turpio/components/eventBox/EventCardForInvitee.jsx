import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const EventCard = ({ title, time, link, id, eventLinkName, userId, bgColor, borderColor }) => {


    const router = useRouter();
    const username = router.asPath.split("/")[2];
    const navigate = () => {
        router.push(`/schedule/${username}/select-date/${eventLinkName}`)
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
        navigator.clipboard.writeText(`https://turpio.com/schedule/${username}/select-date/${eventLinkName}`)
        toast.success("Copied", toastConfig);
        setcopied(true);
        setTimeout(() => {
            setcopied(false);
        }, 2000);
    }
    return (
        <div id="parent-container-event-card" className={`w-[380px] h-fit overflow-hidden rounded-md shadow-default border-t-[6px]  bg-white select-none ${borderColor}`}>

            <div className='flex flex-col gap-6 mt-6' >

                <div>

                    <div onClick={navigate} className='px-5 cursor-pointer' >
                        <div className='flex items-start gap-4 mb-6' >
                            <p className={`w-[30px] h-[30px] rounded-full ${bgColor}`} ></p>
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