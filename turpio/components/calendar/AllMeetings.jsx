import React from 'react'
import styles from "../../styles/Home.module.css"
import EventCardForInvitee from "../eventBox/EventCardForInvitee";

const AllMeetings = () => {
    return (
        <div className='w-screen flex justify-center pb-14' >
            <div className={`w-[900px] h-[70vh] flex shadow-default rounded-md mt-24 transition-all duration-300`} >
                <div className={`flex-1 overflow-auto ${styles.scrollBar}`} >
                    <div className='w-full p-4 flex flex-col items-center gap-3 border-b border-stone-300' >
                        <p className='text-[17px] font-bold text-stone-600 text-center' >Safeer aur muneeb</p>
                        <p className='text-[15px] text-gray-400 text-center w-[300px] leading-tight' >
                            Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
                        </p>
                    </div>
                    <div className='px-8 py-4 grid grid-cols-2  overflow-auto place-items-center gap-4' >
                        <EventCardForInvitee
                            title={"Tesla Meeting"}
                            color={"violet-400"}
                            time={"45 min, one-on-one"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllMeetings