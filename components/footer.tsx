'use client'
// import {  useRouter } from 'next/navigation';
import  Link  from 'next/link';
// import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {useState, useEffect, useCallback} from 'react'

function Footer () {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
  
    // const router = useRouter( );
    // const [ isBottomSticky, setIsBottomSticky ] = useState( false );
    // const [ containerClass, setContainerClass ] = useState( 'container' );

    // useEffect( () => {
    //     handleBottomSticky();
    //     setContainerClass( router.asPath.includes( 'fullwidth' ) ? 'container-fluid' : 'container' );
    // }, [ router.asPath ] );

    // useEffect( () => {
    //     window.addEventListener( 'resize', handleBottomSticky, { passive: true } );
    //     return () => {
    //         window.removeEventListener( 'resize', handleBottomSticky );
    //     }
    // }, [] )

    function handleBottomSticky () {
        // setIsBottomSticky( router.pathname.includes( 'product/default' ) && ( window.innerWidth > 991 ) );
    }
        
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(Array.from(searchParams.entries()))
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )

    return (
        <footer className="footer footer-2 bg-white dark:bg-gray-700">
            <div className="footer-middle">
                <div className="container">
                    <div className="flex flex-row flex-wrap">
                        <div className="basis-7/12">
                            <div className="widget widget-about">
                                <Link href="/">
                                    <img src="/images/app-icon.png" className="footer-logo" alt="Footer Logo" width="105" height="25" />
                                </Link>

                                <p>Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, lflipini.frélectroménager, le bricolage, la mode et bien d&apos;autres domaines. L&apos;application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit. </p>

                                {/* <div className="widget-about-info">
                                    <div className="flex flex-row">
                                        <div className="basis-1/3 sm:basis-1/2">
                                            <span className="widget-about-title">Got Question? Call us 24/7</span>
                                            <a href="tel:123456789">+0123 456 789</a>
                                        </div>

                                        <div className="col-sm-6 col-md-8">
                                            <span className="widget-about-title">Payment Method</span>
                                            <figure className="footer-payments">
                                                <img src="images/payments.png" alt="Payment methods" width="272" height="20" />
                                            </figure>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="basis-5/12">
                            <div className="flex flex-row flex-wrap">
                                <div className="sm:basis-1/3">
                                    <div className="widget">
                                        <h4 className="widget-title">Information</h4>

                                        <ul className="widget-list">
                                            <li><Link href="/about">À propos flipini</Link></li>
                                            <li><Link href="/faq">Questions fréquemment posées</Link></li>
                                            <li><Link href="/contact">Contactez-nous</Link></li>
                                             {/* <li className={ "" }>
                                                <Link href="/" className="sf-with-ul" scroll={ false }>Home</Link>           
                                        </li> */}
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
                                    </div>
                                </div>

                                <div className="sm:basis-1/3">
                                    <div className="widget">
                                        <h4 className="widget-title">Mon compte</h4>

                                        <ul className="widget-list">
                                            <li><Link href="/login">Login</Link></li>
                                            <li><Link href={"/profil?"+ createQueryString('value', 'favoris')}>Magasin favoris</Link></li>
                                            <li><Link href={"/profil?"+ createQueryString('value', 'catalogue')}>Catalogues favoris</Link></li>
                                           
                                        </ul>
                                    </div>
                                </div>
                                <div className="sm:basis-1/3">
                                    <div className="widget">
                                        <h4 className="widget-title">Service Clients</h4>

                                        <ul className="widget-list">
                                            <li><Link href="/terms-and-conditions">Termes et conditions</Link></li>
                                            <li><Link href="/privacy-policy">politique de confidentialité</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="footer-copyright"> © { ( new Date() ).getFullYear() } FLIPINI. Tous les droits sont réservés.</p>
                    {/* <ul className="footer-menu">
                        <li><a href="#" onClick={ (e )=> { e.preventDefault(); } }>Terms Of Use</a></li>
                        <li><a href="#" onClick={ (e) => { e.preventDefault(); } }>Privacy Policy</a></li>
                    </ul> */}

                    {/* <div className="social-icons social-icons-color">
                        <span className="social-label">Social Media</span>
                        <a href="#" className="social-icon social-facebook" title="Facebook" onClick={ e => { e.preventDefault(); } }><i className="icon-facebook-f"></i></a>
                        <a href="#" className="social-icon social-twitter" title="Twitter" onClick={ e => { e.preventDefault(); } }><i className="icon-twitter"></i></a>
                        <a href="#" className="social-icon social-instagram" title="Pinterest" onClick={ e => { e.preventDefault(); } }><i className="icon-instagram"></i></a>
                        <a href="#" className="social-icon social-youtube" title="Youtube" onClick={ e => { e.preventDefault(); } }><i className="icon-youtube"></i></a>
                        <a href="#" className="social-icon social-pinterest" title="Instagram" onClick={ e => { e.preventDefault(); } }><i className="icon-pinterest-p"></i></a>
                    </div> */}
                </div>
            </div>
          
        </footer>
    );
}

export default Footer;