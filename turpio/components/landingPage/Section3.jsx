import React from 'react'
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import section3Theme from "../../public/images/barber.jpg"




const Section3 = () => {
    return (
        <div className='w-screen h-fit flex justify-center px-[12px]' >
            <div className='flex flex-col items-center lg:w-[1200px] w-full' >

                <div className='flex flex-col-reverse lg:flex-row w-full h-[65vh]' >

                    <div className='flex-1 flex justify-center items-start' >

                        <Image
                            alt='illustration3'
                            src={section3Theme}
                            className="w-full h-full object-contain"
                        />

                    </div>
                    <div className='flex-1  lg:pl-20 flex flex-col justify-center'>
                        <div className='mb-6 lg:mb-8' >
                            <h1 className={`text-stone-800 text-[36px] lg:text-[40px] leading-tight font-medium whitespace-normal`} >
                                Schedule as a team
                            </h1>
                        </div>
                        <p className={`text-gray-500 text-[19px] lg:text-[24px] leading-tight  mb-10`}>
                            Turpio adapts to both you and your team's scheduling preferences. Co-host a client call with a colleague, email reminders and follow-ups, and integrate everything with your preferred software tools.
                        </p>
                        <button className='flex items-center gap-2 text-violet-700 rounded-full text-[20px] hover:text-stone-800 transition-all duration-300' >
                            Learn more
                            <ArrowForwardIcon />
                        </button>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Section3