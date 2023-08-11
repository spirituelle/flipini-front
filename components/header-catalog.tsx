'use client'; 


import  Link  from 'next/link';

import LoginModal from './LoginModal';
import useAuth from './../hooks/useAuth'

import {useTheme} from "next-themes";

import SunIcon from './../assets/icons/sun.svg'
import MoonIcon from './../assets/icons/moon.svg'

import {useState, useEffect} from 'react'

import Menu from './../assets/icons/menu.svg'
import UserIcon from './../assets/icons/user.svg'
function Header () {
    const  {token} = useAuth()
    const [rendred, setRendred] = useState(false)

    useEffect(() => {
        setRendred(true)
        return () => {
            
        }
    }, [])
    function openMobileMenu () {
        document.querySelector( 'body' )?.classList.add( 'mmenu-active' );
    }
    const {systemTheme , theme, setTheme} = useTheme ();

    const renderThemeChanger= () => {

        const currentTheme = theme === "system" ? systemTheme : theme ;

        if(currentTheme ==="dark"){
          return (
            <SunIcon className="w-10 h-10 text-yellow-500 ml-4" role="button" onClick={() => setTheme('light')} />
          )
        }

        else {
          return (
            <MoonIcon className="w-10 h-10 text-black ml-4" role="button" onClick={() => setTheme('dark')} />
          )
        }
     };
     const renderButton= () => {
        if(!rendred) return null
       if(token){
        return  <div className="account">
        <Link href="/profil"
            title="My account"
        >
            <div className="icon mr-2">
                <UserIcon width={18} />
            </div>

            <p>Account</p>
        </Link>
    </div>
       }else{
        return  <LoginModal />
       }
     };
    return (
        <header className="header header-catalog">

        <div className="header-middle">
            <div className="container mx-auto">
                <div className="header-left">
                        <button className="mobile-menu-toggler" onClick={ openMobileMenu }>
                            <span className="sr-only">Toggle mobile menu</span>
                            <span> <Menu width={32} /> </span>
                        </button>

                       
                    <Link href="/" className="logo">
                        <img src="/images/app-icon.png" alt="Flipini Logo" className="bg-transparent" width="105" height="25" />
                    </Link>
                </div>
                <div className="header-center">
                   
                    <nav className="main-nav">
                        <ul className="menu ">
                            
                            
                        <li className={ "" }>
                                <Link href="/" className="sf-with-ul" scroll={ false }>Home</Link>           
                        </li>
                        <li className={ "" }>
                                <Link href="/nouveaux-catalogues" className="sf-with-ul" scroll={ false }>Nouveaux catalogues</Link>           
                        </li>
                        <li className={ "" }>
                                <Link href="/magasins" className="sf-with-ul" scroll={ false }>Magasins</Link>           
                        </li>
                        <li className={ "" }>
                                <Link href="/categories" className="sf-with-ul" scroll={ false }>Categories</Link>           
                        </li>
                            
                            
                            
                        </ul>
                    </nav>
                </div>

                <div className="header-right">
                   
                    <div className="header-dropdown-link"> { renderButton() }  </div>
                    {renderThemeChanger()}
                </div>
            </div>
        </div>
            
        </header>
    )
}

export default Header;