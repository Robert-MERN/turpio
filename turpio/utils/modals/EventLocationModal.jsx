import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import EventLocationSelect from '../EventLocationSelect';
import useStateContext from '../../context/ContextProvider';
import TextField from '@mui/material/TextField';

const EventLocationModal = ({ open, close }) => {
  const {

    selectEventLocation,
    finalselectEventLocation,
    setSelectEventLocation,
    setFinalSelectEventLocation,
    setEditEventLocation,
    editEventLocation,
    setEditLocationCancel,
    editLocationCancel

  } = useStateContext();

  const [additionalInfo, setAdditionalInfo] = useState(false);


  return (
    <Dialog
      open={open}
      onClose={() => close("eventLocation")}
    >
      <div className='w-[400px] p-7 relative flex flex-col gap-10' >
        <div
          onClick={() => {
            close("eventLocation");
            if (!editEventLocation) {
              setSelectEventLocation(null)
              setFinalSelectEventLocation(null)
            };
            setEditEventLocation(false)
          }}
          className='absolute right-3 top-2 cursor-pointer select-none'
        >
          <IconButton >
            <CloseIcon className='scale-[1.1] text-stone-500' />
          </IconButton>
        </div>



        <div className='pt-4' >
          <h1 className='text-[22px] font-bold text-stone-600 mb-4 px-3' >Edit Location</h1>
          <div className='my-3' >
            <EventLocationSelect />
          </div>
          {selectEventLocation?.title === "In-person meeting" ?
            <>
              <TextField
                size="small"
                className='my-3 w-full'
              />
              {additionalInfo ?
                <TextField
                  id="outlined-multiline-static"
                  className='w-full my-3'
                  multiline
                  rows={2}
                />
                :
                <p onClick={() => setAdditionalInfo(true)} className='text-blue-600 px-3 cursor-pointer select-none hover:underline' >
                  + Include additional information
                </p>

              }
            </>
            : selectEventLocation?.title === "Phone call" ?
              <div>
                <div className='flex items-start mb-3 mt-2' >
                  <Radio color='secondary' size='small' />
                  <div className='pt-2'>
                    <p className='text-stone-600 ' >I will call my invitee</p>
                    <p className='text-stone-400 text-[15px] leading-tight' >Turpio will require your invitee's phone number before scheduling</p>
                  </div>
                </div>
                <div className='flex items-start mb-3' >
                  <Radio color='secondary' size='small' />
                  <div className='pt-2'>
                    <p className='text-stone-600 ' >My invitee should call me</p>
                    <p className='text-stone-400 text-[15px] leading-tight' >Turpio will provide your number after the call has been scheduled.</p>
                  </div>
                </div>
              </div>
              : selectEventLocation?.title === "Google Meet" ?
                <p className='text-stone-400 text-[13px] leading-tight mt-3' >
                  Conferencing details will be provided upon booking completion.
                </p>
                : selectEventLocation?.title === "Zoom" ?
                  <p className='text-stone-400 text-[13px] leading-tight mt-3' >
                    Conferencing details will be provided upon booking completion.
                  </p>
                  : selectEventLocation?.title === "Custom" ?
                    <TextField
                      size="small"
                      className='mt-3 w-full'
                    />
                    :
                    // Ask invitee
                    <p className='text-stone-400 text-[15px] mt-3' >
                      Your invitee can type any response which will be used as the location on confirmation.
                    </p>
          }
        </div>



        <div className='w-full flex justify-between gap-4' >
          <button onClick={() => {
            close("eventLocation");

            if (!editEventLocation) {
              setSelectEventLocation(null)
              setFinalSelectEventLocation(null);
              setEditLocationCancel(null)
            } else if (editEventLocation && finalselectEventLocation) {
              setSelectEventLocation(editLocationCancel)
              setFinalSelectEventLocation(editLocationCancel)
            };

            setEditEventLocation(false)

          }}
            className='border px-12 py-[8px] rounded-full text-red-500 hover:text-white border-red-500 hover:bg-red-500 active:bg-red-400 text-[15px] transition-all' >Cancel</button>
          <button
            onClick={() => {
              close("eventLocation");
              setEditLocationCancel(selectEventLocation)
              setFinalSelectEventLocation(selectEventLocation);

            }}
            className='bg-violet-600 hover:bg-violet-500 px-12 py-[8px] rounded-full text-white text-[15px] transition-all'
          >
            Update
          </button>

        </div>
      </div>
    </Dialog>
  )
}

export default EventLocationModal