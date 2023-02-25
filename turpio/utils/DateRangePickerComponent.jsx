import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next';
import { FormHelperText, IconButton } from '@mui/material';
import { getTime } from './eventSortFunctions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DateRangePickerComponent = ({ data, timeZone }) => {

    const router = useRouter();
    const { username } = router.query;
    const [value, setvalue] = useState([null, null]);
    const [error, seterror] = useState("");

    const [formState, setformState] = useState({
        guests: 1,
        rooms: 1,
        errors: {
            guests: '',
            rooms: ''
        }
    });

    const addCounter = (fieldName) => () => {
        switch (fieldName) {
            case 'guests':
                if (formState[fieldName] > 11) {
                    let error = 'Guests can only be 12'
                    setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: error } }));
                    setTimeout(() => {
                        setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: '' } }));
                    }, 3000);

                } else {
                    setformState(prev => ({ ...prev, [fieldName]: prev[fieldName] + 1 }));
                }
                break;
            case 'rooms':
                if (formState[fieldName] > 9) {
                    let error = 'Rooms can only be 10'
                    setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: error } }));
                    setTimeout(() => {
                        setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: '' } }));
                    }, 3000);
                } else {
                    setformState(prev => ({ ...prev, [fieldName]: prev[fieldName] + 1 }));
                }
                break;
            default:
                break;
        }

    }

    const minusCounter = (fieldName) => () => {
        switch (fieldName) {
            case 'guests':
                if (formState[fieldName] < 2) {
                    let error = 'Guest should be atleast 1.'
                    setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: error } }));
                    setTimeout(() => {
                        setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: '' } }));
                    }, 3000);

                } else {
                    setformState(prev => ({ ...prev, [fieldName]: prev[fieldName] - 1 }));
                }
                break;
            case 'rooms':
                if (formState[fieldName] < 2) {
                    let error = 'Book atleast 1 room.'
                    setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: error } }));
                    setTimeout(() => {
                        setformState(prev => ({ ...prev, errors: { ...prev.errors, [fieldName]: '' } }));
                    }, 3000);
                } else {
                    setformState(prev => ({ ...prev, [fieldName]: prev[fieldName] - 1 }));
                }
                break;
            default:
                break;
        }

    }

    const getWeeksAfter = (date, amount) => {
        return date ? date.add(amount, 'day') : undefined;
    }

    const validateDate = (dates) => {
        let error = ""
        if (dates.some(i => !i)) {
            error = "Please pick the date"
        } else {
            const date1 = dates[0];
            const date2 = dates[1];
            if (date1 === date2) {
                error = "Start and End Dates can't be same"
            }
        }
        return error;
    }


    const nextPage = () => {
        const errors = validateDate(value);
        seterror(errors);

        if (!errors) {
            // expires in  hours
            const expiry = new Date(new Date().setHours(new Date().getHours() + 5));

            // startTime
            const unReadableDate1 = new Date(value[0]["$d"]);
            const startWeekday = unReadableDate1.toLocaleString("en-US", { weekday: "long" });
            const startDay = unReadableDate1.toLocaleString("en-US", { day: "numeric" });
            const startMonth = unReadableDate1.toLocaleString("en-US", { month: "long" });
            const startYear = unReadableDate1.toLocaleString("en-US", { year: "numeric" });

            // endTime
            const unReadableDate2 = new Date(value[1]["$d"]);
            const endWeekday = unReadableDate2.toLocaleString("en-US", { weekday: "long" });
            const endDay = unReadableDate2.toLocaleString("en-US", { day: "numeric" });
            const endMonth = unReadableDate2.toLocaleString("en-US", { month: "long" });
            const endYear = unReadableDate2.toLocaleString("en-US", { year: "numeric" });

            // 
            setCookie("schedulingEvent", {
                data,
                update: {
                    timeZone,
                    guests: formState.guests,
                    rooms: formState.rooms,
                    date: [
                        { startWeekday, startDay, startMonth, startYear },
                        { endWeekday, endDay, endMonth, endYear },
                    ]
                }

            }, { expires: expiry })
            router.push(`/schedule/${username}/booking-detail/${data.eventLinkName}`)
        }
    }
    console.log(Number(getTime(data).split(" ")[0]))
    return (
        <div>
            <div className='lg:block hidden' >
                <LocalizationProvider
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                    dateAdapter={AdapterDayjs}
                >
                    <DateRangePicker
                        disablePast
                        value={value}
                        maxDate={getWeeksAfter(value[0], Number(getTime(data).split(" ")[0]))}
                        onChange={(newValue) => {
                            setvalue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <div className='flex gap-4 items-center w-full px-6' >
                                <TextField {...startProps} />
                                <p className='my-4 text-[17px] font-medium text-stone-600' >To</p>
                                <TextField {...endProps} />
                            </div>
                        )}
                    />
                </LocalizationProvider>
            </div>

            <div className='block lg:hidden'>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                >
                    <MobileDateRangePicker
                        value={value}
                        onChange={(newValue) => {
                            setvalue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <div className='flex gap-4 items-center w-full px-6' >
                                <TextField {...startProps} />
                                <p className='my-4 text-[17px] font-medium text-stone-600' >To</p>
                                <TextField {...endProps} />
                            </div>
                        )}
                    />
                </LocalizationProvider>
            </div>
            {error &&
                <div className='px-10' >
                    <FormHelperText error>{error}</FormHelperText>
                </div>
            }

            <div className='p-6 flex flex-col gap-3' >
                {/* Guests Counter */}
                <div>

                    <div className='hover:bg-stone-200 pl-4 pr-2 py-1 cursor-default rounded-md' >
                        <div className='flex w-full justify-between items-center' >
                            <p className='text-stone-700 font-medium text-[14px]' >GUESTS</p>
                            <div className='flex items-center' >
                                <IconButton onClick={addCounter("guests")} className='text-stone-500 scale-[.80]' > <AddIcon /> </IconButton>
                                <p className='text-stone-600 font-bold text-[17px]' >{formState.guests}</p>

                                <IconButton onClick={minusCounter("guests")} className='text-stone-500 scale-[.80]' > <RemoveIcon /> </IconButton>
                            </div>
                        </div>
                    </div>
                    {formState.errors.guests &&
                        <div className='px-4' >
                            <FormHelperText error>{formState.errors.guests}</FormHelperText>
                        </div>
                    }
                </div>

                {/* Rooms counter */}
                <div>
                    <div className='hover:bg-stone-200 pl-4 pr-2 py-1 cursor-default rounded-md' >
                        <div className='flex w-full justify-between items-center' >
                            <p className='text-stone-700 font-medium text-[14px]' >ROOMS</p>
                            <div className='flex items-center' >
                                <IconButton onClick={addCounter("rooms")} className='text-stone-500 scale-[.80]' > <AddIcon /> </IconButton>
                                <p className='text-stone-600 font-bold text-[17px]' >{formState.rooms}</p>

                                <IconButton onClick={minusCounter("rooms")} className='text-stone-500 scale-[.80]' > <RemoveIcon /> </IconButton>
                            </div>
                        </div>
                    </div>
                    {formState.errors.rooms &&
                        <div className='px-4' >
                            <FormHelperText error>{formState.errors.rooms}</FormHelperText>
                        </div>
                    }
                </div>

            </div>

            <div className='p-6' >
                <button
                    onClick={nextPage}
                    className={` text-white w-full rounded-md py-3 transition-all font-medium 
                            bg-violet-600 hover:bg-violet-500 active:bg-violet-400 
                          `}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default DateRangePickerComponent