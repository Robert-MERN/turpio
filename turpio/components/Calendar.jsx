import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import useStateContext from '../context/ContextProvider';

const Calendar = ({ value, setValue, openThird, cookingTimeArray, settimesArray, transition, setTtimeID, timeID }) => {

    const { selectedZone, availableTime, setAvailableTime, selectedAvailableTime, setSelectedAvailableTime } = useStateContext();
    const [isTimeStart, setIsTimeStart] = useState(false);


    return (
        <div className='w-full' >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={value}
                    disablePast={true}
                    shouldDisableYear={() => true}
                    shouldDisableMonth={() => true}
                    views={['day']}
                    maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
                    onChange={(newValue) => {
                        setValue(newValue);
                        openThird(true);
                        setSelectedAvailableTime("");
                        if (new Date().getDate() === newValue["$D"]) {
                            setIsTimeStart(true);
                            setTtimeID(setInterval(() => {
                                transition(() => {
                                    settimesArray(cookingTimeArray(
                                        newValue["$d"]?.toString().split(" ")[0] || new Date().toLocaleString("en-US", { weekday: "short" }),
                                        availableTime,
                                        30,
                                        selectedZone.zoneName,
                                        selectedZone.zoneName,
                                        newValue["$D"],
                                        newValue["$M"]
                                    ))
                                })

                            }, 1000));
                        } else {
                            settimesArray(cookingTimeArray(
                                newValue["$d"]?.toString().split(" ")[0] || new Date().toLocaleString("en-US", { weekday: "short" }),
                                availableTime,
                                30,
                                selectedZone.zoneName,
                                selectedZone.zoneName,
                                newValue["$D"],
                                newValue["$M"]
                            ))
                        }
                        if (isTimeStart) {
                            clearInterval(timeID);
                        }

                    }}
                    renderInput={(params) => <TextField {...params} />}

                />
            </LocalizationProvider>
        </div>
    )
}

export default Calendar