import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import useStateContext from '../../context/ContextProvider';

const EventCopyTimeModal = ({ anchorEl, close, day }) => {
    const { openModal } = useStateContext()

    const open = Boolean(anchorEl);
    const id = open ? "eventTimeCopyModal" : undefined;

    const [days, setdays] = useState([
        { dayName: "sunday" },
        { dayName: "monday" },
        { dayName: "tuesday" },
        { dayName: "wednesday" },
        { dayName: "thursday" },
        { dayName: "friday" },
        { dayName: "saturday" },
    ])
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div className='w-[160px] p-4' >

                <p className='text-[13px] text-stone-400 py-2' >Copy Times To...</p>
                {days.map((i, index) => (
                    <div key={index} className='w-full flex justify-between items-center' >
                        <p className='text-[13px] text-stone-700 capitalize cursor-default' >{i.dayName}</p>
                        {i.dayName.toLowerCase().includes(day.toLowerCase()) ?
                            <div className='pr-2' >
                                <CheckIcon className='scale-[.65]' />
                            </div>
                            :
                            <Checkbox size='small' />
                        }
                    </div>
                ))

                }

                <button onClick={() => { close() }} className='bg-violet-600 mt-2 hover:bg-violet-500 w-full py-[6px] select-none rounded-full text-white text-[14px] transition-all' >
                    Apply
                </button>

            </div>

        </Popover>
    )
}

export default EventCopyTimeModal