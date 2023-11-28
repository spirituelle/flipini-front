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
                let amount = parseInt( item.getAttribute( 'data-to' )!, 10 ) - parseInt( item.getAttribute( 'data-from' )!, 10 );
                let time = parseInt( item.getAttribute( 'data-speed' )!, 10 );
                let interval = parseInt( item.getAttribute( 'data-refresh-interval' )!, 10 );
                let pt = 0;
                let flag = 0;
    
                countToScrollHandler(amount, time, interval, pt, flag, item)
    
              
            }
        }
    }
    function countToScrollHandler (amount: number, time: number, interval: number, pt: number, flag: number, item: Element) {
        if ( pt <= time  ) {
            if ( 0 === flag ) {
                let timerId = setInterval( () => {
                    if ( pt >= time ) {
                        clearInterval( timerId );
                    }

                    item.innerHTML =   (( pt * amount ) / time).toFixed(2).toString();
                    pt = pt + interval;
                }, interval );
            }

            flag = 1;
        }
    }
    useEffect( () => {
        countTo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return (
        <div className="about">

            <div className="page-content pb-3">
                <div className="container">
                    <div className="flex flex-row flex-wrap  mt-5">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="about-text mt-3">
                                <h1 className=" text-6xl mb-2">À Propos de {process.env.SITE_NAME} : Votre Partenaire Shopping de Confiance</h1>
                                <p>Depuis sa création, {process.env.SITE_NAME} s&apos;est érigé comme la référence incontestée pour tous ceux qui souhaitent faire des achats judicieux. Grâce à un catalogue en ligne sans cesse mis à jour, {process.env.SITE_NAME} s&apos;assure que vous ayez toujours accès aux meilleures offres du marché. Dans cet article, découvrez l&apos;histoire, la mission et la vision qui font de {process.env.SITE_NAME} votre partenaire shopping de confiance. </p>
                              
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap justify-center mt-6">
                        <div className="basis-full ">
                            <div className="icon-box icon-box-sm">
                                {/* <span className="icon-box-icon">
                                    <i className="icon-puzzle-piece"></i>
                                </span> */}
                                <div className="icon-box-content">
                                    <h2 className="icon-box-title">Une Histoire Centrée sur le Consommateur</h2>
                                    <p className="md:px-4">Depuis le début, {process.env.SITE_NAME} s&apos;est consacré à simplifier la vie du consommateur. À une époque où le nombre d&apos;options d&apos;achat semble infini, nous avons reconnu la nécessité d&apos;un espace où l&apos;on peut facilement comparer et contraster les offres. De cette ambition est né {process.env.SITE_NAME}.</p>
                                </div>
                            </div>
                        </div>

                        <div className="basis-full ">
                            <div className="icon-box icon-box-sm">
                                {/* <span className="icon-box-icon">
                                    <i className="icon-life-ring"></i>
                                </span> */}
                                <div className="icon-box-content">
                                    <h2 className="icon-box-title">Une Plateforme Multi-Catégories</h2>
                                    <p className="md:px-4">Sur {process.env.SITE_NAME}, la variété est reine. Nous comprenons que chaque consommateur a des besoins différents, et c&apos;est pourquoi nous proposons une multitude de catégories, allant de la beauté à l&apos;automobile, en passant par le sport, la maison et les jouets. Que vous soyez à la recherche de produits de beauté haut de gamme ou d&apos;accessoires pour votre voiture, {process.env.SITE_NAME} a ce qu&apos;il vous faut.</p>
                                    <h3> Supermarchés </h3>
                                    <p> Parcourez les catalogues des plus grands supermarchés et découvrez des offres imbattables. Que vous prépariez un grand dîner ou que vous cherchiez simplement des produits de tous les jours, nos catalogues supermarchés vous guideront vers les meilleures affaires. </p>
                                    <h3> maison</h3>
                                    <p> Votre maison est votre sanctuaire. Sur {process.env.SITE_NAME}, vous trouverez tout ce dont vous avez besoin pour en faire un espace confortable, fonctionnel et esthétique, du mobilier aux articles de décoration. </p>
                                    <h3> Jouets </h3>
                                    <p> Les jouets éveillent l&apos;imagination et la créativité. Que vous cherchiez le cadeau parfait pour un enfant ou que vous soyez un collectionneur passionné, nos catalogues jouets vous offriront une multitude d&apos;options à des prix compétitifs. </p>
                                </div>
                            </div>
                        </div>

                        <div className="basis-full ">
                            <div className="icon-box icon-box-sm">
                                {/* <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span> */}
                                <div className="icon-box-content">
                                    <h2 className="icon-box-title">L&apos;App Mobile Flipini : Le Shopping à Portée de Main</h2>
                                    <p className="md:px-4">La technologie évolue, et {process.env.SITE_NAME} évolue avec elle. Avec <a  href="https://play.google.com/store/apps/details?id=com.ya2s.flipini&amp;pli=1" className="ck-link_selected link"> l&apos;App Mobile Flipini</a>, nous mettons le pouvoir d&apos;une expérience shopping optimale entre vos mains. Parcourez, comparez, et achetez, tout cela à partir de votre smartphone.</p>
                                </div>
                            </div>
                        </div>
                        <div className="basis-full ">
                            <div className="icon-box icon-box-sm">
                                {/* <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span> */}
                                <div className="icon-box-content">
                                    <h2 className="icon-box-title">Une Vision d&apos;Avenir</h2>
                                    <p className="md:px-4">{process.env.SITE_NAME} ne se repose jamais sur ses lauriers. Notre objectif est de continuer à innover pour offrir à nos utilisateurs une expérience sans pareil. Avec l&apos;ajout constant de nouveaux magasins, de nouvelles catégories, et des fonctionnalités innovantes sur notre plateforme, nous visons à rester à la pointe de la technologie et des tendances du marché.</p>
                                </div>
                            </div>
                        </div>
                        <div className="basis-full ">
                            <div className="icon-box icon-box-sm">
                                {/* <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span> */}
                                <div className="icon-box-content">
                                    <h2 className="icon-box-title">Pourquoi Choisir {process.env.SITE_NAME}?</h2>
                                    <p className="md:pl-20">
                                        <strong> Variété Inégalée : </strong>  Avec un catalogue aussi diversifié, vous êtes sûr de trouver exactement ce que vous cherchez.

                                    </p>
                                    <p className="md:pl-20">
                                        <strong> Mises à Jour Constantes : </strong> Nos catalogues en ligne sont régulièrement mis à jour pour refléter les promotions et offres actuelles.
                                    </p>
                                    <p className="md:pl-20">
                                        <strong> Expérience Utilisateur Optimale :  </strong>  Que ce soit sur notre site web ou via notre application mobile, nous veillons à vous offrir une navigation fluide et intuitive.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="conclusion ">
                            <div className="icon-box icon-box-sm">
                                {/* <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span> */}
                                <div className="icon-box-content">
                                    <h2 className="icon-box-title">Conclusion</h2>
                                    <p className="md:px-4">Dans un monde où le temps est précieux, {process.env.SITE_NAME} se consacre à vous faire économiser à la fois du temps et de l&apos;argent. En centralisant les meilleures offres, promotions, et catalogues en ligne, nous nous assurons que vous ayez toujours une longueur d&apos;avance dans vos décisions d&apos;achat.
Rejoignez-nous dans cette aventure shopping et découvrez pourquoi tant de personnes font confiance à {process.env.SITE_NAME} pour leurs achats quotidiens.
</p>
                                </div>
                            </div>
                        </div>
                </div>  
            </div >
        </div >
    )
}
