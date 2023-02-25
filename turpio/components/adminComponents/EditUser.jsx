import React, { useState, useEffect } from 'react';
import Image from "next/image";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import unknown from "../../public/images/unknown.jpg"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStateContext from '../../context/ContextProvider';
import countryList from '../../utils/allCountriesList';
import TimeZoneSelect from '../../utils/TimeZoneSelect';
import { FormHelperText } from '@mui/material';

const EditUser = () => {
    const {
        anchorEl,
        openTimeZonePopover,
        closeTimeZonePopover,
        selectedZone,
        language,
        handleUpdateUserAPI,
        setLanguage,
        openModal,
        setSearchedUser,
        fetchOneUserForAdmin,
        searchedUser
    } = useStateContext();

    const [id, setId] = useState({
        userId: "",
        errors: {
            userId: ""
        }
    });
    // searching user by user id
    const searchUserButton = (e) => {
        e.preventDefault();
        const error = validateForm("userId", id["userId"]);
        if (error) {
            return setId(prev => ({ ...prev, errors: { userId: error } }));
        }
        fetchOneUserForAdmin(id.userId, "editUser");
    }
    const handleSearchUser = (e) => {
        const { name, value } = e.target
        setId(prev => ({ ...prev, [name]: value }));
    }

    const [values, setValues] = useState({
        fullName: "",
        welcomeMessage: "",
        language: "",
        timeZone: "",
        country: "",
    });

    const defaultPasswordState = {
        changePassword: false,
        oldPassword: "",
        password: "",
        confirmPassword: "",
        showOldPassword: false,
        showPassword: false,
        showConfirmPassword: false,
        errors: {
            password: "",
            confirmPassword: "",
            oldPassword: "",
        }
    }
    const [passwordState, setPasswordState] = useState(defaultPasswordState);
    // change Password Switch
    const changePasswordSwitch = () => {
        setPasswordState(prev => ({
            changePassword: !prev.changePassword,
            oldPassword: "",
            password: "",
            confirmPassword: "",
            showOldPassword: false,
            showPassword: false,
            showConfirmPassword: false,
            errors: {
                password: "",
                confirmPassword: "",
                oldPassword: "",
            }
        }));
    }
    const passwordStateRevert = () => {
        setPasswordState(defaultPasswordState);
    }
    // password patterns
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const lengthPattern = /^.{8,55}$/;

    // passowrds visibility turn On/Off function
    const handleClickShowPassword = (prop) => {
        setPasswordState(prev => ({
            ...prev,
            [prop]: !prev[prop],
        }));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // form validation
    const validateForm = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
            case "fullName":
                if (!value) {
                    error = "Please complete your full name."
                }
                break;
            case "welcomeMessage":
                if (!value) {
                    error = "Please type your welcome message."
                }
                if (value.length > 120) {
                    error = "Welcome message should not exceed 120 chars."
                }
                break;
            case "language":
                if (!value) {
                    error = "Please select any language."
                }
                break;
            case "timeZone":
                if (!value) {
                    error = "Please select your time zone."
                }
                break;
            case "country":
                if (!value) {
                    error = "Please select the country."
                }
                break;
            case "city":
                if (!value) {
                    error = "Please select the city."
                }
                break;
            case "password":
                if (!value) {
                    error = 'Please enter a password';
                } else {
                    if (!lowercasePattern.test(value)) {
                        error = 'Password must contain at least 1 lowercase letter';
                    }
                    if (!uppercasePattern.test(value)) {
                        error = 'Password must contain at least 1 uppercase letter';
                    }
                    if (!lengthPattern.test(value)) {
                        error = 'Password must be between 8 and 55 characters long';
                    }
                }
                break;
            case "confirmPassword":
                if (!value) {
                    error = 'Please enter a confirm password';
                } else if (value && value !== passwordState.password) {
                    error = 'Confirmed password is wrong'
                }
                break;
            case "oldPassword":
                if (!value) {
                    error = 'Please enter your old password';
                }
                break;
            case "userId":
                if (!value) {
                    error = "Please enter the user Id."
                } else if (value.length !== 24) {
                    error = "Invalid user Id."
                }
                break;
            default:
                break;
        }
        return error;
    }

    const [updatedValues, setUpdatedValues] = useState({
        errors: {
            fullName: "",
            welcomeMessage: "",
            language: "",
            timeZone: "",
            country: "",
            age: "",
            gender: "",
        }
    })
    useEffect(() => {
        if (searchedUser) {
            setValues({
                fullName: searchedUser.fullName,
                welcomeMessage: searchedUser.welcomeMessage,
                language: searchedUser.language,
                timeZone: searchedUser.timeZone,
                country: searchedUser.country,
            })
        }
    }, [searchedUser])
    const [updatingStatus, setUpdatingStatus] = useState(false) // it's gonna show if user has updated smth.

    // handling input blur
    const handleBlur = (target) => (event) => {
        const { name, value } = event.target;
        const error = validateForm(name, value);
        if (target === "password") {
            setPasswordState((prevState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [name]: error,
                },
            }));
        } else {
            setUpdatedValues((prevState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [name]: error,
                },
            }));
        }
    }

    // handling states
    const handleChange = (target) => (e) => {
        const { value, name } = e.target;
        setUpdatingStatus(true);
        if (target === "password") {
            setPasswordState(prev => ({ ...prev, [name]: value }));
        } else {
            if (searchedUser[name] === value) {
                const copyUpdateValues = { ...updatedValues }
                delete copyUpdateValues[name];
                setUpdatedValues(copyUpdateValues);
            } else {
                setUpdatedValues(prev => ({ ...prev, [name]: value }));
            }
            setValues(prev => ({ ...prev, [name]: value }));
        }
    }

    // canceling update
    const cancelUpdate = () => {
        setUpdatingStatus(false);
        setValues({
            fullName: searchedUser.fullName,
            welcomeMessage: searchedUser.welcomeMessage,
            language: searchedUser.language,
            timeZone: searchedUser.timeZone,
            country: searchedUser.country,
        });
        setPasswordState({
            changePassword: "",
            oldPassword: "",
            password: "",
            confirmPassword: "",
            showOldPassword: false,
            showPassword: false,
            showConfirmPassword: false,
            errors: {
                password: "",
                confirmPassword: "",
                oldPassword: "",
            }
        });
        setUpdatedValues({
            errors: {
                fullName: "",
                welcomeMessage: "",
                language: "",
                timeZone: "",
                country: "",
            }
        });
    }

    // submitting updated form of user
    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}
        let errors2 = {}

        Object.keys(updatedValues).forEach(each => {
            let error = validateForm(each, values[each]);
            if (error) {
                errors[each] = error;
            }
        });
        Object.keys(passwordState).forEach(each => {
            let error = validateForm(each, passwordState[each]);
            if (error && passwordState.changePassword) {
                errors2[each] = error;
            }
        });

        setUpdatedValues(prev => ({
            ...prev,
            errors: { ...prev.errors, ...errors }
        }));

        if (passwordState.changePassword) {
            setPasswordState(prev => ({
                ...prev,
                errors: { ...prev.errors, ...errors2 }
            }));
        };
        if (Object.values({ ...errors, ...errors2 }).every(e => !e)) {
            const { errors, ...restUpdatedValues } = updatedValues;
            let updateObj = restUpdatedValues
            if (passwordState.changePassword) {
                const { password, oldPassword } = passwordState
                updateObj = { ...updateObj, password, oldPassword }
            }
            handleUpdateUserAPI(updateObj, setUpdatingStatus, passwordStateRevert, searchedUser.id, true);
        }

    }
    useEffect(() => {
        if (searchedUser) {
            const { errors, ...rest } = updatedValues;
            if (Object.keys(rest).every(each => searchedUser[each] === updatedValues[each]) && !passwordState.changePassword) {
                setUpdatingStatus(false);
            }
        }
    }, [updatedValues, passwordState.changePassword]);




    return (
        <div className='flex-[3] border-2 border-violet-600 rounded-md min-h-[650px]' >
            <div className='flex justify-center' >

                {searchedUser ?
                    <form onSubmit={handleSubmit} className='w-[450px] pt-[40px] pb-[80px] flex flex-col items-center gap-6' >
                        <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />

                        {/* user fullname input */}
                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Name
                            </label>
                            <FormControl
                                className='w-full'
                            >
                                <TextField
                                    size='small'
                                    className='w-full mt-2'
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange()}
                                    onBlur={handleBlur()}
                                    error={Boolean(updatedValues.errors.fullName)}
                                    helperText={updatedValues.errors.fullName}
                                    placeholder="Name"
                                />
                            </FormControl>
                        </div>

                        {/* welcome message input */}
                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Welcome Message
                            </label>
                            <FormControl
                                className='w-full'
                            >
                                <TextField
                                    size='small'
                                    id="outlined-multiline-static"
                                    className='w-full mt-2'
                                    name="welcomeMessage"
                                    value={values.welcomeMessage}
                                    onChange={handleChange()}
                                    onBlur={handleBlur()}
                                    error={Boolean(updatedValues.errors.welcomeMessage)}
                                    helperText={updatedValues.errors.welcomeMessage}
                                    multiline
                                    rows={4}
                                    placeholder="Welcome to my scheduling page. Please follow the instructions to add an event to my calendar."
                                />
                            </FormControl>
                        </div>

                        {/* language input */}
                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Language
                            </label>
                            <FormControl
                                className='w-full mt-2'
                            >
                                <Select
                                    size='small'
                                    value={values.language}
                                    name="language"
                                    onChange={(e) => { handleChange()(e); setLanguage(e.target.value) }}
                                    onBlur={handleBlur()}
                                    error={Boolean(updatedValues.errors.language)}
                                >
                                    <MenuItem value="english">English</MenuItem>
                                    <MenuItem value={"spanish"}>Spanish</MenuItem>
                                </Select>
                                {updatedValues.errors.language && <FormHelperText error>{updatedValues.errors.language}</FormHelperText>}
                            </FormControl>
                        </div>

                        {/* country input */}
                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[14px]`}
                            >
                                Country
                            </label>
                            <FormControl
                                className='w-full mt-2'
                            >
                                <Select
                                    size='small'
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange()}
                                    onBlur={handleBlur()}
                                    error={Boolean(updatedValues.errors.country)}
                                >
                                    {countryList.map((country, index) => (
                                        <MenuItem key={index} value={country.name}>{country.name}</MenuItem>
                                    ))
                                    }
                                </Select>
                                {updatedValues.errors.country && <FormHelperText error>{updatedValues.errors.country}</FormHelperText>}
                            </FormControl>
                        </div>

                        {/* timezone input */}
                        <div className='w-full' >
                            <div className='w-full flex justify-between' >

                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[14px]`}
                                >
                                    Time Zone
                                </label>
                                <label
                                    className={`text-stone-500`}
                                >
                                    Current Time: {new Date().toLocaleString("en-US", { timeZone: selectedZone.zoneName, hour: "numeric", minute: "2-digit" })}
                                </label>
                            </div>
                            <div
                                onClick={(e) => openTimeZonePopover(e, "popover2")}
                                aria-describedby={"timezone-popover2"}
                                className='px-[16px] py-[8px] mt-2 border-stone-300 border-2 hover:border-blue-700 rounded-md text-stone-700 select-none cursor-pointer transition-all'
                            >
                                {`${selectedZone.countryName}, ${selectedZone.zoneName}`}
                            </div>
                            <TimeZoneSelect
                                ID="timezone-popover2"
                                anchorEl={anchorEl}
                                popoverName={"popover2"}
                                close={closeTimeZonePopover}
                            />
                        </div>

                        {/* password inputs*/}
                        {!searchedUser.googleAuth &&
                            <div className='w-full'>
                                <button
                                    type='button'
                                    onClick={changePasswordSwitch}
                                    className={`${passwordState.changePassword ? "text-red-500" : "text-blue-600"} 
                                font-semibold underline text-[16px]`}
                                >
                                    {passwordState.changePassword ?
                                        "Don't Change Password."
                                        :
                                        "Change Password."
                                    }
                                </button>
                            </div>
                        }
                        {passwordState.changePassword &&
                            <>
                                {/* Old password */}
                                <div className='w-full' >
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        Old password
                                    </label>
                                    <FormControl
                                        className='w-full mt-3'
                                        variant="outlined"
                                    >
                                        <OutlinedInput
                                            name="oldPassword"
                                            error={Boolean(passwordState.errors.oldPassword)}
                                            value={passwordState.oldPassword}
                                            onChange={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            type={passwordState.showOldPassword ? 'text' : 'password'}
                                            placeholder="Old password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => handleClickShowPassword('showOldPassword')}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {passwordState.showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {passwordState.errors.oldPassword && <FormHelperText error>{passwordState.errors.oldPassword}</FormHelperText>}
                                    </FormControl>
                                </div>
                                {/* New Password */}
                                <div className='w-full' >
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        New Password
                                    </label>
                                    <FormControl
                                        className='w-full mt-3'
                                        variant="outlined"
                                    >
                                        <OutlinedInput
                                            name="password"
                                            error={Boolean(passwordState.errors.password)}
                                            value={passwordState.password}
                                            onChange={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            type={passwordState.showPassword ? 'text' : 'password'}
                                            placeholder="New password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => handleClickShowPassword('showPassword')}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {passwordState.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {passwordState.errors.password && <FormHelperText error>{passwordState.errors.password}</FormHelperText>}
                                    </FormControl>
                                </div>
                                {/* confirm Passwords */}
                                <div className='w-full' >
                                    <label
                                        htmlFor=""
                                        className={`text-stone-800 font-bold text-[14px]`}
                                    >
                                        Confirm Password
                                    </label>
                                    <FormControl
                                        className='w-full mt-3'
                                        variant="outlined"
                                    >
                                        <OutlinedInput
                                            name="confirmPassword"
                                            error={Boolean(passwordState.errors.confirmPassword)}
                                            value={passwordState.confirmPassword}
                                            onChange={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            type={passwordState.showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm Password"


                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => handleClickShowPassword('showConfirmPassword')}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {passwordState.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {passwordState.errors.confirmPassword && <FormHelperText error>{passwordState.errors.confirmPassword}</FormHelperText>}
                                    </FormControl>
                                </div>
                            </>
                        }

                        {/* Footer buttons */}
                        <div className='flex justify-between w-full' >
                            <div className='flex gap-4' >
                                <button
                                    type='submit'
                                    disabled={!updatingStatus}
                                    className={`${updatingStatus ?
                                        "border-violet-700 bg-violet-700 hover:opacity-80"
                                        :
                                        "border-violet-300 bg-violet-300"
                                        }
                                border rounded-full px-[18px] py-[8px] text-white text-[15px] transition-all`} >
                                    Save changes
                                </button>
                                <button
                                    type='button'
                                    disabled={!updatingStatus}
                                    onClick={cancelUpdate}
                                    className={`border  rounded-full px-[18px] py-[8px] text-[15px]  transition-all ${updatingStatus ? "text-zinc-700 border-stone-400 hover:bg-stone-200" : "text-stone-400 border-stone-300"}`} >
                                    Cancel
                                </button>
                            </div>
                            <button type='button' onClick={() => setSearchedUser(null)} className='border border-red-500 bg-red-500 rounded-full px-[18px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all' >
                                Back
                            </button>
                        </div>
                    </form>


                    :



                    <form onSubmit={searchUserButton} className='w-[450px] pt-[40px] pb-[80px] flex flex-col items-center mt-8 gap-6' >
                        <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />

                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[16px]`}
                            >
                                Search user by ID
                            </label>
                            <FormControl
                                className='w-full'
                            >
                                <TextField
                                    size='small'
                                    className='w-full mt-2'
                                    name="userId"
                                    value={id.userId}
                                    onChange={handleSearchUser}
                                    error={Boolean(id.errors.userId)}
                                    helperText={id.errors.userId}
                                    placeholder="User ID"
                                />
                            </FormControl>
                        </div>

                        <button type='submit' className='border font-semibold border-violet-700 bg-violet-700 rounded-full px-[18px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all w-full mt-6' >
                            Search user
                        </button>
                    </form>
                }
            </div>
        </div >
    )
}

export default EditUser