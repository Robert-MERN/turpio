import React, { useTransition, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import TimesSelect from './TimesSelect'
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EventCopyTimeModal from "../../utils/modals/EventCopyTimeModal";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import useStateContext from '../../context/ContextProvider';

const AvailableTimes = ({ day }) => {
    const { availableTime, setAvailableTime } = useStateContext();
    const [isPending, startTranstion] = useTransition();
    const [accountBtnHover, setAccountBtnHover] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);


    const handleCopyTimetPop = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCheckBox = (e) => {
        startTranstion(() => {
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
                    checked: e.target.checked
                }
            }));
        })
    }
    return (
        <div className='w-full py-[20px] border h-fit px-[55px]' >
            <div className='w-full flex justify-between' >
                <div className='flex items-start gap-6' >
                    <div className='flex items-center w-[75px]' >
                        <Checkbox
                            onChange={e => handleCheckBox(e)}
                            checked={availableTime[day].checked}
                        />
                        <p className='font-medium text-stone-700' >{day}</p>
                    </div>
                    <div className='flex flex-col gap-2 justify-center h-full' >
                        {availableTime[day].checked ?
                            <TimesSelect day={day} />
                            :
                            <p className='text-[15px] text-stone-500' >Unavailable</p>
                        }
                    </div>
                </div>
                <div className='flex items-start' >
                    <Tooltip
                        title={`Copy times for ${day}`}
                        placement="top"
                        TransitionComponent={Zoom}

                    >
                        <IconButton
                            onClick={handleCopyTimetPop}
                            aria-describedby='eventTimeCopyModal'
                        >
                            <ContentCopyIcon className='scale-[.80] text-stone-600' />
                        </IconButton>
                    </Tooltip>
                    <EventCopyTimeModal
                        anchorEl={anchorEl}
                        day={day}
                        close={() => setAnchorEl(null)}
                    />
                </div>
            </div>
            {availableTime[day].time1.hour24 >= availableTime[day].time2.hour24 &&
                <p className='text-red-500 text-[14px]' >Time is overlapping</p>
            }
        </div>


    )
}

export default AvailableTimes