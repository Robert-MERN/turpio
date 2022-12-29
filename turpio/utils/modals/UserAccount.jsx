import React from 'react'
import Popover from '@mui/material/Popover';
import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LinkIcon from '@mui/icons-material/Link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useStateContext from '../../context/ContextProvider';

const UserAccount = ({ anchorEl, close }) => {
    const { openModal } = useStateContext()

    const open = Boolean(anchorEl);
    const id = open ? "userAccountPop" : undefined;
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
            <div className='w-[250px]' >

                <Link onClick={close} href="/profile/muneeb" >
                    <p className='text-stone-700 text-[14px] flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-200 transition-all'>
                        <ManageAccountsIcon className='scale-[.8]' />
                        Account Settings
                    </p>
                </Link>

                <p onClick={close} className='text-stone-700 text-[14px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-200 transition-all'>
                    <LinkIcon className='scale-[.8]' />
                    Share Your Link
                </p>
                <Link onClick={close} href="/admin" >
                    <p className='text-stone-700 text-[14px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-200 transition-all'>
                        <AdminPanelSettingsIcon className='scale-[.8]' />
                        Admin Management
                    </p>
                </Link>


                <div onClick={() => { openModal("logout"); close() }} className='px-[10px] py-[12px] border-t border-stone-300 hover:bg-stone-200 transition-all' >
                    <p className='flex items-center gap-2 text-stone-700 text-[14px] cursor-pointer select-none' >
                        <LogoutIcon className='scale-[.8]' />
                        Logout
                    </p>
                </div>
            </div>

        </Popover>
    )
}

export default UserAccount