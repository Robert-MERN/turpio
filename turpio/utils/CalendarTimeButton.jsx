import React from 'react'
import { useRouter } from 'next/router'

const CalendarTimeButton = ({ time, selected, setSelected }) => {
    const router = useRouter();
    const nextPage = () => {
        router.push({
            pathname: `/schedule/${"safeer"}/booking-detail`,
            query: {
                data: "",
            }
        }, `/schedule/${"safeer"}/booking-detail`)
    }

    return (
        <div
            onClick={() => setSelected(time)}
            className={`flex items-center w-full transition-all my-3 cursor-pointer select-none
                                  ${selected === time ? "gap-2" : "gap-0"}`}
        >

            <button
                className={`font-medium text-[16px] py-3 rounded-md border-2 w-full transition-all duration-400 select-none

                     ${selected !== time ?
                        "bg-white  text-blue-600  border-blue-400 hover:border-blue-800 hover:text-blue-800 cursor-pointer"
                        :
                        "bg-stone-600 text-white border-transparent cursor-default"}`}
            >
                {time}
            </button>

            <button
                onClick={nextPage}
                className={` bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white 
                                       font-medium text-[16px] rounded-md border-2 py-3  transition-all duration-300 select-none
                                      ${selected === time ? "translate-x-0 w-full" : "translate-x-full w-[0px] opacity-0"}`}
            >
                Confirm
            </button>


        </div>
    )
}

export default CalendarTimeButton