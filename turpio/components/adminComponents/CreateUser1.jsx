import React, { useState } from 'react'
import Logo from '../../utils/Logo';
import useStateContext from '../../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

const SignupPart1 = ({ CJS_KEY }) => {
    const { setSignupUser, sendVerifyCodeToMail } = useStateContext()

    const [formState, setFormState] = useState({
        email: '',
        fullName: '',
        password: '',
        password2: '',
        age: '',
        gender: '',
        showPassword: false,
        showPassword2: false,
        errors: {
            email: '',
            fullName: '',
            password: '',
            password2: '',
            age: '',
            gender: '',
        },
    });

    // password patterns
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const lengthPattern = /^.{8,55}$/;

    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'email':
                if (!value) {
                    error = 'Please enter an email';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'fullName':
                if (!value) {
                    error = 'Please enter user name';
                } else if (value.length > 55) {
                    error = 'Is too long (maximum is 55 characters).'
                }
                break;
            case 'password':
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
            case 'password2':
                if (!value) {
                    error = 'Please enter a confirm password';
                } else if (value && value !== formState.password) {
                    error = 'Confirmed password is wrong'
                }
                break;
            case 'age':
                if (!value) {
                    error = 'Please enter your age';
                } else if (isNaN(value)) {
                    error = 'Age must be a number';
                } else if (value < 5) {
                    error = 'Age should be bigger than 5'
                }
                break;
            case 'gender':
                if (!value) {
                    error = 'Please select your gender';
                }
                break;
            default:
                break;
        }
        return error;
    }

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setFormState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        Object.keys(formState).forEach((fieldName) => {
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                errors[fieldName] = error;
            }
        });
        setFormState((prevState) => ({
            ...prevState,
            errors,
        }));
        if (Object.values(errors).every((error) => !error)) {
            // Form is valid, submit it
            // ...
            const { password2, showPassword, showPassword2, errors, ...other } = formState;
            setSignupUser(other);
            // cookie Expires after 5 hours 
            const expireTime = new Date(new Date().setHours(new Date().getHours() + 5))
            setCookie("signupUser", other, { expires: expireTime });
            sendVerifyCodeToMail(CJS_KEY, other.email);
        }
    }

    const handleClickShowPassword = (prop) => {
        setFormState({
            ...formState,
            [prop]: !formState[prop],
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div className='w-full flex flex-col items-center py-6' >

            <form onSubmit={handleSubmit} className='flex flex-col w-[30rem] items-center h-fit rounded-lg gap-4' >
                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter User Name*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                    >
                        <TextField
                            size='small'
                            placeholder="Full name"
                            error={Boolean(formState.errors.fullName)}
                            helperText={formState.errors.fullName}
                            name="fullName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formState.fullName}
                        />

                    </FormControl>
                </div>
                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter User Email*
                    </label>
                    <FormControl
                        className='w-full mt-3'

                    >
                        <TextField
                            placeholder="Email"
                            size='small'

                            error={Boolean(formState.errors.email)}
                            helperText={formState.errors.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formState.email}
                        />
                    </FormControl>
                </div>




                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter User Age*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                    >
                        <TextField
                            size='small'
                            error={Boolean(formState.errors.age)}
                            placeholder="Age"
                            helperText={formState.errors.age}
                            name="age"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formState.age}
                        />
                    </FormControl>
                </div>



                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Select User Gender*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                        size="small"

                    >
                        <Select
                            error={Boolean(formState.errors.gender)}
                            placeholder="Gender"
                            name="gender"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formState.gender}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>Select an option</em>
                            </MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                        {formState.errors.gender && <FormHelperText error>{formState.errors.gender}</FormHelperText>}
                    </FormControl>
                </div>


                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter User Password*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                        variant="outlined"

                        size='small'
                    >
                        <OutlinedInput
                            name="password"
                            error={Boolean(formState.errors.password)}
                            onChange={handleChange}
                            value={formState.password}
                            onBlur={handleBlur}
                            placeholder="Password"

                            type={formState.showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('showPassword')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formState.errors.password && <FormHelperText error>{formState.errors.password}</FormHelperText>}
                    </FormControl>
                </div>


                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter User Password again*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                        variant="outlined"
                        size='small'


                    >
                        <OutlinedInput
                            name="password2"
                            error={Boolean(formState.errors.password2)}
                            onChange={handleChange}
                            value={formState.password2}
                            onBlur={handleBlur}
                            type={formState.showPassword2 ? 'text' : 'password'}
                            placeholder="Confirm Password"


                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('showPassword2')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formState.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formState.errors.password2 && <FormHelperText error>{formState.errors.password2}</FormHelperText>}
                    </FormControl>
                </div>

                <button type='submit' className='px-20 w-full py-[8px] mt-12 text-white rounded-full text-[16px] font-medium bg-gradient-to-r from-violet-700 to-sky-500 hover:opacity-[0.8] transition-all duration-300' >
                    Create user
                </button>

            </form>
        </div>
    )
}

export default SignupPart1