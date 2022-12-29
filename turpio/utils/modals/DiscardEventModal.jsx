import React from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useRouter } from "next/router"
import { toast } from 'react-toastify';

const DiscardEventModal = ({ open, close }) => {
    const router = useRouter();
    const toastConfig = {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        toastId: "toast-discardEvent"
    }
    const discardBtn = () => {
        toast.error("Your have discarded the event!", toastConfig);
        router.push("/home");
        close("discardEvent");
    }
    return (
        <Dialog
            open={open}
            onClose={() => close("discardEvent")}
        >
            <div className='w-[500px] p-7 relative flex flex-col gap-10' >
                <div onClick={() => close("discardEvent")} className='absolute right-3 top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <p className='text-[16px] text-stone-600 font-medium' >Are you sure, do you want to discard?</p>
                <div className='w-full flex justify-end gap-4' >
                    <button
                        onClick={() => {
                            close("discardEvent");
                        }}
                        className='text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all'
                    >Cancel
                    </button>
                    <button onClick={discardBtn}
                        className='bg-stone-600 hover:bg-stone-500 px-4 py-[6px] rounded-md text-white text-[15px] transition-all'
                    >Discard
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default DiscardEventModal