import React, { useEffect } from 'react'
import Script from "next/script";
import Head from 'next/head';
import useStateContext from '../../context/ContextProvider';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';




const PaymentSuccess = () => {
    const { handleUpdateUserAPI, cookieUser } = useStateContext()
    const router = useRouter();

    useEffect(() => {
        const cookie = getCookie("subscriptionPlan");
        if (cookie && cookieUser) {
            const subscription = JSON.parse(cookie);
            if (subscription.planName === "$8/ Monthly Plan") {
                handleUpdateUserAPI({ subscription: { status: "monthly", date: new Date() } });
            } else {
                handleUpdateUserAPI({ subscription: { status: "yearly", date: new Date() } });
            }
        }
    }, [cookieUser]);

    const nextBtn = () => {
        router.push("/event/type");
    }






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
                            <p className='text-[15px] text-stone-700' >Thank you for subscribing plan.</p>
                        </div>
                    </div>
                    <div className='flex gap-3' >
                        <button
                            onClick={nextBtn}
                            className={`border text-[14px] rounded-full px-[30px] py-[6px] text-white grid place-items-center transition-all bg-violet-600 hover:opacity-80`}
                        >
                            Explore
                        </button>

                    </div>
                </div>

                {/* body */}
                <div>

                    <h1 className='text-[20px] text-stone-600 font-semibold text-center mb-8' >You've successfuly subscribed a yearly plan. To use the features click on this "Use" button.</h1>
                    <div className='w-full flex items-center justify-center' >
                        <button
                            onClick={nextBtn}
                            className='px-[65px] py-[8px] text-[16px] font-semibold bg-violet-600 text-white rounded-full transition-all w-fit hover:opacity-80' >Use features</button>
                    </div>
                </div>


                {/* footer */}
                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button
                            onClick={nextBtn}
                            className={`border text-[14px] rounded-full px-[30px] py-[6px] text-white grid place-items-center transition-all bg-violet-600 hover:opacity-80`}
                        >
                            Explore
                        </button>

                    </div>
                </div>
            </div>



        </div >
    )
}

export default PaymentSuccess