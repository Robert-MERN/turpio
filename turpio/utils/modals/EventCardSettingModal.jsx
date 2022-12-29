import React from 'react'
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
import useStateContext from '../../context/ContextProvider';


const EventCardSettingModal = ({ anchorEl, close }) => {
    const { openModal } = useStateContext()

    const open = Boolean(anchorEl);
    const id = open ? "eventSettingPop" : undefined;
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
            <div className='w-[150px]' >
                <Link onClick={close} href={`/edit-event/${"12134787"}`} >
                    <p className='text-stone-700 text-[12px] flex items-center cursor-pointer select-none p-[10px] hover:bg-stone-200 transition-all border-b border-stone-300'>
                        <EditIcon className='scale-[.6]' />
                        Edit
                    </p>
                </Link>

                <p onClick={() => { openModal("deleteEvent"); close(); }} className='text-stone-700 text-[12px] flex items-center cursor-pointer select-none p-[10px] hover:bg-stone-200 transition-all'>
                    <DeleteIcon className='scale-[.7]' />
                    Delete
                </p>



            </div>
        </Popover>
    )
}

export default EventCardSettingModal