import React, { useState, useEffect } from 'react';
import Image from "next/image";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import unknown from "../../public/images/unknown.jpg"
import useStateContext from '../../context/ContextProvider';

const DeleteUser = () => {
    const {
        fetchOneUserForAdmin,
        searchedUser2,
        setSearchedUser2,
        deleteOneUserAdmin,
    } = useStateContext();
    const [id, setId] = useState({
        userId: "",
        errors: {
            userId: ""
        }
    });
    // form validation
    const validateForm = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
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
    // searching user by user id
    const searchUserButton = (e) => {
        e.preventDefault();
        const error = validateForm("userId", id["userId"]);
        if (error) {
            return setId(prev => ({ ...prev, errors: { userId: error } }));
        }
        if (searchedUser2) {
            deleteOneUserAdmin(searchedUser2.id, setId);
        } else {
            fetchOneUserForAdmin(id.userId, "deleteUser");

        }
    }
    const handleSearchUser = (e) => {
        const { name, value } = e.target
        setId(prev => ({ ...prev, [name]: value }));
    }

    const backBtn = () => {
        setSearchedUser2(null);
    }


    return (
        <div className='flex-[3] border-2 border-violet-600 rounded-md min-h-[650px]' >
            <div className='flex justify-center' >


                :
                <form onSubmit={searchUserButton} className='w-[450px] pt-[40px] pb-[80px] flex flex-col items-center mt-8 gap-6' >
                    <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />
                    {searchedUser2 ?
                        <div className='w-[450px] pt-[20px] flex flex-col gap-6' >
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Name:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.fullName}</p>
                            </div>
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Email:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.email}</p>
                            </div>
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Username:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.username}</p>
                            </div>
                            {searchedUser2.gender &&
                                <div className='flex items-center' >
                                    <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Gender</p>
                                    <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.gender}</p>
                                </div>
                            }
                            {searchedUser2.age &&
                                <div className='flex items-center' >
                                    <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Age:</p>
                                    <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.age}</p>
                                </div>
                            }
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Subscription Status:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.subscription.status}</p>
                            </div>
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Country:</p>
                                <p className='text-[14px] font-semibold text-zinc-600' >{searchedUser2.country}</p>
                            </div>
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Language:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.language}</p>
                            </div>
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Time Zone:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.timeZone}</p>
                            </div>
                            <div className='flex items-center' >
                                <p className='text-[16px] font-bold text-zinc-600 w-[250px]' >Google Authenticate User:</p>
                                <p className='text-[15px] font-semibold text-zinc-500 capitalize' >{searchedUser2.googleAuth.toString()}</p>
                            </div>

                        </div>
                        :
                        <div className='w-full' >
                            <label
                                htmlFor=""
                                className={`text-stone-800 font-bold text-[16px]`}
                            >
                                Search user by ID and Delete
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
                    }
                    {searchedUser2 ?
                        <div className='flex w-full gap-12' >
                            <button type='submit' className={`border font-semibold rounded-full py-[8px] text-white text-[15px] hover:opacity-80 transition-all w-fit mt-6 border-red-500 bg-red-500 px-[60px] `} >
                                delete user
                            </button >

                            <button onClick={backBtn} className={`border font-semibold rounded-full px-[30px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all w-fit mt-6 border-violet-700 bg-violet-700`}>
                                Back
                            </button>
                        </div>
                        :
                        <button type='submit' className='border font-semibold border-violet-700 bg-violet-700 rounded-full px-[18px] py-[8px] text-white text-[15px] hover:opacity-80 transition-all w-full mt-6' >
                            Search user
                        </button>
                    }
                </form>

            </div>
        </div>
    )
}

export default DeleteUser