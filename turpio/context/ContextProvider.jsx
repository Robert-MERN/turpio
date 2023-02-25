import { createContext, useContext, useState, useTransition } from 'react'
import { Data } from "../utils/timezoneName";
import moment from "moment-timezone";
import axios from 'axios';
import { toast } from 'react-toastify';
import cryptojs from "crypto-js";
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import defaultAvailableTimes from '../utils/defaultAvailableTimes';


const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const router = useRouter();

    // loading state and error toastify for all api calls
    const [APIloading, setAPIloading] = useState(false);

    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
    }


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
    const [language, setLanguage] = useState("English");


    // timezones
    const [timeZone, setTimeZone] = useState({});



    // modals
    const defaultModals = {
        logout: false,
        deleteEvent: false,
        eventLocation: false,
        discardEvent: false,
        newAvailabilityAdd: false,
        subscriptionMessage: false,
    }
    const [modals, setModals] = useState(defaultModals);
    const openModal = (key) => {
        setModals({ ...defaultModals, [key]: true });
    }
    const closeModal = (key) => {
        setModals({ ...defaultModals, [key]: false });
    }




    // --------------------available Time of inviter-----------
    // user retreived from cookies
    const [cookieUser, setCookieUser] = useState(null);

    const [availableTime, setAvailableTime] = useState(defaultAvailableTimes);

    const [selectedAvailableTime, setSelectedAvailableTime] = useState("");

    const [allSchedule, setAllSchedule] = useState(null);

    // adding schedules 
    const addSchedule = async (fieldName) => {
        if (allSchedule.some(each => Object.keys(each)[0] === fieldName)) {
            toast.error("Can't add with the same name", { ...toastConfig, toastId: "availabilityNameError" });
            return;
        }
        if (allSchedule.length < 4) {
            setAPIloading(true);
            try {
                // updating user in db
                await axios.put(
                    `/api/updateUser/${cookieUser.id}`,
                    {
                        _id: cookieUser.id,
                        availability: [...cookieUser.availability, { [fieldName]: defaultAvailableTimes }]
                    });
                setAllSchedule(prev => ([...prev, { [fieldName]: defaultAvailableTimes }]));
                toast.success("New schedule is added", { ...toastConfig, toastId: "availabilityAddSuccess" });
            } catch (err) {
                toast.error(err.response.data.message, { ...toastConfig, toastId: "availabilityAddFailure" });
            } finally {
                setAPIloading(false);
            }
            return;
        }
        toast.info("Can't add availability more than 3", { ...toastConfig, toastId: "availability3FieldsError" });
    }

    // update status
    const [updateAvailabilityStatus, setUpdateAvailabilityStatus] = useState("");
    const [updateAvailabilityError, setUpdateAvailabilityError] = useState([]);

    // updating
    const updateSchedule = async (fieldName, availability) => {
        if (updateAvailabilityError.length) {
            toast.error("Time is overlapping!", { ...toastConfig, toastId: "availabilityUpdateFailure" });
            return
        }
        setAPIloading(true);
        try {
            const copyAllSchedule = [...allSchedule];
            copyAllSchedule.splice(
                copyAllSchedule.findIndex(e => Object.keys(e)[0] === fieldName),
                1,
                { [fieldName]: availability }
            );
            setUpdateAvailabilityStatus(false);
            // updating user in db
            const res = await axios.put(
                `/api/updateUser/${cookieUser.id}`,
                {
                    _id: cookieUser.id,
                    availability: copyAllSchedule
                });
            setAllSchedule(copyAllSchedule);
            toast.success("Schedule is updated!", { ...toastConfig, toastId: "availabilityUpdateSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "availabilityUpdateFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    const deleteSchedule = async (fieldName) => {
        setAPIloading(true)
        try {
            const copyAllSchedule = [...allSchedule];
            copyAllSchedule.splice(
                copyAllSchedule.findIndex(e => Object.keys(e)[0] === fieldName),
                1,
            );
            // updating user in db
            await axios.put(
                `/api/updateUser/${cookieUser.id}`,
                {
                    _id: cookieUser.id,
                    availability: copyAllSchedule
                });
            setAllSchedule(copyAllSchedule);
            toast.success("Schedule is deleted!", { ...toastConfig, toastId: "availabilityDeleteSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "availabilityDeleteFailure" });
        } finally {
            setAPIloading(false);
        }

    }






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
    };




    // selectingEventLocation
    const [selectEventLocation, setSelectEventLocation] = useState(null);
    const [finalselectEventLocation, setFinalSelectEventLocation] = useState(null);
    const [editLocationCancel, setEditLocationCancel] = useState(null);
    const [selectEventLocationValues, setSelectEventLocationValues] = useState(null);
    const [eventLocationDialogValues, setEventLocationDialogValues] = useState({
        "In-person meeting": {
            address: "",
            additionalInfo: "",
            errors: {
                address: "",
                additionalInfo: "",
            }
        },
        "Phone call": {
            strategy: "",
            phone: "",
            errors: {
                phone: "",
                strategy: "",
            }
        },
        "Custom": {
            customLocation: "",
            errors: {
                customLocation: ""
            }
        }
    });
    const eventLocationDialogDefaultValues = {
        "In-person meeting": {
            address: "",
            additionalInfo: "",
            errors: {
                address: "",
                additionalInfo: "",
            }
        },
        "Phone call": {
            strategy: "",
            phone: "",
            errors: {
                phone: "",
                strategy: "",
            }
        },
        "Custom": {
            customLocation: "",
            errors: {
                customLocation: ""
            }
        }
    }
    const [additionalInfoForInput, setAdditionalInfoForInput] = useState(false);
    const [editEventLocation, setEditEventLocation] = useState(false);


    // adminPanel ControlBar
    const defaultAdminControlPanel = {
        "Table": false,
        "Charts": false,
        "Add User": false,
        "Edit User": false,
        "Delete User": false
    }
    const [adminControlPanel, setAdminControlPanel] = useState({
        "Table": true,
        "Charts": false,
        "Add User": false,
        "Edit User": false,
        "Delete User": false
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






    // logging in api

    const handleLoginAPI = async (user, redirect_url) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/login", user);
            router.push("/home");
            toast.success(res.data.message, { ...toastConfig, toastId: "loginSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "loginFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // signing up api
    const [signupUser, setSignupUser] = useState(null);
    const handleSignupAPI = async (user) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/signup", user);
            if (!user.adminAddingUser) router.push("/home");
            setSignupUser(null);
            deleteCookie("signupUser");
            toast.success(res.data.message, { ...toastConfig, toastId: "signupSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "signupFailure" });
            setSignupUser(null);
            deleteCookie("signupUser");
        } finally {
            setAPIloading(false)
        }
    }
    const [verificationCode, setVerificationCode] = useState("")

    const generateRandomNumber = () => {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math
            .random() * (maxm - minm + 1)) + minm;
    }

    const sendVerifyCodeToMail = async (KEY, email) => {
        const code6Digit = generateRandomNumber()
        setAPIloading(true)
        try {
            setVerificationCode(code6Digit.toString());
            // encryptingCode
            const encryptedCode = cryptojs.AES.encrypt(code6Digit.toString(), KEY).toString();

            const res = await axios.post("/api/sendAuthCode", { code: encryptedCode, email });
            toast.success(res.data.message, { ...toastConfig, toastId: "sendAuthCodeSuccess" });
        } catch (err) {
            console.log(err)
            setSignupUser(null);
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendAuthCodeFailure" });
            deleteCookie("signupUser");
        } finally {
            setAPIloading(false)
        }
    }

    // updating user api
    const handleUpdateUserAPI = async (obj, setUpdatingStatus, switchPsd, id, admin) => {
        setAPIloading(true);
        try {
            const res = await axios.put(`/api/updateUser/${cookieUser.id}`, {
                ...obj,
                _id: id || cookieUser.id,
                admin: Boolean(admin)
            });
            if (!admin) setCookieUser(res.data.updatedUser);
            deleteCookie("subscriptionPlan");
            if (switchPsd) switchPsd();
            if (setUpdatingStatus) setUpdatingStatus(false);
            toast.success(res.data.message, { ...toastConfig, toastId: "userUpdateSuccesful" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userUpdateFailure" });
        } finally {
            setAPIloading(false);
        }
    };


    // user subscription check
    const [subStatus, setSubStatus] = useState("no subscription");
    const [restrictedEvent, setRestrictedEvent] = useState("");
    const handleSubscriptionVerify = async (preventLoop) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/userSubscriptionVerification", { id: cookieUser.id });
            setSubStatus(res.data.message);
            if (res.data.updatedUser) {
                preventLoop(true);
                setCookieUser(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userSusbscriptionVerifyFail" });
        } finally {
            setAPIloading(false);
        }

    }

    // USER CALENDAR INTEGRATION

    const handleGoogleCalendarConnectAPI = async () => {
        setAPIloading(true);
        try {
            const { data } = await axios.post("/api/googleCalendar", { userId: cookieUser.id });
            window.location.href = data.authUrl;
            toast.success("You've been connected to Google Calendar", { ...toastConfig, toastId: "GoogleCalendarConnectionSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "GoogleCalendarConnectionFailure" });
        } finally {
            setAPIloading(false);
        }
    }
    const handleGoogleCalendarDisconnectAPI = async () => {
        setAPIloading(true);
        try {
            const { data } = await axios.post("/api/googleCalendar/disconnectCalendar", { userId: cookieUser.id });
            setCookieUser(data);
            toast.success("You've been disconnected to Google Calendar", { ...toastConfig, toastId: "GoogleCalendarConnectionSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "GoogleCalendarConnectionFailure" });
        } finally {
            setAPIloading(false);
        }
    }


    // creating event api
    const handleCreateEventAPI = async (eventData) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/createEvent", eventData);
            toast.success(res.data.message, { ...toastConfig, toastId: "eventCreatedSuccess" });
            // deleting all the saved cookies
            deleteCookie("eventDetails1")
            deleteCookie("eventDetails2")

            // reverting all the states
            setSelectEventLocation(null);
            setFinalSelectEventLocation(null);
            setEditLocationCancel(null);
            setSelectEventLocationValues(null);
            setEventLocationDialogValues(eventLocationDialogDefaultValues);
            setMeetingColor({
                bg: "bg-violet-600",
                border: "border-violet-600"
            });

            // pushing back to home
            router.push("/home");
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventCreatedFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // fetching user's all events
    const fetchUserAllEvents = async (id, setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getAllEventsUser/${id}`);
            setData(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventsFoundFailure" });
        } finally {
            setLoading(false);
        }
    }

    // fetching user's one event
    const fetchUserOneEvent = async (idObj, setData, setLoading) => {
        const { id, username } = idObj;
        let res = null;
        setLoading(true);
        try {
            if (username) {
                res = await axios.get(`/api/getOneEvent/${id}?username=${username}`);
            } else {
                res = await axios.get(`/api/getOneEvent/${id}`);
            }
            setData(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventsFoundFailure" });
        } finally {
            setLoading(false);
        }
    };

    // deleting user's event
    const deleteUserOneEvent = async (id) => {
        setAPIloading(true);
        try {
            const res = await axios.delete(`/api/deleteEvent/${id}`);
            toast.info(res.data.message, { ...toastConfig, toastId: "eventDeletedSuccess" });
            window.location.reload();
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventsFoundFailure" });
        } finally {
            setAPIloading(false);
        }
    };
    const [deleteEventID, setDeleteEventID] = useState("");


    // fetching user's full name by username

    const fetchFullNameUser = async (username, setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getFullNameUser?username=${username}`);
            setData(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userFoundFailure" });
        } finally {
            setLoading(false);
        }
    };

    // <------- Admin Fetches ------>
    // fetching all users for an admin
    const fetchAllUsersForAdmin = async (id, setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getAllUsers/${id}`);
            setData(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "usersFoundFailure" });
        } finally {
            setLoading(false);
        }
    };
    // fetching one user for an admin
    const [searchedUser, setSearchedUser] = useState(null);
    const [searchedUser2, setSearchedUser2] = useState(null);
    const fetchOneUserForAdmin = async (id, location) => {
        setAPIloading(true);
        try {
            const res = await axios.post(`/api/getOneUser/${cookieUser.id}`, { id });
            if (location === "editUser") {
                setSearchedUser(res.data);
            } else if (location === "deleteUser") {
                setSearchedUser2(res.data);
            }
            toast.success("User has been found!", { ...toastConfig, toastId: "userFoundSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userFoundFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // Deleting User Admin
    const deleteOneUserAdmin = async (id, setState) => {
        setAPIloading(true);
        try {
            const res = await axios.post(`/api/deleteUser/${cookieUser.id}`, { targetID: id });
            toast.success(res.data.message, { ...toastConfig, toastId: "deleteUserSuccess" });
            setSearchedUser2(null);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "deleteUserSuccess" });
            setSearchedUser2(null);
        } finally {
            setAPIloading(false);
            setState({
                userId: "",
                errors: {
                    userId: ""
                }
            })
        }
    }

    // fetching Users statistics for an admin
    const fetchUserStats = async (setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getUserStats/${cookieUser.id}`);
            setData(prev => ({ ...prev, userStats: res.data }));
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "usersStatsFoundFailure" });
        } finally {
            setLoading(false);
        }
    }

    // fetching Events statistics for an admin
    const fetchEventStats = async (setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getEventStats/${cookieUser.id}`);
            setData(prev => ({ ...prev, eventStats: res.data }));
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventStatsFoundFailure" });
        } finally {
            setLoading(false);
        }
    };

    // fetching Events statistics for an admin
    const fetchAllStats = async (setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getAllStats/${cookieUser.id}`);
            setData(prev => ({ ...prev, allStats: res.data }));
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventStatsFoundFailure" });
        } finally {
            setLoading(false);
        }
    };

    // fetching Events statistics for an admin
    const fetchSubscriptionStats = async (setData, setLoading) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/getSubscriptionStats/${cookieUser.id}`);
            setData(prev => ({ ...prev, subscriptionStats: res.data }));
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "eventStatsFoundFailure" });
        } finally {
            setLoading(false);
        }
    };


    // sending schedule confirmation mail to both inviter and invitee
    const scheduleConfirmingMails = async (eventDB, guestInfo, username, eventID) => {
        setAPIloading(true);
        try {
            await axios.post("/api/sendEventMailToInvitee", { eventDB, guestInfo });
            await axios.post("/api/sendEventMailToInviter", { eventDB, guestInfo });
            await axios.post(`/api/updateEvent/${eventID}`, { guests: guestInfo });
            console.log(eventDB);

            toast.success("Event has been booked!", { ...toastConfig, toastId: "successEventBooked" });
            router.push({
                pathname: `/schedule/${username}/confirmed/${eventID}`,
                query: {
                    data: JSON.stringify({ eventDB, guestInfo })
                }
            }, `/schedule/${username}/confirmed/${eventID}`);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendConfirmationEventMailFailed" });
        } finally {
            setAPIloading(false);
        }
    }

    return (
        <StateContext.Provider
            value={{
                anchorEl, openTimeZonePopover, closeTimeZonePopover,

                language, setLanguage,

                timeZone, setTimeZone, isPending2, selectedZone, setSelectedZone,

                modals, openModal, closeModal,

                availableTime, setAvailableTime, selectedAvailableTime, setSelectedAvailableTime, addSchedule,
                updateSchedule, allSchedule, setAllSchedule, updateAvailabilityStatus, setUpdateAvailabilityStatus,
                deleteSchedule, setUpdateAvailabilityError, updateAvailabilityError,

                meetingColor, handleColorsChange,

                selectEventLocation, setSelectEventLocation, finalselectEventLocation,
                setFinalSelectEventLocation, editLocationCancel, setEditLocationCancel, setSelectEventLocationValues,
                eventLocationDialogValues, selectEventLocationValues, setEventLocationDialogValues,
                editEventLocation, setEditEventLocation, eventLocationDialogDefaultValues, additionalInfoForInput, setAdditionalInfoForInput, handleGoogleCalendarConnectAPI, handleGoogleCalendarDisconnectAPI,

                adminControlPanel, handleAdminControlPanel, panelName,

                editEvent, handelEditEventTab,

                setSignupUser, signupUser, handleSignupAPI, sendVerifyCodeToMail, verificationCode, setVerificationCode, handleLoginAPI, handleUpdateUserAPI, handleSubscriptionVerify, subStatus, setSubStatus, restrictedEvent, setRestrictedEvent,

                APIloading, setAPIloading, setCookieUser, cookieUser,

                handleCreateEventAPI, fetchUserAllEvents, fetchUserOneEvent, fetchFullNameUser,

                deleteUserOneEvent, deleteEventID, setDeleteEventID,

                fetchAllUsersForAdmin, fetchEventStats, fetchUserStats, searchedUser, setSearchedUser, searchedUser2, setSearchedUser2, fetchAllStats, fetchSubscriptionStats, fetchOneUserForAdmin, deleteOneUserAdmin,

                scheduleConfirmingMails,
            }
            }
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;