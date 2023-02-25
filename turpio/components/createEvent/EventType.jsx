import React, { useState, useEffect } from 'react'
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import CastleIcon from '@mui/icons-material/Castle';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useRouter } from "next/router";
import { deleteCookie, setCookie } from 'cookies-next';
import useStateContext from '../../context/ContextProvider';
import moment from 'moment-timezone';

const EventType = () => {
    const { cookieUser, handleSubscriptionVerify, subStatus, openModal, setRestrictedEvent } = useStateContext();
    const [subStatusBool, setSubStatusBool] = useState(Boolean(subStatus === "trial" || subStatus === "monthly" || subStatus === "yearly"));
    const router = useRouter();
    const defaultOptions = {
        hoverOpt1: false,
        hoverOpt2: false,
        hoverOpt3: false,
        hoverOpt4: false,
    }
    const [options, setOptions] = useState(defaultOptions);
    const onHover = (name) => {
        setOptions({ ...defaultOptions, [name]: true })
    }
    const onLeave = (name) => {
        setOptions({ ...defaultOptions, [name]: false })
    }

    const navigateToEvent = (name, free) => () => {

        if (free || subStatus === "monthly" || subStatus === "yearly" || cookieUser.isAdmin) {
            const expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));
            deleteCookie("eventDetails2");
            setCookie("eventDetails1", {
                eventType: name,
                timeZone: moment.tz.guess(),
                userId: cookieUser.id,
                username: cookieUser.username,
                userEmail: cookieUser.email,
                userFullName: cookieUser.fullName,
            }, { expires: expiryDate })
            router.push(`/event/new/${name}`);
        } else {
            setRestrictedEvent(name);
            openModal("subscriptionMessage");
        }
    }

    const [preventLoop, setpreventLoop] = useState(false)
    useEffect(() => {
        if (cookieUser && !preventLoop) {
            handleSubscriptionVerify(setpreventLoop);
            if (cookieUser.isAdmin) {
                setSubStatusBool(true);
            }
        }
    }, [cookieUser]);

    const restrictedEventTypes = [
        {
            title: "Hotel Reservation",
            icon: <CastleIcon className={`scale-[1.4] ${subStatusBool ? (options.hoverOpt2 ? "text-violet-600" : "text-stone-700") : "text-stone-300"}`} />,
            goodFor: "Long bookings",
            descFirst: "Hotels ",
            descLast: " various room options",
            link: "hotel-reservation",
            hover: "hoverOpt2"
        },
        {
            title: "Sports fields",
            icon: <SportsVolleyballIcon className={`scale-[1.4] ${subStatusBool ? (options.hoverOpt3 ? "text-violet-600" : "text-stone-700") : "text-stone-300"}`} />,
            goodFor: " Reservation of sports fields",
            descFirst: "Businesses ",
            descLast: " several court options",
            link: "sport-fields",
            hover: "hoverOpt3"
        },
        {
            title: "Teams",
            icon: <ContentCutIcon className={`scale-[1.4] ${subStatusBool ? (options.hoverOpt4 ? "text-violet-600" : "text-stone-700") : "text-stone-300"}`} />,

            goodFor: "Barbershops, beauty salons etc...",
            descFirst: "Groups ",
            descLast: " many members with the option of having different availability and prices.",
            link: "team-booking",
            hover: "hoverOpt4"
        },
    ];



    return (
        <div className='w-screen flex justify-center pb-[80px] mt-[80px]' >
            <div className='w-[600px] shadow-default bg-white rounded-md flex flex-col justify-between' >

                <div
                    onClick={navigateToEvent("one-on-one", true)}
                    onMouseLeave={() => onLeave("hoverOpt1")}
                    onMouseOver={() => onHover("hoverOpt1")}
                    className='w-full px-10 rounded-t-md h-32 border hover:border-violet-600 transition-all cursor-pointer flex items-center gap-10'
                >
                    <div>
                        <GroupsIcon className={`scale-[1.4] ${options.hoverOpt1 ? "text-violet-600" : "text-stone-700"}`} />
                    </div>
                    <div className='flex w-full justify-between items-center' >
                        <div>
                            <p className='text-[19px] text-black' >One on One</p>
                            <p className='text-[16px] font-bold text-stone-700' >A host <span className='font-[400] text-black' >with</span> one or more Invitee</p>
                            <p className='text-stone-500 text-[15px]'>Good for : Interviews, meetings etc...</p>
                        </div>
                        <div>
                            <ArrowForward className={`scale-[.7] ${options.hoverOpt1 ? "text-violet-600" : "text-stone-500"}`} />
                        </div>
                    </div>
                </div>


                {restrictedEventTypes.map((each, index) => (
                    <div
                        key={index}
                        onClick={navigateToEvent(each.link)}
                        onMouseLeave={() => onLeave(each.hover)}
                        onMouseOver={() => onHover(each.hover)}
                        className={`w-full px-10 h-32 border transition-all  flex items-center gap-10 
                        ${subStatusBool ? "hover:border-violet-600 cursor-pointer" : "bg-stone-100 cursor-auto"}
                        `}
                    >
                        <div>
                            {each.icon}
                        </div>
                        <div className='flex w-full justify-between items-center' >
                            <div>
                                <p className={`text-[19px] ${subStatusBool ? "text-black" : "text-stone-400 cursor-auto select-none"}`} >{each.title}</p>
                                <p className={`text-[16px] font-bold  ${subStatusBool ? "text-stone-700" : "text-stone-400 cursor-auto select-none"}`} >
                                    {each.descFirst}
                                    <span className={`font-[400]  ${subStatusBool ? "text-black" : "text-stone-400 cursor-auto select-none"}`} >with</span>
                                    {each.descLast}
                                </p>
                                <p className={`text-[15px] ${subStatusBool ? "text-stone-500" : "text-stone-300 cursor-auto select-none"}`}>
                                    Good for : {each.goodFor}
                                </p>
                            </div>
                            <div>
                                <ArrowForward className={`scale-[.7] ${subStatusBool ? (options[each.hover] ? "text-violet-600" : "text-stone-500") : "text-stone-300"}`} />
                            </div>
                        </div >
                    </div >
                ))}











            </div >
        </div >
    )
}

export default EventType