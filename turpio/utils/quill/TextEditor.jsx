import React from 'react';
import TextField from '@mui/material/TextField';

const TextEditor = ({ value, setValue }) => {
    return (
        <TextField
            id="outlined-multiline-static"
            className='w-full mt-2 text-[17px]'
            multiline
            value={value}
            onChange={(e) => {
                setValue(prev => ({ ...prev, desc: e.target.value }))
            }}
            placeholder='Write a summary and any details your invitee should know about the event.'
            rows={5}
        />
    )
}


export default TextEditor;