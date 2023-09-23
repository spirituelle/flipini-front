'use client'; 

import { useState } from 'react'


import  UserIcon  from './../assets/icons/user.svg'

import LoginPopUp from './LoginPopUp'
// import  Link  from 'next/link';



export default function LoginModal () {
    // const [status, setStatus] = useState();
    const [open, setOpen] = useState(false)

    return (
        <div className="mx-3">
            {/* <button className="bg-primary-800 dark:bg-primary-50 hover:bg-primary-600 dark:hover:bg-primary-300 transition-all duration-100 text-white dark:text-primary-800 px-8 py-2 text-2xl md:text-4xl rounded-lg" type="button" onClick={() => setOpen(true)}> Login </button> */}
            <span onClick={() => setOpen(true)} className="icon flex flex-row items-center text-sm cursor-pointer">
                <UserIcon width={24} />  <p className="hidden md:block"> Se connecter </p>
            </span>
            <LoginPopUp open={open} setOpen={setOpen} logedIn={(user) => console.log(user)} />
    </div>
    )
}