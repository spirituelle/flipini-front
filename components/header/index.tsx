'use client'; 


import  Link  from 'next/link';

import LoginModal from './../LoginModal';
import HeaderSearch from './partials/header-search';
import {AuthUserContext} from './../../hooks/auth.context'
import { useContext } from "react";

import StickyHeader from './sticky-header';
import {useTheme} from "next-themes";
import  UserIcon  from './../../assets/icons/user.svg'
import Heart from './../../assets/icons/heart.svg'
import List from './../../assets/icons/list.svg'
import SunIcon from './../../assets/icons/sun.svg'
import MoonIcon from './../../assets/icons/moon.svg'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {CategoryModel} from './../../model/CategoryModel';

import {useState, useEffect, useCallback} from 'react'
import { UserModel } from './../../model/UserModel';
function Header ({categories}: {categories: CategoryModel[]}) {

    const { state, dispatch } = useContext(AuthUserContext);

    const [rendred, setRendred] = useState(false)
    const [wishlist, setWishlist] = useState([])

    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    console.log(pathname);

    
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(Array.from(searchParams.entries()))
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )
 
      
    useEffect(() => {
        setRendred(true)
        // setTheme('dark')
        return () => {
            
        }
    }, [])
  
    function openMobileMenu () {
        if(document != null){
            document.querySelector( 'body' )?.classList.add( 'mmenu-active' );
        }
    }
    const {systemTheme , theme, setTheme} = useTheme ();

    const renderThemeChanger= () => {

        const currentTheme = theme === "system" ? systemTheme : theme ;

        if(currentTheme ==="dark"){
          return (
            <SunIcon className="w-8 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
          )
        }

        else {
          return (
            <MoonIcon className="w-8 text-black " role="button" onClick={() => setTheme('dark')} />
          )
        }
     };
    //  console.log(state.token)
     const renderButton= () => {
        if(!rendred) return null
       if(state.token){
        return ( 
            <div className="header-right">
                <div className="account">
                    <Link href="/profil"
                        title="My account"
                        className="flex-row flex-nowrap items-center"
                    >
                        <span className="icon">
                            <UserIcon width={20} />
                        </span>

                        <p>{state.user?.username}</p>
                    </Link>
                </div>
                <div className="wishlist">
                    <Link href={"/profil?"+ createQueryString('value', 'favoris')} title="Wishlist">
                        <div className="icon">
                            <Heart width= {20} />
                            {/* <span className="wishlist-count badge">{ wishlist.length }</span> */}
                        </div>
                        {/* <p>Favoris</p> */}
                    </Link>
                </div>
                <div className="wishlist">
                    <Link href={"/profil?"+ createQueryString('value', 'catalogue')} title="Wishlist">
                        <div className="icon">
                            <List width= {20} />
                            {/* <span className="wishlist-count badge">{ wishlist.length }</span> */}
                        </div>
                        {/* <p> enregistrer </p> */}
                    </Link>
                </div>
            </div>
        )
       }else{
        return  <LoginModal />
       }
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
                            <img src="/images/app-icon.png" alt="Flipini Logo" className="bg-transparent" width="105" height="25" />
                        </Link> </div>
                    <div className="header-right">
                        <HeaderSearch />

                        <div className="header-dropdown-link"> { renderButton() }  </div>
                        
                    </div>
                    <div className="header-theme-change overflow-hidden">
                            {renderThemeChanger()}
                    </div>
                </div>
            </div>

            <StickyHeader>
                <div className="header-bottom sticky-header" style={ { backgroundColor: '#333' } }>
                    <div className="container mx-auto">
                        <div className="header-element " >
                            {/* <div className="header-left">
                                <CategoryMenu />
                            </div> */}

                            <div className="header-center">
                                <nav className="main-nav">
                                    <ul className="menu  flex overflow-x-scroll">
                                        <li className={ "" }>
                                            <Link href="/" className="sf-with-ul" scroll={ false }>Accueil</Link>           
                                        </li>

                                        {
                                            categories?.map((categorie, index) => {
                                               return ( <li key={index} className={ ( pathname.indexOf(`/categories/${categorie.slug}` ) > -1 ) ? "active" : '' }>
                                                    <Link prefetch={false} href={`/categories/${categorie.slug}`} className="sf-with-ul flex flex-col" scroll={ false }> {categorie.name} </Link>   
                                                    {/* <div className="megamenu megamenu-md">
                                                        <div className="flex">
                                                            <div className="flex flex-col">
                                                                    <ul>
                                                                        {
                                                                            categorie.subcategories.map((subcat, index) => {
                                                                                return(
                                                                                    <li className={ ( pathname.indexOf( `/magasins/${subcat.slug}` ) > -1 ) ? "active" : '' }><Link href={`/magasins/${subcat.slug}`} scroll={ false }>{subcat.name}</Link></li>

                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                            </div>

                                                          
                                                        </div>
                                                    </div>         */}
                                                 </li>)
                                            })
                                        }

                                        {/* <li className={ "" }>
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
                                        </li> */}
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