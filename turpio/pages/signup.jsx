import React from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../utils/Logo';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import Head from 'next/head'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';




const Signup = () => {
    const [values, setValues] = React.useState({
        age: '',
        gender: '',
        email: '',
        fullName: '',
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (prop) => {
        setValues({
            ...values,
            [prop]: !values[prop],
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='w-screen h-screen flex flex-col items-center py-6 bg-wave-4 bg-bottom lg:bg-right bg-contain bg-no-repeat' >
            <Head>
                <title>Signup - Turpio</title>
                <meta name="description" content="Sign up with Turpio for free" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <div className='flex justify-center w-[35rem] mb-8' >
                <Logo />
            </div>
            <p
                className={`text-stone-800 font-medium text-[20px] leading-tight mb-10 text-center w-[35rem]`}
            >
                Sign up with Turpio for free
            </p>
            <div className='flex flex-col px-6 py-10 w-[35rem] items-center h-fit rounded-lg gap-4 bg-white shadow-default' >
                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter your Name to get started*
                    </label>

                    <TextField
                        className='w-full mt-3'
                        id="fullName"
                        placeholder="Full name"
                        size='small'
                        onChange={handleChange("fullName")}
                    />
                </div>
                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter your Email to get started*
                    </label>

                    <TextField
                        className='w-full mt-3'
                        id="email"
                        placeholder="Email"
                        size='small'
                        type="email"
                        onChange={handleChange("email")}

                    />
                </div>

                <div className="w-full flex items-center gap-6">
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                        >
                            Enter your Age*
                        </label>

                        <TextField
                            className='w-full mt-3'
                            id="age"
                            placeholder="Age"
                            size='small'
                            type="text"
                            onChange={handleChange("age")}

                        />
                    </div>
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                        >
                            Select your Gender*
                        </label>
                        <FormControl
                            className='w-full mt-3'
                            size="small"
                        >
                            <Select
                                value={values.gender}
                                placeholder="Male"
                                defaultValue='Male'
                                onChange={handleChange("gender")}

                            >
                                <MenuItem selected value="Male">Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter your Password to get started*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                        variant="outlined"
                        size='small'
                    >
                        <OutlinedInput
                            type={values.showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('showPassword')}
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


                <div className='w-full' >
                    <label
                        htmlFor=""
                        className={`text-stone-500 text-[16px] leading-tight mb-4 text-center w-[35rem] font-medium`}
                    >
                        Enter your Password again*
                    </label>
                    <FormControl
                        className='w-full mt-3'
                        variant="outlined"
                        size='small'
                    >
                        <OutlinedInput
                            type={values.showPassword2 ? 'text' : 'password'}
                            value={values.password2}
                            placeholder="Confirm Password"
                            onChange={handleChange('password2')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('showPassword2')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>

                <button className='px-20 w-full py-[10px] text-white rounded-full text-[17px] font-medium bg-gradient-to-r from-violet-700 to-sky-500 hover:opacity-[0.8] transition-all duration-300' >
                    Sign up
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
                    Sign up with Google
                </button>

                <div className='w-full' >
                    <p className='text-stone-700 font-[17px] cursor-pointer' >Already have an account?  <Link href="/login" ><span className='underline' >Login</span></Link>  </p>
                </div>
            </div>
        </div>
    )
}

export default Signup