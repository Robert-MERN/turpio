import React from 'react'
import Popover from '@mui/material/Popover';
import Link from "next/link";
import useStateContext from '../../context/ContextProvider';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitchModal = ({ anchorEl, close }) => {
    const { setLanguage } = useStateContext()
    const open = Boolean(anchorEl);
    const id = open ? "languageSwitchModal" : undefined;
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div className='w-[150px]' >
                <p className='text-stone-700 text-[13px] gap-1 font-semibold flex items-center select-none p-[5px]'>
                    <TranslateIcon className='scale-[.6]' />
                    Language
                </p>
                <p
                    onClick={() => {
                        close();
                        setLanguage("English")
                    }}
                    className='text-stone-700 text-[12px] flex items-center cursor-pointer select-none p-[10px] hover:bg-stone-200 transition-all border-b border-stone-300'
                >
                    English
                </p>


                <p
                    onClick={() => {
                        close();
                        setLanguage("Spanish")
                    }}
                    className='text-stone-700 text-[12px] flex items-center cursor-pointer select-none p-[10px] hover:bg-stone-200 transition-all'
                >

                    Spanish
                </p>
            </div>
        </Popover>
    )
}

export default LanguageSwitchModal