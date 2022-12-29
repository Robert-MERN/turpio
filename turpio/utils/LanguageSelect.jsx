import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useStateContext from '../context/ContextProvider';

const LanguageSelect = () => {
    const { language, setLanguage } = useStateContext();
    return (
        <div className='w-screen flex justify-center' >
            <div className='w-[1200px] pt-8' >
                <FormControl  size='small' variant="standard" className='w-[150px] text-[14px] text-stone-600' >
                    <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className='text-[14px] text-stone-600'
                    >
                        <MenuItem value="english" className='capitalize text-[14px] text-stone-500' >English</MenuItem>
                        <MenuItem value="spanish" className='capitalize text-[14px] text-stone-500' >Spanish</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default LanguageSelect