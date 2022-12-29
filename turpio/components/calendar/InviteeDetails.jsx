import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@mui/material/TextField';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/router";

const InviteeDetails = () => {
    const handleOnChange = (value) => {
        console.log(value)
    }
    const router = useRouter();
    const nextPage = () => {
        router.push({
            pathname: `/schedule/${"safeer"}/confirmed`,
            query: {
                data: "",
            }
        }, `/schedule/${"safeer"}/confirmed`)
    }
    const backPage = ()=>{
        router.push(`/schedule/${"safeer"}/select-date`)
    }
    return (
        <div className='w-screen flex justify-center pb-14' >
            <div className={`w-[900px] h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >

                {/* meeting details */}
                <div className='flex-1 border-r border-stone-200 p-6' >
                    <IconButton onClick={backPage} className='text-blue-500 mb-6' >
                        <ArrowBackIcon className='scale-[1.2] text-blue-500' />
                    </IconButton>
                    <p className='font-bold text-zinc-500' >
                        Elon musk
                    </p>
                    <p className='font-bold text-[28px] text-stone-700 mb-4' >
                        Tesla Sales Meeting
                    </p>
                    <p className='flex items-center gap-2 mt-3 text-stone-600' >
                        <AccessTimeIcon />
                        15 min
                    </p>
                    <p className='flex items-center gap-2 mt-3 text-stone-600'>
                        <CallIcon />
                        Phone call
                    </p>
                </div>

                {/* invitee's details */}
                <div className="flex-[1.3] p-6">
                    <p className='font-bold text-[22px] text-stone-700 mb-6' >
                        Enter Details
                    </p>
                    <div className='w-full flex flex-col gap-6' >

                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Name
                            </label>
                            <TextField
                                className='w-full mt-2'
                                id="name"
                                placeholder="Name"
                                size='small'

                            />
                        </div>

                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Email
                            </label>
                            <TextField
                                className='w-full mt-2'
                                id="name"
                                placeholder="Email"
                                size='small'

                            />
                        </div>

                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Phone number
                            </label>

                            <MuiPhoneNumber
                                className='w-full mt-2'
                                onChange={handleOnChange}
                                variant='outlined' size='small'
                                defaultCountry={'us'}
                            />
                        </div>

                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Please share anything that will help prepare for our meeting.
                            </label>

                            <TextField
                                id="outlined-multiline-static"
                                className='w-full mt-2'
                                multiline
                                rows={3}
                                size="small"
                            />
                        </div>

                        <div className='w-full mt-4' >
                            <button
                                className='bg-violet-600 hover:bg-violet-500 active:bg-violet-400 px-8 py-[10px] rounded-full text-white font-medium text-[16px] transition-all duration-200'
                                onClick={nextPage}
                            >
                                Schedule event
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default InviteeDetails