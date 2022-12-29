import React, { useState } from 'react'
import Script from "next/script";
import Head from 'next/head';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@mui/material/Button';
import useStateContext from '../../context/ContextProvider';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const PaymentMethods = () => {
    const { openModal } = useStateContext()
    const [paymentMethod, setPaymentMethod] = useState("");

    const router = useRouter();

    const toastConfig = {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        toastId: "toast-eventcreated"
    }
    const nextBtn = () => {
        toast.success("Your event has been created", toastConfig);
        router.push("/home");
    }

    const buttons = [
        {
            name: " Paypal Method",
            className: "bg-stone-800 hover:bg-stone-700",
            icon: <PaymentIcon />,
        },
        {
            name: "Stripe Method",
            className: "bg-indigo-500 hover:bg-indigo-400",
            icon: <PaymentIcon />,
        },
        {
            name: "Pagor Con Yappy",
            className: "bg-indigo-700 hover:bg-blue-500",
            icon: <PaymentIcon />,
        },
        {
            name: "PagueloFacil",
            className: "bg-green-500 hover:bg-green-400",
            icon: <PaymentIcon />,
        },
    ]

    return (
        <div className='w-screen flex justify-center pb-[80px] mt-[80px]' >
            <Head>
                <Script src="https://secure.paguelofacil.com/HostedFields/vendor/scripts/WALLET/PFScript.js" ></Script>
            </Head>
            <div className='w-[1000px] rounded-md bg-white border-2 border-violet-600 min-h-[650px] flex flex-col justify-between' >
                
                {/* head */}
                <div className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px] cursor-pointer select-none' >
                    <div className='flex gap-3' >
                        <div className={`w-[22px] h-[22px] rounded-full bg-violet-700`} ></div>
                        <div>
                            <p className='text-[15px] text-stone-700' >How would you like to collect the payment?</p>
                            <p className='text-[13px] text-stone-500' >{paymentMethod || "No Payment Method"}</p>
                        </div>
                    </div>
                    <div className='flex gap-3' >
                        <button onClick={() => openModal("discardEvent")} className=' text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button
                            disabled={!Boolean(paymentMethod)}
                            onClick={nextBtn}
                            className={`border text-[14px] rounded-full w-[70px] h-[35px] text-white grid place-items-center transition-all ${paymentMethod ? "bg-violet-600 hover:opacity-80" : "bg-violet-300"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* body */}
                <h1 className='text-[20px] text-stone-600 font-semibold text-center ' >Select one of the following</h1>
                <div className='w-full flex flex-col gap-6  items-center' >
                    {buttons.map((i, index) => (
                        <button
                            key={index}
                            className={`text-white flex items-center gap-3 justify-center rounded-md transition-all duration-300 w-[350px] py-3 font-semibold normal-case text-[16px]  ${i.className}`}
                            onClick={() => setPaymentMethod(i.name)}
                        >
                            {i.icon}
                            {i.name}
                        </button>
                    ))
                    }
                </div>

                {/* footer */}
                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button onClick={() => openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button
                            disabled={!Boolean(paymentMethod)}
                            onClick={nextBtn}
                            className={`border text-[14px] rounded-full w-[70px] h-[35px] text-white grid place-items-center transition-all ${paymentMethod ? "bg-violet-600 hover:opacity-80" : "bg-violet-300"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PaymentMethods