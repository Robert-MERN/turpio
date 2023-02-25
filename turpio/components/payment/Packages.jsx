import React, { useState } from 'react'
import Script from "next/script";
import Head from 'next/head';
import useStateContext from '../../context/ContextProvider';
import { toast } from 'react-toastify';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { setCookie } from 'cookies-next';
const stripePromise = loadStripe("pk_test_51KBHbCEX6KF8JVGhEXMaBK9xdHMIFvDPIVZDCYEFkFzjNMRSWRXxEJcY4qL4JyUNvl7OFy50Xasl1HdRUKlEDuej00iI4w9m0G");


const Packages = () => {
    const { openModal, setAPIloading } = useStateContext()
    const [subscriptionPlan, setSubscriptionPlan] = useState({
        planName: "",
        amount: Number,
    });
    const [hoverPackage, setHoverPackage] = useState(false);
    const [hoverPackage2, setHoverPackage2] = useState(true);

    const toastConfig = {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        toastId: "toast-paymentFailure"
    }

    const features = [
        "Unlimitied Customers",
        "Analytical reports",
        "Chat support",
        "Unlimitied Emails",
        "SEO Support",
    ]

    const handleSubscribe = (planName, amount) => {
        if (subscriptionPlan.planName !== planName) {
            setSubscriptionPlan({ planName, amount });
            return;
        }
        setSubscriptionPlan({
            planName: "",
            amount: Number,
        });
    }

    const nextBtn = async () => {
        setAPIloading(true);
        try {
            const stripe = await stripePromise;
            const response = await axios.post('/api/stripePayment', {
                price: subscriptionPlan.amount,
                packageName: subscriptionPlan.planName,
            });
            const sessionId = response.data.sessionId;
            // const expiry date of cookie
            const expireTime = new Date(new Date().setHours(new Date().getHours() + 10))
            setCookie("subscriptionPlan", subscriptionPlan, { expires: expireTime });
            await stripe.redirectToCheckout({
                sessionId: sessionId,
            });
        } catch (err) {
            if (err.response.data.message) {
                toast.error(err.response.data.message, toastConfig)
            } else {
                toast.error("Payment failed!", toastConfig)
            }
        } finally {
            setAPIloading(false);
        }
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
                            <p className='text-[15px] text-stone-700' >Choose your Subscription plan?</p>
                            <p className='text-[13px] text-stone-500' >{subscriptionPlan.planName || "No Plan"}</p>
                        </div>
                    </div>
                    <div className='flex gap-3' >
                        <button onClick={() => openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>

                        <button
                            disabled={!Boolean(subscriptionPlan.planName)}
                            onClick={nextBtn}
                            className={`border text-[14px] rounded-full w-[70px] h-[35px] text-white grid place-items-center transition-all ${subscriptionPlan.planName ? "bg-violet-600 hover:opacity-80" : "bg-violet-300"}`}
                        >
                            Next
                        </button>

                    </div>
                </div>

                {/* body */}
                <h1 className='text-[20px] text-stone-600 font-semibold text-center ' >Choose your Subscription plan.</h1>
                <div className='w-full flex gap-20  items-center justify-center' >
                    <div
                        onMouseOver={() => {
                            setHoverPackage(true);
                            subscriptionPlan.planName !== "$60/ Yearly Plan" && setHoverPackage2(false)
                        }}
                        onMouseLeave={() => {
                            subscriptionPlan.planName !== "$8/ Monthly Plan" && setHoverPackage(false);
                            subscriptionPlan.planName !== "$60/ Yearly Plan" && setHoverPackage2(false);
                        }}
                        className={`${hoverPackage ? "bg-zinc-700 " : "bg-zinc-100"} w-[240px] h-[400px] flex flex-col justify-between rounded-2xl  border-stone-300 border px-[30px] py-[20px] transition-all cursor-default`}
                    >
                        <h1 className={`${hoverPackage ? "text-zinc-400" : "text-zinc-500"} font-semibold text-[18px] transition-all`} >Popular</h1>
                        <p className={`${hoverPackage ? "text-zinc-500" : "text-zinc-400"}  font-semibold text-[14px] flex items-center gap-1 transition-all`} >
                            <span className={` ${hoverPackage ? "text-zinc-100" : "text-zinc-800"} text-[30px] font-mono transition-all`} >$8</span>
                            / Month
                        </p>
                        <p className={`${hoverPackage ? "text-zinc-400" : "text-zinc-600"} font-semibold text-[12px] transition-all`} >
                            Get out starter plan for getting small scale services
                        </p>
                        <div>
                            {features.map((feature, index) => (
                                <p key={index} className={`${hoverPackage ? "text-zinc-300" : "text-zinc-600"} flex items-center text-[14px] gap-2 my-1 font-semibold transition-all`} >
                                    <CheckCircleRoundedIcon className='scale-[.8]' />
                                    {feature}
                                </p>
                            ))
                            }
                        </div>

                        <button
                            onClick={() => handleSubscribe("$8/ Monthly Plan", 800)}
                            className={`${hoverPackage ? "text-zinc-700 bg-white" : "bg-zinc-700 text-zinc-200"}  hover:bg-zinc-300  rounded-md w-full text-[14px] py-[5px] font-semibold mt-4 transition-all`}
                        >
                            {subscriptionPlan.planName === "$8/ Monthly Plan" ?
                                "Unsubscribe"
                                :
                                "Subscribe"
                            }
                        </button>

                    </div>
                    <div
                        onMouseOver={() => {
                            setHoverPackage2(true);
                            subscriptionPlan.planName !== "$8/ Monthly Plan" && setHoverPackage(false);
                        }}
                        onMouseLeave={() => {
                            subscriptionPlan.planName !== "$60/ Yearly Plan" && setHoverPackage2(false);
                            subscriptionPlan.planName !== "$8/ Monthly Plan" && setHoverPackage(false);
                        }}
                        className={`${hoverPackage2 ? "bg-zinc-700 " : "bg-zinc-100"} w-[240px] h-[400px] flex flex-col justify-between rounded-2xl  border-stone-300 border px-[30px] py-[20px] transition-all cursor-default`}
                    >
                        <h1 className={`${hoverPackage2 ? "text-zinc-400" : "text-zinc-500"} font-semibold text-[18px] transition-all`} >Enterprice</h1>
                        <p className={`${hoverPackage2 ? "text-zinc-500" : "text-zinc-400"}  font-semibold text-[14px] flex items-center gap-1 transition-all`} >
                            <span className={` ${hoverPackage2 ? "text-zinc-100" : "text-zinc-800"} text-[30px] transition-all`} >$60</span>
                            / Year
                        </p>
                        <p className={`${hoverPackage2 ? "text-zinc-400" : "text-zinc-600"} font-semibold text-[12px] transition-all`} >
                            Get out starter plan for getting small scale services
                        </p>
                        <div>
                            {features.map((feature, index) => (
                                <p key={index} className={`${hoverPackage2 ? "text-zinc-300" : "text-zinc-600"} flex items-center text-[14px] gap-2 my-1 font-semibold transition-all`} >
                                    <CheckCircleRoundedIcon className='scale-[.8]' />
                                    {feature}
                                </p>
                            ))
                            }
                        </div>

                        <button
                            onClick={() => handleSubscribe("$60/ Yearly Plan", 6000)}
                            className={`${hoverPackage2 ? "text-zinc-700 bg-white" : "bg-zinc-700 text-zinc-200"}  hover:bg-zinc-300  rounded-md w-full text-[14px] py-[5px] font-semibold mt-4 transition-all`}
                        >
                            {subscriptionPlan.planName === "$60/ Yearly Plan" ?
                                "Unsubscribe"
                                :
                                "Subscribe"
                            }
                        </button>

                    </div>
                </div>


                {/* footer */}
                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button onClick={() => openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button
                            disabled={!Boolean(subscriptionPlan.planName)}
                            onClick={nextBtn}
                            className={`border text-[14px] rounded-full w-[70px] h-[35px] text-white grid place-items-center transition-all ${subscriptionPlan.planName ? "bg-violet-600 hover:opacity-80" : "bg-violet-300"}`}
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>



        </div >
    )
}

export default Packages