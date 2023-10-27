'use client'; 

import { Fragment, useState, useEffect } from 'react'

import { Dialog, Transition } from '@headlessui/react'
// import  Link  from 'next/link';
import {isAndroid} from 'react-device-detect';
import  Image  from 'next/image';

import Close from './../assets/icons/close.svg'


export default function LoginModal () {
    // const [status, setStatus] = useState();
    const [open, setOpen] = useState(true);
    const [device, setDevice] = useState<string>();
    const [ofsset, setOffset] = useState<boolean>();

    useEffect(() => {
        if (isAndroid) {
            setDevice("android");
          }
      
    
    
    }, [])
    

    useEffect(() => {
        if (device === "android") {
            setOpen(true);
        }
      
    
    
    }, [device])
    
    return (
       <div className="corner-popup-container">
        {
            ( open) ? 
            <div className="corner-popup corner-popup--extra-bottom-spacing">
            <div className="corner-popup__container m-3">
                <span className="cursor-pointer" onClick= {(e) => setOpen(false)}> <Close width={18} /> </span>
                <div className="corner-popup__image">

                </div>
                <div className="corner-popup__content">
                    <p> Flipini : Catalogues hebdomadaires des magasins, à portée de main, à tout moment. </p>
                    <div>
                        <a href="https://play.google.com/store/apps/details?id=com.ya2s.flipini&pli=1" target="_blank"> 
                            <Image className="app-button" alt="" width={380} height={114} src={"/images/app-store-android-fr.png"} />
                        </a>
                    </div>
                </div>

            </div>
        </div>
        : null

        }
           
       </div>
    )
}