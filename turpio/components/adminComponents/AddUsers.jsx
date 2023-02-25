import React from 'react';
import Image from "next/image";
import unknown from "../../public/images/unknown.jpg"
import CreateUser1 from "./CreateUser1";
import CreateUser2 from "./CreateUser2";
import { getCookie } from "cookies-next"
import useStateContext from '../../context/ContextProvider';



const AddUsers = ({ CJS_KEY }) => {
  const { signupUser } = useStateContext();
  const signupUserInfo = getCookie("signupUser") ? JSON.parse(getCookie("signupUser")) : signupUser

  console.log(signupUserInfo)
  return (
    <div className='flex-[3] border-2 border-violet-600 rounded-md min-h-[650px]' >
      <div className='flex justify-center' >
        <div className='w-[450px] pt-[40px] pb-[80px] flex flex-col items-center gap-8' >

          <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />

          {signupUserInfo ?
            <CreateUser2 CJS_KEY={CJS_KEY} />
            :
            <CreateUser1 CJS_KEY={CJS_KEY} />
          }

        </div>
      </div>
    </div>
  )
}

export default AddUsers