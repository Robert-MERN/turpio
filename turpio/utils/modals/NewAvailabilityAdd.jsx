import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import useStateContext from '../../context/ContextProvider';
import TextField from '@mui/material/TextField';

const NewAvailabilityAdd = ({ open, close }) => {
    const { addSchedule } = useStateContext();
    const defaultValues = {
        scheduleName: "",
        errors: {
            scheduleName: "",
        }

    }
    const [values, setValues] = useState(defaultValues);
    const validateForm = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
            case "scheduleName":
                if (!value) {
                    error = "Name your schedule."
                }
                break;
        }
        return error;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }
    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateForm(name, value);
        setValues((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    }

    const handleCreate = () => {
        let errors = {}
        Object.keys(values).forEach(fieldName => {
            const error = validateForm(fieldName, values[fieldName]);
            errors[fieldName] = error
        });

        setValues(prev => ({
            ...prev,
            errors
        }));
        if (Object.values(errors).every(e => !e)) {
            addSchedule(values.scheduleName)
            close("newAvailabilityAdd");
            setValues(defaultValues);
        }
    }
    const closeModal = () => {
        close("newAvailabilityAdd");
        setValues(defaultValues);
    }
    return (
        <Dialog
            open={open}
            onClose={closeModal}
        >
            <div className='w-[400px] p-7 relative flex flex-col gap-10' >
                <div
                    onClick={closeModal}
                    className='absolute right-3 top-2 cursor-pointer select-none'
                >
                    <IconButton >
                        <CloseIcon className='scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>



                <div className='pt-4' >
                    <h1 className='text-[22px] font-bold text-stone-600 mb-4 ' >New Schedule</h1>
                    <label
                        htmlFor=""
                        className={`text-stone-600 text-[13px] font-semibold my-2`}
                    >
                        Schedule name
                    </label>
                    <TextField
                        size="small"
                        className=' w-full'
                        placeholder='Working Hours, Exclusive Hours, etc...'
                        name="scheduleName"
                        error={Boolean(values?.errors?.scheduleName)}
                        helperText={values?.errors?.scheduleName}
                        value={values?.scheduleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                </div>



                <div className='w-full flex justify-between gap-4' >

                    <button
                        onClick={closeModal}
                        className='border px-12 py-[8px] rounded-full text-red-500 hover:text-white border-red-500 hover:bg-red-500 active:bg-red-400 text-[15px] transition-all'
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className='bg-violet-600 hover:bg-violet-500 px-12 py-[8px] rounded-full text-white text-[15px] transition-all'
                    >
                        Add
                    </button>

                </div>
            </div>
        </Dialog >
    )
}

export default NewAvailabilityAdd