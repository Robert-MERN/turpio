import React, { useTransition, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import times from '../../utils/time';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import useStateContext from '../../context/ContextProvider';



const TimesSelect = ({ day, availableTime, setAvailableTime, tab }) => {
    const { setUpdateAvailabilityStatus, setUpdateAvailabilityError, updateAvailabilityError } = useStateContext();

    const ITEM_HEIGHT = 40;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        disableScrollLock: true,
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };



    const Hour12Convert = (time) => {
        return new Date(new Date().setHours(time.split(":")[0], time.split(":")[1])).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
    }


    const [isPending, startTransition] = useTransition();
    const [isPending2, startTransition2] = useTransition();

    const [errorName, setErrorName] = useState("");


    const handletimeSlotsChanged = (e, key) => {
        startTransition(() => {
            setUpdateAvailabilityStatus(tab);
            setAvailableTime(prev => (
                {
                    ...prev,
                    [day]: {
                        ...prev[day],
                        [key]: {
                            hour12: Hour12Convert(e.target.value),
                            hour24: e.target.value,
                        }
                    }
                }));

            // checking if there is error
            if (e.target.value >= availableTime[day].time2.hour24) {
                if (updateAvailabilityError.every(each => each !== errorName)) {
                    setUpdateAvailabilityError(prev => ([...prev, "timeOverlap" + (prev.length + 1)]));
                    setErrorName("timeOverlap" + (updateAvailabilityError.length + 1));
                }
            } else {
                const editErrorArray = [...updateAvailabilityError];
                setUpdateAvailabilityError(editErrorArray.filter(each => each !== errorName));
            }
        })
    }

    const handletimeSlotsChanged2 = (e, key) => {
        startTransition2(() => {
            setUpdateAvailabilityStatus(tab);
            setAvailableTime(prev => (
                {
                    ...prev,
                    [day]: {
                        ...prev[day],
                        [key]: {
                            hour12: Hour12Convert(e.target.value),
                            hour24: e.target.value,
                        }
                    }
                }));

            // checking if there is error
            if (availableTime[day].time1.hour24 >= e.target.value) {
                if (updateAvailabilityError.every(each => each !== errorName)) {
                    setUpdateAvailabilityError(prev => ([...prev, "timeOverlap" + (prev.length + 1)]));
                    setErrorName("timeOverlap" + (updateAvailabilityError.length + 1));
                }
            } else {
                const editErrorArray = [...updateAvailabilityError];
                setUpdateAvailabilityError(editErrorArray.filter(each => each !== errorName));
            }
        })
    }

    const deleteTime = () => {
        startTransition(() => {

            setUpdateAvailabilityStatus(tab);
            setAvailableTime(prev => ({
                ...prev, [day]: {
                    time1: {
                        hour12: "09:00 AM",
                        hour24: "09:00",
                    },
                    time2: {
                        hour12: "05:00 PM",
                        hour24: "17:00",
                    },
                    checked: false
                }
            }));
        })
    }
    return (
        <div className='flex items-center gap-3' >
            <FormControl size='small' className='w-fit'>
                <Select
                    className=''
                    MenuProps={MenuProps}
                    value={isPending ? "" : availableTime[day].time1.hour24}
                    onChange={e => handletimeSlotsChanged(e, "time1")}
                >
                    {times.map((i, index) => (
                        <MenuItem key={index} value={i}>
                            {
                                Hour12Convert(i)
                            }
                        </MenuItem>
                    ))

                    }
                </Select>
            </FormControl>
            <p className='font-bold text-stone-400' >-</p>

            <FormControl size='small' className='w-fit'>
                <Select
                    className=''
                    MenuProps={MenuProps}
                    value={isPending2 ? "" : availableTime[day].time2.hour24}
                    onChange={e => handletimeSlotsChanged2(e, "time2")}
                >
                    {times.map((i, index) => (
                        <MenuItem key={index} value={i}>
                            {
                                Hour12Convert(i)
                            }
                        </MenuItem>
                    ))

                    }
                </Select>
            </FormControl>

            <IconButton onClick={deleteTime}>
                <DeleteIcon />
            </IconButton>

        </div>
    )
}

export default TimesSelect