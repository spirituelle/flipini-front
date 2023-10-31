'use client'; 

import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
// import SlideToggle from 'react-slide-toggle';
// import {MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import MagnifyingGlassIcon from "./../../../assets/icons/glass.svg"
import Close from './../../../assets/icons/close.svg'
import  Link  from 'next/link';

function MobileMenu () {
    const router = useRouter();
    const pathname = usePathname();
    const [ searchTerm, setSearchTerm ] = useState( "" );

    useEffect( () => {
        hideMobileMenu()
    }, [pathname] )

    function hideMobileMenu () {
        document.querySelector( 'body' )?.classList.remove( 'mmenu-active' );
    }

    function onSearchChange ( e ) {
        setSearchTerm( e.target.value );
    }

    function onSubmitSearchForm ( e ) {
        e.preventDefault();
        router.push( {
            pathname: '/shop/sidebar/list',
            query: {
                searchTerm: searchTerm,
                category: ""
            }
        } );
    }

    return (
        <div className="mobile-menu-container bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="mobile-menu-wrapper">
                <span className="mobile-menu-close" onClick={ hideMobileMenu }>
                    <Close width={24} />
                </span>

                <form action="#" method="get" onSubmit={ onSubmitSearchForm } className="mobile-search">
                   
                    <label htmlFor="mobile-search" className="sr-only">Rechercher</label>
                    <input type="text" className="form-control bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" value={ searchTerm } onChange={ onSearchChange } name="mobile-search" id="mobile-search" placeholder="Rechercher catalogues  ..." required />
                    <button className="btn btn-primary" type="submit"> <MagnifyingGlassIcon className="w-4 h-4 text-white " /> </button>
                </form>
                  
                    <div className="tab-content">
                            <nav className="mobile-nav">
                                <ul className="mobile-menu">
                                    <li className={ "" }>
                                            <Link href="/" className="sf-with-ul">Home</Link>           
                                    </li>
                                    <li className={ "" }>
                                            <Link href="/nouveaux-catalogues" className="sf-with-ul">Nouveaux catalogues</Link>           
                                    </li>
                                    <li className={ "" }>
                                            <Link href="/magasins" className="sf-with-ul">Magasins</Link>           
                                    </li>
                                    <li className={ "" }>
                                            <Link href="/categories" className="sf-with-ul">Categories</Link>           
                                    </li>
                                 
                                </ul>
                            </nav>
                    </div>
              
            </div>
        </div>
    )
}

export default React.memo( MobileMenu );