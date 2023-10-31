'use client'; 


import  Link  from 'next/link';
import Image from 'next/image'
import HeaderSearch from './partials/header-search';

import StickyHeader from './sticky-header';
import {useTheme} from "next-themes";

import SunIcon from './../../assets/icons/sun.svg'
import MoonIcon from './../../assets/icons/moon.svg'
import {  usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

type Categories = {
    slug: string,
    name:string
}

function Header ({categories}: {categories: Categories[]}) {
    const pathname = usePathname()
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    function openMobileMenu () {
        if(document != null){
            document.querySelector( 'body' )?.classList.add( 'mmenu-active' );
        }
    }
    const {systemTheme , theme, setTheme} = useTheme ();

    const RenderThemeChanger= () => {

        const currentTheme = theme === "system" ? systemTheme : theme ;

        if(currentTheme ==="dark"){
          return (
            <SunIcon  suppressHydrationWarning={true} className="w-8 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
          )
        }
        return (
        <MoonIcon  suppressHydrationWarning={true} className="w-8 text-black " role="button" onClick={() => setTheme('dark')} />
        )
        
     };

   
    return (
        <header className="header header-12">

            <div className="header-middle dark:bg-slate-700 ">
                <div className="md:container md:mx-auto flexed">
                    <div className="header-left">
                        <button className="mobile-menu-toggler" onClick={ openMobileMenu }>
                            <span className="sr-only">Basculer le menu mobile</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="header-center">  <Link href="/" className="logo">
                            <Image  src="/images/app-icon.png" alt="Flipini Logo" className="bg-transparent" width={105} height={25} />
                        </Link> </div>
                    <div className="header-right">
                        <HeaderSearch />                        
                    </div>
                    <div className="header-theme-change overflow-hidden">
                    <span > {loaded &&  <RenderThemeChanger />} </span>
                    </div>
                </div>
            </div>
            <StickyHeader>
                <div className="header-bottom sticky-header" style={ { backgroundColor: '#333' } }>
                    <div className=" mx-auto">
                        <div className="header-element " >
                            <div className="header-center">
                                <nav className="main-nav">
                                    <ul className="menu  flex overflow-x-scroll">
                                        <li className={ "" }>
                                            <Link href="/" className="sf-with-ul" >Accueil</Link>           
                                        </li>
                                        {categories?.map((categorie, index) => {
                                            return ( <li key={index} className={ ( pathname.indexOf(`/categories/${categorie.slug}` ) > -1 ) ? "active" : '' }>
                                                <Link prefetch={false} href={`/categories/${categorie.slug}`} className="sf-with-ul flex flex-col" > {categorie.name} </Link>   
                                                </li>)
                                        }) }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </StickyHeader>
        </header>
    )
}

export default Header;