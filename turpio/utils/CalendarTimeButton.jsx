import React from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next';

const CalendarTimeButton = ({ time, selected, setSelected, data, timeNotReadable, date, timeZone }) => {
    const router = useRouter();
    const { username } = router.query;
    const nextPage = () => {
        // expires in  hours
        const expiry = new Date(new Date().setHours(new Date().getHours() + 5));
        const time = new Date(timeNotReadable);
        const startTime = new Date(timeNotReadable).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" })
        const endTime = new Date(time.setMinutes(time.getMinutes() + data.eventDuration)).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
        const unReadableDate = new Date(date["$d"]);
        const day = unReadableDate.toLocaleString("en-US", { weekday: "long" });
        const dayNumeric = unReadableDate.toLocaleString("en-US", { day: "numeric" });
        const month = unReadableDate.toLocaleString("en-US", { month: "long" });
        const year = unReadableDate.toLocaleString("en-US", { year: "numeric" });
        setCookie("schedulingEvent", { data, update: { startTime, endTime, day, dayNumeric, month, year, timeZone } }, { expires: expiry })
        router.push(`/schedule/${username}/booking-detail/${data.eventLinkName}`);
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