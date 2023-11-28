import  Link  from 'next/link';
// import PageHeader from "~/components/features/page-header";
import Card from './../../components/accordion/card';
import Accordion from './../../components/accordion/accordion';
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
    },
}
function FAQ () {
    return (
        <div className="container" >
    
            <h1> FAQ {process.env.SITE_NAME} : Vos Questions, Nos Réponses </h1>
            <p> Bienvenue sur la page FAQ de {process.env.SITE_NAME}, votre source incontournable pour tous vos besoins d&apos;achat. Face à une plateforme aussi complète que la nôtre, il est naturel d&apos;avoir des interrogations. Dans cet article, nous répondons aux questions les plus fréquemment posées par nos utilisateurs, en vous offrant un aperçu détaillé de tout ce que vous pouvez attendre de {process.env.SITE_NAME}. </p>
            <div className="page-content">
                <div className="">

                    <Accordion adClass="accordion-rounded">
                        <Card title="Qu&apos;est-ce que {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        {process.env.SITE_NAME} est une plateforme en ligne qui centralise les meilleures offres, promotions et catalogues en ligne pour une variété de catégories allant des supermarchés, à la beauté, en passant par l&apos;auto, la maison, les bijouteries et bien plus encore. Notre mission est de simplifier votre expérience shopping en mettant à votre disposition un large éventail d&apos;options au même endroit.
                        </Card>

                        <Card title="Comment fonctionne {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                            Notre équipe se consacre à parcourir le web à la recherche des meilleures offres et promotions des grands magasins et des marques populaires. Ces offres sont ensuite compilées et catégorisées sur notre site pour une navigation facile et intuitive.
                        </Card>

                        <Card title="Est-ce gratuit d&apos;utiliser {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        Oui, l&apos;utilisation de {process.env.SITE_NAME} est totalement gratuite pour les utilisateurs. Notre objectif principal est de vous aider à faire des économies et à trouver les meilleures affaires sans frais supplémentaires.
                        </Card>

                        <Card title="Puis-je faire des achats directement sur {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light"  >
                        {process.env.SITE_NAME} est une plateforme de catalogues en ligne. Nous vous dirigeons vers les meilleures offres, mais les achats sont réalisés directement sur les sites web des magasins ou des marques concernés. Ainsi, vous bénéficiez toujours des conditions d&apos;achat et des garanties offertes par ces enseignes.
                        </Card>
                    </Accordion>


                    <Accordion adClass="accordion-rounded">
                        <Card title="Comment sont sélectionnées les offres présentes sur {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        Nous collaborons avec une variété de partenaires et de magasins pour vous assurer une sélection de qualité. Chaque offre est soigneusement vérifiée par notre équipe pour garantir son authenticité et sa pertinence.
                        </Card>

                        <Card title="Comment utiliser l&apos;App Mobile Flipini ?" adClass="card-box card-sm bg-light">
                        <a  href="https://play.google.com/store/apps/details?id=com.ya2s.flipini&amp;pli=1" className="ck-link_selected link"> l&apos;App Mobile Flipini</a> est conçue pour offrir une expérience d&apos;achat fluide sur mobile. Téléchargez simplement l&apos;application depuis votre store préféré, inscrivez-vous ou connectez-vous, et commencez à parcourir les offres et catalogues à votre guise. Grâce à une interface intuitive, vous pouvez facilement naviguer entre les différentes catégories, marquer vos offres préférées et être alerté des nouvelles promotions.
                        </Card>

                        <Card title="Est-ce que {process.env.SITE_NAME} couvre toutes les régions de {process.env.COUNTRY_NAME} ?" adClass="card-box card-sm bg-light">
                        Oui, {process.env.SITE_NAME} vise à couvrir l&apos;ensemble du territoire français. Cependant, certaines offres ou promotions peuvent être spécifiques à une région ou à un magasin en particulier. Nous recommandons toujours de vérifier les détails de chaque promotion.
                        </Card>
                    </Accordion>
                    <Accordion adClass="accordion-rounded">
                        <Card title="Comment sont catégorisées les offres sur {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        Les offres sont soigneusement classées en plusieurs catégories comme les supermarchés, la beauté, l&apos;automobile, la maison, les bijouteries, et bien d&apos;autres encore. Chaque catégorie est ensuite subdivisée en sous-catégories ou en magasins spécifiques pour faciliter votre recherche.
                        </Card>

                        <Card title="Que faire si je trouve une erreur ou un problème sur le site ?" adClass="card-box card-sm bg-light">
                        Nous nous efforçons d&apos;assurer la précision de toutes les informations sur {process.env.SITE_NAME}. Cependant, si vous identifiez une erreur ou rencontrez un problème, n&apos;hésitez pas à nous contacter via notre formulaire de contact. Votre feedback est précieux pour nous.
                        </Card>

                        <Card title="Est-ce que {process.env.SITE_NAME} propose des offres exclusives ?" adClass="card-box card-sm bg-light">
                        Oui, {process.env.SITE_NAME} collabore régulièrement avec ses partenaires pour vous proposer des offres exclusives que vous ne trouverez nulle part ailleurs. Ces offres sont clairement indiquées sur notre site et notre application mobile.
                        </Card>
                    </Accordion>
                    <Accordion adClass="accordion-rounded">
                        <Card title="Puis-je m&apos;abonner pour recevoir les dernières offres et promotions ?" adClass="card-box card-sm bg-light">
                        Absolument ! Vous pouvez vous inscrire à notre newsletter depuis notre site. Ainsi, vous serez régulièrement informé des dernières promotions, des arrivages récents et des offres spéciales directement dans votre boîte mail.
                        </Card>

                        <Card title="Comment {process.env.SITE_NAME} garantit-il la confidentialité de mes données ?" adClass="card-box card-sm bg-light">
                        La sécurité et la confidentialité de vos données sont primordiales pour nous. Nous disposons de mesures de sécurité robustes pour protéger vos informations. De plus, nous ne partageons jamais vos données avec des tiers sans votre consentement explicite. Pour plus de détails, vous pouvez consulter notre politique de confidentialité.
                        </Card>

                        <Card title="Y a-t-il une limite au nombre d&apos;offres que je peux consulter par jour sur {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        Non, il n&apos;y a aucune limite. Vous pouvez parcourir autant d&apos;offres et de catalogues que vous le souhaitez, à tout moment de la journée.
                        </Card>
                    </Accordion>
                    <Accordion adClass="accordion-rounded">
                        <Card title="Est-il possible de donner mon avis sur une offre ou un catalogue sur {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        Oui, nous apprécions toujours les retours de nos utilisateurs. Vous avez la possibilité de laisser des commentaires et d&apos;évaluer les offres sur notre plateforme. Votre avis nous aide à améliorer continuellement notre service.
                        </Card>

                        <Card title="{process.env.SITE_NAME} est-il disponible dans d&apos;autres pays ou uniquement en {process.env.COUNTRY_NAME} ?" adClass="card-box card-sm bg-light">
                        Actuellement, {process.env.SITE_NAME} est focalisé sur le marché français. Cependant, nous avons des ambitions d&apos;expansion et envisageons de couvrir d&apos;autres régions à l&apos;avenir.
                        </Card>

                        <Card title="Puis-je proposer mon magasin ou ma marque pour être présent sur {process.env.SITE_NAME} ?" adClass="card-box card-sm bg-light">
                        Bien sûr ! Si vous souhaitez collaborer avec nous et présenter vos offres sur {process.env.SITE_NAME}, n&apos;hésitez pas à nous contacter. Nous sommes toujours à la recherche de nouveaux partenariats pour enrichir notre plateforme.
                        </Card>
                    </Accordion>

                   
                </div>
            </div>
            <div className="mb-8">
                <h2> Conclusion </h2>
                <p>
                {process.env.SITE_NAME} est bien plus qu&apos;une simple plateforme d&apos;offres en ligne. C&apos;est votre allié incontournable pour une expérience shopping optimale. Nous espérons que cette FAQ vous a éclairé sur notre fonctionnement et notre vision. Si vous avez d&apos;autres questions, n&apos;hésitez pas à nous contacter directement. Notre équipe est toujours prête à vous assister dans vos démarches shopping.
                </p>
            </div>
            {/* <div className="cta cta-display bg-image pt-4 pb-4" style={ { backgroundImage: `url(images/bg-7.jpeg)` } }>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-9 col-xl-7">
                            <div className={ `row no-gutters flex-sm-row align-items-sm-center` } >
                                <div className="col">
                                    <h3 className="cta-title text-white">If You Have More Questions</h3>
                                    <p className="cta-desc text-white">Quisque volutpat mattis eros</p>
                                </div>

                                <div className="col-auto">
                                    <Link href="/contact" className="btn btn-outline-white"><span>CONTACT US</span><i className="icon-long-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default FAQ;