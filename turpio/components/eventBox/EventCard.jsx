import React, { useState } from 'react'
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
    router.push(`/edit-event/${"12134787"}`)
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
    }, 3000);
  }
  return (
    <div id="parent-container-event-card" className='w-[330px] h-fit overflow-hidden rounded-md shadow-default border-t-[6px] border-blue-700 bg-white select-none'>
      <div className='flex justify-between items-center py-1 px-5' >

        <p className='w-[20px] h-[20px] rounded-full bg-violet-600' ></p>

        <div onClick={cardSettingOpen} aria-describedby="eventSettingPop" className='px-2 py-2 hover:bg-gray-300 rounded-md cursor-pointer transition-all' >
          <SettingsIcon className='scale-75' />
        </div>
        <EventCardSettingModal
          anchorEl={anchorEl}
          close={() => setAnchorEl(null)}
        />
      </div>
      <div className='flex flex-col gap-6' >


        <div>

          <div onClick={navigate} className='px-5 cursor-pointer' >
            <p className='text-[20px] text-stone-800 w-[170px] overflow-hidden text-ellipsis whitespace-nowrap' >{title}</p>
            <p className='text-[15px] text-stone-500' >{time}</p>
          </div>
          <Link className='hover:underline transition-all' href={`schedule/safeer`} >
            <p className='text-blue-700 mt-2 cursor-pointer px-5' >View Booking page</p>
          </Link>
        </div>


        <div className='flex justify-end items-center border px-5 py-2' >
          {copied ?
            <div className='flex items-center cursor-default bg-green-500 rounded-full pl-3 pr-5 py-[.25rem] transition-all' >
              <CheckIcon className='scale-[.60] font-bold text-white' />
              <p id="text" className='text-[14px] text-white select-none' >Copied</p>
            </div>
            :
            <div onClick={copyText} className='flex items-center cursor-pointer bg-blue-500 rounded-full pl-3 pr-4 py-[.25rem] hover:bg-blue-500 transition-all' >
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