import React, { useState, useEffect, useTransition } from 'react'
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

import { Data } from "./timezoneName";
import useStateContext from '../context/ContextProvider';


const TimeZoneSelect = ({ ID, anchorEl, popoverName, close }) => {

    const { timeZone, isPending2, setSelectedZone, selectedZone } = useStateContext();


    const open = Boolean(anchorEl[popoverName]);
    const id = open ? ID : undefined;

    const [isPending, startTransition] = useTransition();

    const [searchKeyWords, setSearchKeyWords] = useState("");
    const [highlightZone, sethighlightZone] = useState("");
    const [searchTimeZone, setSearchTimeZone] = useState([]);

    const handleSearch = (e) => {
        setSearchKeyWords(e.target.value);
        startTransition(() => {
            setSearchTimeZone(Data.filter((i) => {
                return i.countryName.toLowerCase().includes(e.target.value.toLowerCase()) || i.zoneName.toLowerCase().includes(e.target.value.toLowerCase());
            }))
        })

    }
    useEffect(() => {
        if (!isPending2) {

            if (open) {
                setTimeout(() => {
                    document.getElementById(selectedZone.zoneName).scrollIntoView({ behavior: "auto" });
                    sethighlightZone(selectedZone.zoneName);
                }, 1);
            }
        }
    }, [isPending2]);
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl[popoverName]}
            onClose={() => close(popoverName)}
            className=""
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div className='w-[400px] h-fit border-t-2' >
                <div className='py-2 px-5' >
                    <TextField
                        id="outlined-basic"
                        className='w-full'
                        variant="outlined"
                        value={searchKeyWords}
                        size='small'
                        placeholder="Search..."
                        onChange={handleSearch}
                    />
                </div>
                <div className='overflow-y-auto h-[260px] mt-4' >
                    <p className='px-6 py-2 text-stone-900 text-[11px] font-bold uppercase' >Time Zone</p>
                    {searchKeyWords ?
                        isPending ?
                            <p className='text-stone-400 text-[13px] px-6' >Loading...</p>
                            :
                            <>
                                {
                                    searchTimeZone.map((item, index) => (
                                        <div
                                            id={item.zoneName}
                                            onClick={() => {
                                                setSelectedZone(item);
                                                sethighlightZone(item.zoneName);
                                                close(popoverName);
                                            }}
                                            key={index}
                                            className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                        >
                                            <p>{item.zoneName}</p>
                                            <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                        </div>
                                    ))
                                }
                            </>
                        :
                        <>
                            {isPending || isPending2 ?
                                <p className='text-stone-400 text-[13px] px-6'>Loading...</p>
                                :
                                <>
                                    <p className='px-6 py-1 text-stone-900 text-[14px] font-bold uppercase' >America</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.America.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))

                                    }
                                </>

                            }

                            {isPending || isPending2 ?
                                <p></p>
                                :
                                <>

                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Africa</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Africa.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }
                            {isPending || isPending2 ?
                                <p></p>
                                :
                                <>
                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Antartica</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Antartica.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }


                            {isPending || isPending2 ?
                                <p></p>
                                :
                                <>
                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Asia</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Asia.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }


                            {isPending || isPending2 ?
                                <p></p>
                                :
                                <>
                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Atlantic</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Atlantic.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }

                            {isPending || isPending2 ?
                                <p></p>
                                :

                                <>
                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Europe</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Europe.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }

                            {isPending || isPending2 ?
                                <p></p>
                                :
                                <>
                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Indian</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Indian.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }


                            {isPending || isPending2 ?
                                <p></p>
                                :
                                <>
                                    <p className='px-6 mt-2 py-1 text-stone-900 text-[14px] font-bold uppercase' >Pacific</p>
                                    {Object.values(timeZone).length &&
                                        timeZone.Pacific.map((item, index) => (
                                            <div
                                                id={item.zoneName}
                                                onClick={() => {
                                                    setSelectedZone(item);
                                                    sethighlightZone(item.zoneName);
                                                    close(popoverName);
                                                }}
                                                key={index}
                                                className={`px-6 py-2  ${highlightZone === item.zoneName ? "text-white bg-blue-600 hover:bg-blue-500" : "text-stone-700 bg-white hover:bg-stone-300"} transition-all text-[14px] flex justify-between cursor-pointer`}
                                            >
                                                <p>{item.zoneName}</p>
                                                <p>{new Date().toLocaleString("en-US", { timeZone: item.zoneName, hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                        ))
                                    }
                                </>
                            }


                        </>

                    }
                </div>
            </div>
        </Popover>
    )
}

export default TimeZoneSelect