import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../utils/Logo';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import Head from 'next/head'
import { useRouter } from 'next/router';
import { getCookie } from "cookies-next"
import useStateContext from '../context/ContextProvider';
import { FormHelperText } from '@mui/material';





const login = () => {
    const router = useRouter();

    const { handleLoginAPI } = useStateContext();

    const redirectUrl = router.query.redirect_url
   
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        showPassword: false,
        errors: {
            email: '',
            password: '',
        },
    });

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
            case 'password':
                if (!value) {
                    error = 'Please enter a password';
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



    const handleClickShowPassword = () => {
        setFormState({
            ...formState,
            showPassword: !formState.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleGoogleSignIn = () => {
        router.push("/api/google-auth");
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
            const { showPassword, ...other } = formState;
            handleLoginAPI(other, redirectUrl);

        }
    }
    return (
        <div className='w-screen h-screen flex flex-col items-center py-20 bg-wave-2 bg-bottom lg:bg-left bg-contain bg-no-repeat' >
            <Head>
                <title>Login - Turpio</title>
                <meta name="description" content="Login with Turpio for free" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <div className='flex justify-center w-[35rem] mb-8' >
                <Logo />
            </div>
            <p
                className={`text-stone-800 font-medium text-[20px] leading-tight mb-10 text-center w-[35rem]`}
            >
                Log into your Turpio account
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col px-6 py-12 w-[35rem] items-center h-fit rounded-lg gap-6 bg-white shadow-default' >
                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-12 text-center w-[35rem]`}
                    >
                        Enter your Email to get started
                    </label>
                    <FormControl
                        className='w-full mt-3'
                    >
                        <TextField
                            placeholder="Email"
                            name="email"
                            error={Boolean(formState.errors.email)}
                            helperText={formState.errors.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formState.email}
                        />
                    </FormControl>
                </div>

                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-12 text-center w-[35rem]`}
                    >
                        Enter your Password to get started
                    </label>
                    <FormControl
                        className='w-full mt-3'
                        variant="outlined"
                    >
                        <OutlinedInput
                            type={formState.showPassword ? 'text' : 'password'}
                            value={formState.password}
                            name="password"
                            error={Boolean(formState.errors.password)}
                            helpertext={formState.errors.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
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


                <button type='submit' className='px-20 w-full py-[10px] text-white rounded-full text-[17px] font-medium bg-gradient-to-r from-violet-700 to-sky-500 hover:opacity-[0.8] transition-all duration-300' >
                    Login
                </button>

                <div className='flex w-full items-center gap-6' >
                    <div className='w-full h-0 border-t border-stone-400' ></div>
                    <p className='text-stone-800 text-[17px]' >
                        OR
                    </p>
                    <div className='w-full h-0 border-t border-stone-400' ></div>
                </div>
                <button type='button' onClick={handleGoogleSignIn} className='flex items-center justify-center gap-4 px-20 bg-red-600 hover:bg-red-500 text-white w-full py-[10px] rounded-full text-[17px] font-medium hover:opacity-[0.8] transition-all duration-300' >
                    <GoogleIcon />
                    Login with Google
                </button>

                <div className='w-full' >
                    <p className='text-stone-700 font-[17px] cursor-pointer' >Don't have an account?  <Link href="/signup" ><span className='underline' >Sign up</span></Link>  </p>
                </div>
            </form>



        </div>
    )
}

export default login


export const getServerSideProps = async function ({ req, res }) {
    const userToken = getCookie("userAccountToken", { req, res });
    if (userToken) {
        return {
            redirect: {
                destination: '/home',
                permanent: true,
            },
        }
    }
    return { props: { message: "not logged in" } }
}