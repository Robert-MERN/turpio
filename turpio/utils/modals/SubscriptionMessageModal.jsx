import React from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { deleteCookie, setCookie } from "cookies-next"
import { useRouter } from 'next/router';
import moment from 'moment-timezone';


const SubscriptionMessageModal = ({ open, close, subStatus, restrictedEvent, cookieUser }) => {
    const router = useRouter();
    const handleClick = () => {
        close("subscriptionMessage");
        if (subStatus === "trial") {
            const expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));
            deleteCookie("eventDetails2");
            setCookie("eventDetails1", {
                eventType: restrictedEvent,
                timeZone: moment.tz.guess(),
                userId: cookieUser.id,
                username: cookieUser.username,
                userEmail: cookieUser.email,
                userFullName: cookieUser.fullName,
            }, { expires: expiryDate })
            router.push(`/event/new/${restrictedEvent}`);
        } else if (subStatus === "expired" || subStatus === "no subscription") {
            router.push('/subscription');
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => close("subscriptionMessage")}
        >
            <div className='w-[500px] p-7 relative flex flex-col gap-8' >
                <div onClick={() => close("subscriptionMessage")} className='absolute right-3 top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <p className='text-[16px] text-stone-600 font-medium mt-4' >
                    {subStatus === "no subscription" ?
                        "Your Trial period is over. Please subscribe a Yearly/Monthly Plan to use this feature again."
                        :
                        subStatus === "trial" ?
                            "You're on Trial period. This feature is temporarily available only for 30 days. Subscribing a Yearly/Monthly Plan will enable this features for you. Click on Ignore and continue."
                            :
                            "Your subscription is expired. Please subscribe a Yearly/Monthly Plan to use all features back again."
                    }

                </p>
                <div className='w-full flex justify-end gap-4' >
                    <button onClick={() => close("logout")} className='text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Cancel</button>
                    <button onClick={handleClick} className='bg-stone-600 hover:bg-stone-500 px-4 py-[6px] rounded-md text-white text-[15px] transition-all' >
                        {subStatus === "trial" ?
                            "Ignore"
                            :
                            "Go to subscription"
                        }
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default SubscriptionMessageModal