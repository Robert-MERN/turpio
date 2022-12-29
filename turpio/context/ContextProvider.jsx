import { createContext, useContext, useState, useTransition } from 'react'
import { Data } from "../utils/timezoneName";
import moment from "moment-timezone";

const StateContext = createContext();




export const ContextProvider = ({ children }) => {

    const [isPending2, startTransition2] = useTransition();
    const defaultAnchor = {
        popover1: null,
        popover2: null,
        popover3: null,
        popover4: null,

    }
    const [anchorEl, setAnchorEl] = useState(defaultAnchor);
    const openTimeZonePopover = (e, name) => {

        setAnchorEl({ ...defaultAnchor, [name]: e.currentTarget });

        startTransition2(() => {
            const Africa = Data.filter((i) => i.zoneName.includes("Africa"));
            const America = Data.filter((i) => i.zoneName.includes("America"));
            const Antartica = Data.filter((i) => i.zoneName.includes("Antartica"));
            const Asia = Data.filter((i) => i.zoneName.includes("Asia"));
            const Atlantic = Data.filter((i) => i.zoneName.includes("Atlantic"));
            const Europe = Data.filter((i) => i.zoneName.includes("Europe"));
            const Indian = Data.filter((i) => i.zoneName.includes("Indian"));
            const Pacific = Data.filter((i) => i.zoneName.includes("Pacific"));


            setTimeZone((prev) => ({
                ...prev,
                America,
                Africa,
                Antartica,
                Asia,
                Atlantic,
                Europe,
                Indian,
                Pacific,
            }));


        })
    }

    const [selectedZone, setSelectedZone] = useState(Data.find(i => i.zoneName === moment.tz.guess()));
    const closeTimeZonePopover = (name) => {
        setTimeZone({});
        startTransition2(() => {
            setAnchorEl({ ...defaultAnchor, [name]: null });
        })
    }

    // language switch
    const [language, setLanguage] = useState("english");


    // timezones
    const [timeZone, setTimeZone] = useState({});



    // modals
    const defaultModals = {
        logout: false,
        deleteEvent: false,
        eventLocation: false,
        discardEvent: false,
    }
    const [modals, setModals] = useState(defaultModals);
    const openModal = (key) => {
        setModals({ ...defaultModals, [key]: true });
    }
    const closeModal = (key) => {
        setModals({ ...defaultModals, [key]: false });
    }



    // available Time of inviter
    const [availableTime, setAvailableTime] = useState({
        Sun: {
            checked: false,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        },
        Mon: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        },
        Tue: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        },
        Wed: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        },
        Thu: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        },
        Fri: {
            checked: true,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        },
        Sat: {
            checked: false,
            time1: {
                hour12: "09:00 AM",
                hour24: "09:00",
            },
            time2: {
                hour12: "05:00 PM",
                hour24: "17:00",
            },
        }
    });

    const [selectedAvailableTime, setSelectedAvailableTime] = useState("");


    // meeting colors 
    const [meetingColor, setMeetingColor] = useState({
        bg: "bg-violet-600",
        border: "border-violet-600"
    });

    const handleColorsChange = (bg, border) => {
        setMeetingColor({
            bg,
            border
        })
    }


    // selectingEventLocation
    const [selectEventLocation, setSelectEventLocation] = useState(null);
    const [finalselectEventLocation, setFinalSelectEventLocation] = useState(null);
    const [editLocationCancel, setEditLocationCancel] = useState(null);
    const [editEventLocation, setEditEventLocation] = useState(false);


    // adminPanel ControlBar
    const defaultAdminControlPanel = {
        "Table": false,
        "Charts": false,
        "Add Users": false,
        "Edit User": false,
    }
    const [adminControlPanel, setAdminControlPanel] = useState({
        "Table": true,
        "Charts": false,
        "Add Users": false,
        "Edit User": false,
    });
    const [panelName, setpanelName] = useState("Table");

    const handleAdminControlPanel = (key) => {
        setAdminControlPanel({ ...defaultAdminControlPanel, [key]: true });
        setpanelName(key);
    }

    // edit event 
    const defaultValForEditEvent = {
        "create": false,
        "availability": false,
        "payment": false,
    }
    const [editEvent, setEditEvent] = useState(defaultValForEditEvent)
    const handelEditEventTab = (key) => {
        setEditEvent({ ...defaultValForEditEvent, [key]: !editEvent[key] })
    }

    return (
        <StateContext.Provider
            value={{
                anchorEl, openTimeZonePopover, closeTimeZonePopover,

                language, setLanguage,

                timeZone, setTimeZone, isPending2, selectedZone, setSelectedZone,

                modals, openModal, closeModal,

                availableTime, setAvailableTime, selectedAvailableTime, setSelectedAvailableTime,

                meetingColor, handleColorsChange,

                selectEventLocation, setSelectEventLocation, finalselectEventLocation,
                setFinalSelectEventLocation, editEventLocation, setEditEventLocation,
                editLocationCancel, setEditLocationCancel,

                adminControlPanel, handleAdminControlPanel, panelName,

                editEvent, handelEditEventTab



            }
            }
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;