'use client'; 

import { Fragment, useRef, useState } from 'react'
import { useContext } from "react";
import {AuthUserContext} from './../hooks/auth.context'

import { Dialog, Transition } from '@headlessui/react'
import { Tab } from '@headlessui/react'

import  UserIcon  from './../assets/icons/user.svg'
import axios from './../lib/axios'
import { setCookie, getCookie, deleteCookie, CookieValueTypes } from "cookies-next";

// import  Link  from 'next/link';


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function LoginModal () {

    const { dispatch } = useContext(AuthUserContext);

    const [errors, setErrors] = useState();
    // const [status, setStatus] = useState();
    const [state, setstate] = useState({email: "", password: "", confirm_password:"", username:""})
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const cancelButtonRef = useRef(null)
    const handleSubmitInscription = (e: any) =>{
        e.preventDefault();
        // register({email: state.email, password: state.password,confirm_password: state.confirm_password, username: state.username, setErrors})
        // dispatch({ ...state, type: "REGISTER" })

    }
    const handleSubmitLogin = (e: any) =>{
        e.preventDefault();
        axios.post('/api/login', {email: state.email, password: state.password})
            .then( (res) => {
            //   console.log(action)
                if(res.data){
                    setCookie('api_token', res.data.data.api_token);
                    dispatch({ type: "LOGIN" , user: res.data.data })

                    // return { ...state, token: res.data.data.api_token, user: res.data.data };
                }
                else return {...state}
               
            })
            .catch(() => {
               return {...state}
                // if (error.response?.status != 422) throw error

                // setErrors(Object.values(error.response.data.errors).flat())
            })
        // login({email: state.email, password: state.password, setErrors})
    }
    return (
        <div>
            {/* <button className="bg-primary-800 dark:bg-primary-50 hover:bg-primary-600 dark:hover:bg-primary-300 transition-all duration-100 text-white dark:text-primary-800 px-8 py-2 text-2xl md:text-4xl rounded-lg" type="button" onClick={() => setOpen(true)}> Login </button> */}
            <span onClick={() => setOpen(true)} className="icon flex flex-row items-center text-sm cursor-pointer">
                <UserIcon width={24} />  <p> Se connecter </p>
            </span>
        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="dark:bg-gray-800 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                        <Tab.List className="flex space-x-1 rounded-xl bg-primary-900/20 p-1">
                   
                            <Tab 
                                className={({ selected }) =>
                                classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none',
                                selected
                                    ? 'dark:text-white dark:bg-white/[0.32]  bg-white shadow'
                                    : 'dark:text-white text-primary-100 hover:bg-white/[0.12]'
                                ) }>
                            Se connecter
                            </Tab>
                            <Tab 
                            className={({ selected }) =>
                                classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none',
                                selected
                                    ? 'dark:text-white bg-white shadow dark:bg-white/[0.32]'
                                    : 'dark:text-white text-primary-100 hover:bg-white/[0.12]'
                                )
                            }>
                            Inscription
                            </Tab>
                        
                        </Tab.List>
                        <Tab.Panels className="mt-2"> 
                            <Tab.Panel className={classNames(
                                'rounded-xl p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}>
                                <div className="flex flex-col items-center justify-center ">
                                    
                                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                Connectez-vous à votre compte
                                            </h1>
                                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin}>
                                                <div>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre e-mail</label>
                                                    <input type="email" name="email" value={state.email} onChange={ (e) => setstate({...state, email: e.target.value})} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom@email.com"  />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                                    <input type="password" value={state.password} onChange={ (e) => setstate({...state, password: e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se rappeler de moi</label>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Vous avez oublié votre mot de passe ?</a>
                                                </div>
                                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
                                               
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel className={classNames(
                                'rounded-xl p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}>
                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Créer un compte
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitInscription}>
                                            <div>
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
                                                <input type="text" value={state.username} onChange={ (e) => setstate({...state, username: e.target.value})} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="unique name" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre e-mail</label>
                                                <input type="email" value={state.email} onChange={ (e) => setstate({...state, email: e.target.value})} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom@email.com" />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                                <input type="password" value={state.password} onChange={ (e) => setstate({...state, password: e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmez le mot de passe</label>
                                                <input type="confirm-password" value={state.confirm_password} onChange={ (e) => setstate({...state, confirm_password: e.target.value})} name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className="flex items-start">
                                                {/* <div className="flex items-center h-5">
                                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                                </div> */}
                                                <div className="ml-3 text-sm">
                                                    <label  className="font-light text-gray-500 dark:text-gray-300">En créant un compte sur flipini.fr,  j&apos;accepte les  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">conditions générales</a></label>
                                                </div>
                                            </div>
                                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Créer un compte</button>
                                           
                                        </form>
                                    </div>
                                </div>    
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                                    
            </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
    )
}