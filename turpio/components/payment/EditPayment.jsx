import React from 'react'
import Script from "next/script";
import Head from 'next/head';

const EditPayment = ({ nextLink, editEvent, setEditEvent }) => {
    return (

        <div className='w-[1000px] shadow-default rounded-md bg-white border-2 border-violet-600 flex flex-col justify-between' >
            <Head>
                <Script src="https://secure.paguelofacil.com/HostedFields/vendor/scripts/WALLET/PFScript.js" ></Script>
            </Head>
            {/* head */}
            <div onClick={setEditEvent} className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px] cursor-pointer select-none' >
                <div className='flex gap-3' >
                    <div className={`w-[22px] h-[22px] rounded-full bg-violet-700`} ></div>
                    <div>
                        <p className='text-[15px] text-stone-700' >Collect Payment</p>
                        <p className='text-[13px] text-stone-500' >No Payment Method</p>
                    </div>
                </div>
                {editEvent &&
                    <div className='flex gap-3' >
                        <button className=' text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button className='border text-[14px] bg-violet-700 rounded-full w-[110px] h-[35px] text-white grid place-items-center' >Save & Close</button>
                    </div>
                }
            </div>

            
            {/* footer */}
            {editEvent &&
                <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
                    <div className='flex gap-3' >
                        <button className='border text-[15px] text-stone-600 hover:underline' >Cancel</button>
                        <button className={`border text-[14px] bg-violet-600 rounded-full w-[110px] h-[35px] text-white grid place-items-center hover:opacity-80 transition-all`} >Save & Close</button>
                    </div>


                </div>
            }
        </div>

    )
}

export default EditPayment