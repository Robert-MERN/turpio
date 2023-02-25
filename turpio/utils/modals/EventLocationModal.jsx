import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { FormHelperText, IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import EventLocationSelect from '../EventLocationSelect';
import useStateContext from '../../context/ContextProvider';
import TextField from '@mui/material/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';


const EventLocationModal = ({ open, close }) => {
  const {
    selectEventLocation,
    finalselectEventLocation,
    setSelectEventLocation,
    setFinalSelectEventLocation,
    setEditEventLocation,
    editEventLocation,
    setEditLocationCancel,
    editLocationCancel,
    setSelectEventLocationValues,
    eventLocationDialogValues: values,
    additionalInfoForInput: additionalInfo,
    eventLocationDialogDefaultValues: defaultValues,
    setEventLocationDialogValues: setvalues,
    setAdditionalInfoForInput: setAdditionalInfo,
  } = useStateContext();







  const validateInput = (parentField, fieldName, value) => {
    let error = '';
    if (parentField === "In-person meeting") {
      switch (fieldName) {
        case "address":
          if (!value) {
            error = "Please mention the address"
          }
          break;
        case "additionalInfo":
          if (!value && additionalInfo) {
            error = "Please add the additional informarion"
          }
          break;
        default:
          break;
      }
    } else if (parentField === "Phone call") {
      switch (fieldName) {
        case 'strategy':
          if (!value) {
            error = "Please choose one of the option"
          }
          break;
        case 'phone':
          if (values[parentField].strategy === "My invitee should call me" && !value) {
            error = "Please put your phone number"
          }
          break;
        default:
          break;
      }

    } else if (parentField === "Custom") {
      switch (fieldName) {
        case "customLocation":
          if (!value) {
            error = "Please enter your custom location"
          }
          break;
        default:
          break;
      }

    }
    return error;

  }

  const handleChange = (mode) => (prop) => (e) => {
    const { name, value } = e.target;
    switch (mode) {
      case "In-person meeting":
        setvalues(prev => ({ ...prev, [mode]: { ...values[mode], [name]: value } }));
        break;
      case "Phone call":
        if (name === "strategy") {
          setvalues(prev => ({ ...prev, [mode]: { ...values[mode], [name]: prop } }));
        } else if (name === "phone") {
          setvalues(prev => ({ ...prev, [mode]: { ...values[mode], [name]: value } }));
        } else {
          setvalues(prev => ({ ...prev, [mode]: { ...values[mode], [name]: value } }));
        }
        break;
      case "Custom":
        setvalues(prev => ({ ...prev, [mode]: { ...values[mode], [name]: value } }));
        break;
      default:
        setvalues(prev => ({ ...prev, [mode]: { ...values[mode], [name]: value } }));
        break;

    }
  }

  const [persistValues, setpersistValues] = useState({})
  const updateLocation = () => {

    let errors = {}
    const { title } = selectEventLocation
    if (values[title]) {
      Object.keys(values[title]).forEach(fieldName => {
        let error = validateInput(title, fieldName, values[title][fieldName]);
        errors[fieldName] = error;
      })
      setvalues(prevState => ({
        ...prevState,
        [title]: {
          ...prevState[title],
          errors
        }
      }));

    } else {
      setvalues(defaultValues);
      setAdditionalInfo(false);
    }

    // checking if errors object is empty or not
    if (Object.values(errors).every(e => !e)) {
      close("eventLocation");
      setEditLocationCancel(selectEventLocation)
      setFinalSelectEventLocation(selectEventLocation);
      setpersistValues(values);
      if (values[title]) {
        const { errors, ...other } = values[title]
        setSelectEventLocationValues({ location: title, ...other });
      } else {
        setSelectEventLocationValues({ location: title });
      }
    }
  }

  const closeLocation = () => {
    close("eventLocation");
    setvalues(persistValues);
    if (!editEventLocation) {
      setvalues(defaultValues);
      setAdditionalInfo(false);
      setSelectEventLocation(null);
      setFinalSelectEventLocation(null);
      setEditLocationCancel(null);
      setSelectEventLocationValues(null);
    } else if (editEventLocation && finalselectEventLocation) {
      setSelectEventLocation(editLocationCancel)
      setFinalSelectEventLocation(editLocationCancel)
    };

    setEditEventLocation(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => close("eventLocation")}
    >
      <div className='w-[400px] p-7 relative flex flex-col gap-10' >
        <div
          onClick={closeLocation}
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
                error={Boolean(values[selectEventLocation?.title]?.errors?.address)}
                helperText={values[selectEventLocation?.title]?.errors?.address}
                name="address"
                onChange={handleChange(selectEventLocation?.title)()}
              />
              {additionalInfo ?
                <TextField
                  id="outlined-multiline-static"
                  className='w-full my-3'
                  multiline
                  name="additionalInfo"
                  error={Boolean(values[selectEventLocation?.title]?.errors?.additionalInfo)}
                  helperText={values[selectEventLocation?.title]?.errors?.additionalInfo}
                  rows={2}
                  onChange={handleChange(selectEventLocation?.title)()}
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
                  <Radio
                    checked={Boolean(values[selectEventLocation?.title]?.strategy === "I will call my invitee")}
                    onChange={handleChange(selectEventLocation?.title)("I will call my invitee")}
                    name="strategy"
                    color='secondary'
                    size='small'
                  />
                  <div className='pt-2'>
                    <p className='text-stone-600 ' >I will call my invitee</p>
                    <p className='text-stone-400 text-[15px] leading-tight' >Turpio will require your invitee's phone number before scheduling</p>
                  </div>
                </div>
                <div className='flex items-start mb-3' >
                  <Radio
                    checked={Boolean(values[selectEventLocation?.title]?.strategy === "My invitee should call me")}
                    onChange={handleChange(selectEventLocation?.title)("My invitee should call me")}
                    name="strategy"
                    color='secondary'
                    size='small'
                  />
                  <div className='pt-2'>
                    <p className='text-stone-600 ' >My invitee should call me</p>
                    <p className='text-stone-400 text-[15px] leading-tight' >Turpio will provide your number after the call has been scheduled.</p>
                  </div>
                </div>
                {values[selectEventLocation?.title]?.errors?.strategy &&
                  <FormHelperText error >{values[selectEventLocation?.title]?.errors?.strategy}</FormHelperText>
                }
                {values[selectEventLocation?.title]?.strategy === "My invitee should call me" &&
                  < div >
                    <MuiPhoneNumber
                      className='w-full mt-2'
                      onChange={e => handleChange("Phone call")()({ target: { name: "phone", value: e } })}
                      variant='outlined'
                      size='small'
                      error={Boolean(values[selectEventLocation?.title]?.errors?.phone)}
                      helperText={values[selectEventLocation?.title]?.errors?.phone}
                      defaultCountry={'us'}
                    />
                  </div>
                }
              </div>
              : selectEventLocation?.title === "Google Meet" || selectEventLocation?.title === "Zoom" ?
                <p className='text-stone-400 text-[13px] leading-tight mt-3' >
                  Conferencing details will be provided upon booking completion.
                </p>

                : selectEventLocation?.title === "Custom" ?
                  <TextField
                    size="small"
                    className='mt-3 w-full'
                    name="customLocation"
                    error={Boolean(values[selectEventLocation?.title]?.errors?.customLocation)}
                    value={values[selectEventLocation?.title]?.customLocation}
                    helperText={values[selectEventLocation?.title]?.errors?.customLocation}
                    onChange={handleChange(selectEventLocation?.title)()}
                  />
                  :
                  // Ask invitee
                  <p className='text-stone-400 text-[15px] mt-3' >
                    Your invitee can type any response which will be used as the location on confirmation.
                  </p>
          }
        </div>



        <div className='w-full flex justify-between gap-4' >

          <button
            onClick={closeLocation}
            className='border px-12 py-[8px] rounded-full text-red-500 hover:text-white border-red-500 hover:bg-red-500 active:bg-red-400 text-[15px] transition-all'
          >
            Cancel
          </button>

          <button
            onClick={updateLocation}
            className='bg-violet-600 hover:bg-violet-500 px-12 py-[8px] rounded-full text-white text-[15px] transition-all'
          >
            Update
          </button>

        </div>
      </div>
    </Dialog >
  )
}

export default EventLocationModal