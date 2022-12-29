import React from 'react';
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

const AddUsers = () => {
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
    <div className='flex-[3] border-2 border-violet-600 rounded-md min-h-[650px]' >
      <div className='flex justify-center' >
        <div className='w-[450px] pt-[40px] pb-[80px] flex flex-col items-center gap-8' >

          <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />


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




            <button className='border border-violet-700 bg-violet-700 rounded-full px-[18px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all w-full mt-6' >
              Create User
            </button>


        </div>
      </div>
    </div>
  )
}

export default AddUsers