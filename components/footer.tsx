// 'use client'
import Image from 'next/image'
import  Link  from 'next/link';

// import { useSearchParams } from 'next/navigation';
// import {useCallback} from 'react'

function Footer () {
    // const searchParams = useSearchParams();

    // const createQueryString = useCallback(
    //     (name: string, value: string) => {
    //       const params = new URLSearchParams(Array.from(searchParams.entries()))
    //       params.set(name, value)
     
    //       return params.toString()
    //     },
    //     [searchParams]
    //   )

    return (
        <footer className="footer footer-2 bg-white dark:bg-gray-700">
            <div className="footer-middle">
                <div className="container">
                    <div className="flex flex-row flex-wrap">
                        <div className="basis-7/12">
                            <div className="widget widget-about">
                                <Link prefetch={false} href="/">
                                    <Image src="/images/app-icon.png" className="footer-logo" alt="Footer Logo" width={105} height={25} />
                                </Link>

                                <p>{process.env.SITE_NAME} est votre destination privilégiée pour le shopping en ligne. Parcourez nos catalogues en ligne mis à jour chaque semaine et découvrez les meilleures offres et promotions dans diverses catégories telles que Bricolage, Bio, Jardinerie, Bazar, Sport, Auto, Beauté, Bijouterie, Supermarché, Maison, et Jouets. Chaque catalogue est une invitation à découvrir une multitude de produits à des prix imbattables. Pour une expérience d&apos;achat optimisée, téléchargez l&apos;app mobile Flipini et emportez toutes ces offres dans votre poche. Rejoignez la communauté Flipini et profitez des bonnes affaires à portée de clic ! </p>

                            </div>
                        </div>

                        <div className="basis-5/12">
                            <div className="flex flex-row flex-wrap">
                                <div className="sm:basis-2/3">
                                        <h3 className="widget-title">Information</h3>

                                        <ul className="widget-list">
                                            <li><Link prefetch={false} href="/about">À propos flipini</Link></li>
                                            <li><Link prefetch={false} href="/faq">Questions fréquemment posées</Link></li>
                                            <li><Link prefetch={false} href="/contact">Contactez-nous</Link></li>
                                             
                                        <li className={ "" }>
                                                <Link prefetch={false} href="/nouveaux-catalogues" className="sf-with-ul" >Nouveaux catalogues</Link>           
                                        </li>
                                        <li className={ "" }>
                                                <Link prefetch={false} href="/magasins" className="sf-with-ul" >Magasins</Link>           
                                        </li>
                                        <li className={ "" }>
                                                <Link prefetch={false} href="/categories" className="sf-with-ul" >Categories</Link>           
                                        </li>
                                        </ul>
                                </div>

                             
                                <div className="sm:basis-1/3">
                                        <h3 className="widget-title">Service Clients</h3>

                                        <ul className="widget-list">
                                            <li><Link prefetch={false} href="/terms-and-conditions">Termes et conditions</Link></li>
                                            <li><Link prefetch={false} href="/politique-de-confidentialite">politique de confidentialité</Link></li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="footer-copyright"> © { ( new Date() ).getFullYear() } FLIPINI. Tous les droits sont réservés.</p>
                </div>
            </div>
          
        </footer>
    );
}

export default Footer;