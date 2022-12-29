import React from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const DeleteEventAskModal = ({ open, close }) => {
    return (
        <Dialog
            open={open}
            onClose={() => close("deleteEvent")}
        >
            <div className='w-[500px] p-7 relative flex flex-col gap-10' >
                <div onClick={() => close("deleteEvent")} className='absolute right-3 top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <p className='text-[16px] text-stone-600 font-medium' >Are you sure, do you want to delete this event?</p>
                <div className='w-full flex justify-end gap-4' >
                    <button onClick={() => close("deleteEvent")} className='text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Cancel</button>
                    <button onClick={() => close("deleteEvent")} className='bg-stone-600 hover:bg-stone-500 px-4 py-[6px] rounded-md text-white text-[15px] transition-all' >Delete</button>
                </div>
            </div>
        </Dialog>
    )
}

export default DeleteEventAskModal