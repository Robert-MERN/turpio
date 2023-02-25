import React, { useState, useEffect } from 'react'
import AvailableTimes from './AvailableTimes'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import useStateContext from '../../context/ContextProvider';
import { getCookie } from 'cookies-next';
import { TextField } from '@mui/material';
import defaultAvailableTimes from '../../utils/defaultAvailableTimes';


const TeamEventAvailability = ({ nextLink }) => {
  const [colorsForEvent, setColorsForEvent] = useState({})
  useEffect(() => {
    const cookie = getCookie("eventDetails2");
    if (cookie) {
      const { eventColorBG, eventColorBorder } = JSON.parse(cookie);
      setColorsForEvent({ eventColorBG, eventColorBorder });
    }
  }, []);
  const { openModal, handleCreateEventAPI, allSchedule } = useStateContext()

  const [availableTime, setAvailableTime] = useState(defaultAvailableTimes);

  useEffect(() => {
    if (allSchedule) setAvailableTime(allSchedule?.find(each => Object.keys(each)[0] === "Working hours")["Working hours"]);
  }, [allSchedule]);
  const [scheduleSelectName, setScheduleSelectName] = useState("Working hours")
  const handleScheduleChange = (e) => {
    const { value } = e.target
    const oneSchedule = allSchedule?.find(each => Object.keys(each)[0] === value)[value];
    setAvailableTime(oneSchedule);
    setScheduleSelectName(value);
  }

  const [meetingCustomDuration, setMeetingCustomDuration] = useState({
    show: false,
    time: "",
    timeUnit: "hrs",
    errors: {
      time: ""
    }
  });
  const handleCustomDuration = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      setMeetingCustomDuration(prev => ({ ...prev, [name]: value }))
    } else {
      setMeetingCustomDuration(prev => ({ ...prev, timeUnit: value }))
    }
  }


  const [values, setvalues] = useState({
    eventDuration: 15
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setvalues(prev => ({ ...prev, [name]: value }));
    if (value === "custom") {
      return setMeetingCustomDuration(prev => ({ ...prev, show: true }));
    }
    setMeetingCustomDuration({
      show: false,
      time: "",
      timeUnit: "hrs",
      errors: {
        time: ""
      }
    });
  }

  const validateForm = (unit, value) => {
    let error = ""
    switch (unit) {
      case "hrs":
        if (((value * 60) < 60 || (value * 60) > 720)) {
          error = "Time should range from 1 to 12 hrs"
        }
        break;
      case "min":
        if ((value < 1 || value > 720)) {
          error = "Time should range from 1 to 720 mins"
        }
        break;
    }
    return error;
  }

  const [scheduleSelection, setScheduleSelection] = useState("useAnExistingSchedule");
  const scheduleSwitchHandler = (name) => {
    setScheduleSelection(name);
    if (name === "setCustomHours") {
      setAvailableTime(defaultAvailableTimes);
      return;
    }
    setAvailableTime(allSchedule?.find(each => Object.keys(each)[0] === scheduleSelectName)[scheduleSelectName])
  }

  const nextPage = () => {
    const eventDetails = JSON.parse(getCookie("eventDetails2"));
    let timeInMins = null;
    let errors = {};
    let eventDurationUnit = "hrs";
    const { time, timeUnit } = meetingCustomDuration;
    switch (values.eventDuration) {
      case 'custom':
        const error = validateForm(timeUnit, Number(time))
        errors.time = error
        setMeetingCustomDuration(prev => ({ ...prev, errors }));

        if (timeUnit === "hrs") {
          timeInMins = Number(time) * 60;
          eventDurationUnit = "hrs";
        } else {
          timeInMins = Number(time);
          eventDurationUnit = "min";
        }
        break;
      default:
        timeInMins = values.eventDuration;
        eventDurationUnit = "min";
        break;
    }
    if (Object.values(errors).every(e => !e) && timeInMins) {
      // creating event
      handleCreateEventAPI({
        ...eventDetails,
        eventDuration: timeInMins,
        eventDurationUnit,
        availableTime
      });
    }
  }
  return (
    <div className='w-screen flex justify-center pb-[80px] mt-[80px]' >
      <div className='w-[1000px] shadow-default rounded-md bg-white border-2 border-violet-600 flex flex-col justify-between' >
        {/* head */}
        <div className='border-y border-stone-300 flex justify-between items-center px-[20px] py-[10px]' >
          <div className='flex gap-3' >
            <div className={`w-[22px] h-[22px] rounded-full ${colorsForEvent.eventColorBG || "bg-violet-600"}`} ></div>
            <div>
              <p className='text-[15px] text-stone-700' >When can people book this event?</p>
              <p className='text-[13px] text-stone-500' >{
                values.eventDuration === "custom" ?
                  `${meetingCustomDuration.time} ${meetingCustomDuration.timeUnit}`
                  :
                  `${values.eventDuration} Min`
              }</p>
            </div>
          </div>


          <div className='flex gap-3' >
            <button onClick={() => openModal("discardEvent")} className=' text-[15px] text-stone-600 hover:underline' >Cancel</button>
            <button onClick={nextPage} className='border text-[14px] bg-violet-700 rounded-full w-[70px] h-[35px] text-white grid place-items-center' >Create</button>
          </div>

        </div>


        {/* body */}
        <div className='flex w-full px-[55px] my-10'>
          <div className='flex-1' >
            <label
              htmlFor=""
              className={`text-stone-800 font-bold text-[14px]`}
            >
              Duration
            </label>
            <FormControl
              size='small'
              className='w-full mt-2'
            >
              <Select
                value={values.eventDuration}
                onChange={handleChange}
                name="eventDuration"
              >
                <MenuItem value="15">15 Min</MenuItem>
                <MenuItem value="30">30 Min</MenuItem>
                <MenuItem value="45">45 Min</MenuItem>
                <MenuItem value="60">60 Min</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
            {meetingCustomDuration.show &&

              <div className='flex gap-3 mt-2 items-start' >
                <div className='flex-[2]' >

                  <TextField
                    size='small'
                    className='w-full'
                    error={Boolean(meetingCustomDuration.errors.time)}
                    helperText={meetingCustomDuration.errors.time}
                    type="number"
                    name="time"
                    value={meetingCustomDuration.time}
                    onChange={handleCustomDuration}
                  />
                </div>
                <div className='flex-[1.5]' >

                  <FormControl
                    size='small'
                    className='w-full'

                  >
                    <Select
                      value={meetingCustomDuration.timeUnit}
                      onChange={handleCustomDuration}
                      name="timeUnit"
                    >
                      <MenuItem value="min">Min</MenuItem>
                      <MenuItem value="hrs">Hrs</MenuItem>

                    </Select>
                  </FormControl>
                </div>
              </div>
            }


          </div>
          <div className='flex-1 pl-[30px]' >
            <p className='text-stone-400 text-[15px]' >Define how long your event will be. It can be as long as 12 hours.</p>
          </div>
        </div>
        <div className='flex w-full px-[55px] my-10'>
          <div className='flex-1 flex flex-col gap-6' >
            <div>
              <label
                htmlFor=""
                className={`text-stone-800 font-bold text-[14px]`}
              >
                How do you want to offer your availability for this event type?
              </label>
              <div className='flex gap-4 my-2' >
                <div
                  onClick={() => scheduleSwitchHandler("useAnExistingSchedule")}
                  className={`px-[16px] py-[6px]  border-2 hover:border-blue-700 rounded-md text-stone-700 select-none cursor-pointer transition-all 
                                 ${scheduleSelection === "useAnExistingSchedule" ? "border-blue-600" : "border-stone-300"} `}
                >
                  Use an existing schedule
                </div>
                <div
                  onClick={() => scheduleSwitchHandler("setCustomHours")}
                  className={`px-[16px] py-[6px]  border-2 hover:border-blue-600 rounded-md text-stone-600 select-none cursor-pointer transition-all 
                                ${scheduleSelection === "setCustomHours" ? "border-blue-600" : "border-stone-300"} `}
                >
                  Set custom hours
                </div>
              </div>

            </div>
            {scheduleSelection === "useAnExistingSchedule" &&
              <div>
                <label
                  htmlFor=""
                  className={`text-stone-800 font-bold text-[14px]`}
                >
                  Which schedule do you want to use?
                </label>
                <FormControl
                  size='small'
                  className='w-full mt-2'
                >
                  <Select
                    label=""
                    value={scheduleSelectName}
                    onChange={handleScheduleChange}
                  >
                    {allSchedule &&
                      allSchedule.map((each, index) => (
                        <MenuItem key={index} value={Object.keys(each)[0]}>{Object.keys(each)[0]}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
            }

          </div>
          <div className='flex-1 pl-[30px]' >
            <p className='text-stone-400 text-[15px]' >
              Select one of your schedules or define custom hours specific to this type of event.
            </p>

          </div>
        </div>
        <div className='px-[55px] mb-10' >
          {scheduleSelection === "setCustomHours" ?
            <div className='w-full border border-stone-300 rounded-md' >
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Sun"
              />
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Mon"
              />
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Tue"
              />
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Wed"
              />
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Thu"
              />
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Fri"
              />
              <AvailableTimes
                setAvailableTime={setAvailableTime}
                availableTime={availableTime}
                day="Sat"
              />
            </div>
            :
            <div className='w-full border border-stone-300 rounded-md p-5' >
              <h1 className='text-stone-700 font-bold text-[12px]' >WEEKLY HOURS</h1>
              {/* Sun */}
              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Sun"}</p>
                {availableTime.Sun.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Sun.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Sun.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>


              {/* Monday */}

              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Mon"}</p>
                {availableTime.Mon.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Mon.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Mon.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>


              {/* Tuesday */}

              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Tue"}</p>
                {availableTime.Tue.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Tue.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Tue.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>

              {/* Wednsday */}


              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Wed"}</p>
                {availableTime.Wed.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Wed.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Wed.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>
              {/* Thursday */}


              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Thu"}</p>
                {availableTime.Thu.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Thu.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Thu.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>

              {/* Friday */}

              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Fri"}</p>
                {availableTime.Fri.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Fri.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Fri.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>

              {/* Satuarday */}
              <div className='w-fit flex items-center my-5' >
                <p className='text-stone-700 font-bold uppercase text-[15px] w-[100px]' >{"Sat"}</p>
                {availableTime.Sat.checked ?
                  <div className='flex items-center gap-3' >
                    <p className='text-stone-700 text-[16px]' >{availableTime.Sat.time1.hour12}</p>
                    -
                    <p className='text-stone-700 text-[16px]' >{availableTime.Sat.time2.hour12}</p>
                  </div>
                  :
                  <p className='text-stone-500 text-[16px]' >Not available</p>
                }
              </div>



            </div>
          }
        </div>

        {/* footer */}
        <div className='border-y border-stone-300 flex justify-end items-center px-[20px] py-[10px]' >
          <div className='flex gap-3' >
            <button onClick={() => openModal("discardEvent")} className='text-[15px] text-stone-600 hover:underline' >Cancel</button>
            <button onClick={nextPage} className='border text-[14px] bg-violet-700 rounded-full w-[70px] h-[35px] text-white grid place-items-center' >Create</button>
          </div>

        </div>
      </div>

    </div >
  )
}

export default TeamEventAvailability