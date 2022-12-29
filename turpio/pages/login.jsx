import React from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../utils/Logo';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import Head from 'next/head'


const login = () => {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='w-screen h-screen flex flex-col items-center py-20 bg-wave-2 bg-bottom lg:bg-left bg-contain bg-no-repeat' >
            <Head>
                <title>Morpi | 404</title>
                <meta name="description" content="Login up with Turpio for free" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <div className='flex justify-center w-[35rem] mb-8' >
                <Logo />
            </div>
            <p
                className={`text-stone-800 font-medium text-[20px] leading-tight mb-10 text-center w-[35rem]`}
            >
                Log into your Morpi account
            </p>
            <div className='flex flex-col px-6 py-12 w-[35rem] items-center h-fit rounded-lg gap-6 bg-white shadow-default' >
                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-12 text-center w-[35rem]`}
                    >
                        Enter your Email to get started
                    </label>

                    <TextField
                        className='w-full mt-3'
                        id="email"
                        placeholder="Email"

                    />
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
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            placeholder="Password"
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }

                        />
                    </FormControl>
                </div>


                <button className='px-20 w-full py-[10px] text-white rounded-full text-[17px] font-medium bg-gradient-to-r from-violet-700 to-sky-500 hover:opacity-[0.8] transition-all duration-300' >
                    Login
                </button>

                <div className='flex w-full items-center gap-6' >
                    <div className='w-full h-0 border-t border-stone-400' ></div>
                    <p className='text-stone-800 text-[17px]' >
                        OR
                    </p>
                    <div className='w-full h-0 border-t border-stone-400' ></div>
                </div>
                <button className='flex items-center justify-center gap-4 px-20 bg-red-600 hover:bg-red-500 text-white w-full py-[10px] rounded-full text-[17px] font-medium hover:opacity-[0.8] transition-all duration-300' >
                    <GoogleIcon />
                    Login with Google
                </button>

                <div className='w-full' >
                    <p className='text-stone-700 font-[17px] cursor-pointer' >Don't have an account?  <Link href="/signup" ><span className='underline' >Sign up</span></Link>  </p>
                </div>
            </div>



        </div>
    )
}

export default login