'use client'
import  Link  from 'next/link';
// import {countTo} from './components/countTo'

import {useEffect} from 'react'
export default function About2 () {
    const countTo =  () => {
        let items = document.querySelectorAll( '.count' );
    
        if ( items ) {
            for ( let i = 0; i < items.length; i++ ) {
    
                let item = items[ i ];
                let amount = parseInt( item.getAttribute( 'data-to' ), 10 ) - parseInt( item.getAttribute( 'data-from' ), 10 );
                let time = parseInt( item.getAttribute( 'data-speed' ), 10 );
                let interval = parseInt( item.getAttribute( 'data-refresh-interval' ), 10 );
                let pt = 0;
                let height = item.parentElement.parentElement.parentElement.offsetTop;
                let flag = 0;
    
                document.addEventListener( "scroll", countToScrollHandler, true );
    
                function countToScrollHandler () {
                    if ( pt <= time && height >= window.pageYOffset ) {
                        if ( 0 === flag ) {
                            let timerId = setInterval( () => {
                                if ( pt >= time ) {
                                    clearInterval( timerId );
                                }
    
                                item.innerHTML = parseInt( ( pt * amount ) / time );
                                pt = pt + interval;
                            }, interval );
                        }
    
                        flag = 1;
                    }
                }
            }
        }
    }
    useEffect( () => {
        countTo();
    }, [] );

    return (
        <div className="main">

            <div className="page-content pb-3">
                <div className="container">
                    <div className="flex flex-row flex-wrap  mt-5">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="about-text text-center mt-3">
                                <h2 className="title text-center mb-2">Qui sommes nous?</h2>
                                <p>Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit. </p>
                                {/* <img src="images/about/about-2/signature.png" alt="signature" className="mx-auto mb-5" width="140" height="46" />
                                <img src="images/about/about-2/img-1.jpg" alt="temp" className="mx-auto mb-6" width="933" height="390" /> */}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap justify-center mt-6">
                        <div className="basis-full md:basis-1/3">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-puzzle-piece"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Notre mission</h3>
                                    <p className="md:px-20">Bienvenue sur Flipini, votre destination pour découvrir les catalogues hebdomadaires des magasins populaires. Notre mission est de vous tenir informé(e) des dernières offres, des promotions exclusives et des nouvelles tendances shopping.</p>
                                </div>
                            </div>
                        </div>

                        <div className="basis-full md:basis-1/3">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-life-ring"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Notre vision</h3>
                                    <p className="md:px-20">Nous nous efforçons de vous fournir des informations précises et à jour, afin que vous puissiez prendre des décisions éclairées lors de vos achats. Votre satisfaction est notre priorité, alors n'hésitez pas à nous contacter si vous avez des questions, des suggestions ou des commentaires.</p>
                                </div>
                            </div>
                        </div>

                        <div className="basis-full md:basis-1/3">
                            <div className="icon-box icon-box-sm text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Made With Love</h3>
                                    <p className="md:px-20">Merci d'utiliser Flipini et profitez pleinement de vos séances de préparation shopping à votre magasin préféré !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-2"></div>

                <div className="bg-image pt-7 pb-5 pt-md-12 pb-md-9" style={ { backgroundImage: `url(images/backgrounds/bg-4.jpg)` } } >
                    <div className="container">
                        <div className="flex flex-row flex-wrap ">
                            <div className="basis-1/2 md:basis-1/4">
                                <div className="count-container text-center">
                                    <div className="count-wrapper ">
                                        <span className="count" data-from="0" data-to="40" data-speed="3000" data-refresh-interval="50">0</span>k+
                                    </div>
                                    <h3 className="count-title ">Client satisfait</h3>
                                </div>
                            </div>

                            <div className="basis-1/2 md:basis-1/4">
                                <div className="count-container text-center">
                                    <div className="count-wrapper ">
                                        <span className="count" data-from="0" data-to="10" data-speed="3000" data-refresh-interval="50">0</span>+
                                    </div>
                                    <h3 className="count-title ">Ans d'activité</h3>
                                </div>
                            </div>

                            <div className="basis-1/2 md:basis-1/4">
                                <div className="count-container text-center">
                                    <div className="count-wrapper ">
                                        <span className="count" data-from="0" data-to="95" data-speed="3000" data-refresh-interval="50">0</span>
                                    </div>
                                    <h3 className="count-title ">Partenaires</h3>
                                </div>
                            </div>

                            <div className="basis-1/2 md:basis-1/4">
                                <div className="count-container text-center">
                                    <div className="count-wrapper ">
                                        <span className="count" data-from="0" data-to="15" data-speed="3000" data-refresh-interval="50">0</span>
                                    </div>
                                    <h3 className="count-title ">Employees</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            

                
            </div >
        </div >
    )
}
