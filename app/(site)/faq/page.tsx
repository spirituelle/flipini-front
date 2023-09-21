import  Link  from 'next/link';
// import PageHeader from "~/components/features/page-header";
import Card from './../../../components/accordion/card';
import Accordion from './../../../components/accordion/accordion';
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
function FAQ () {
    return (
        <div >
            {/* <PageHeader title="F.A.Q" subTitle="Pages" />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="#">Pages</Link>
                        </li>
                        <li className="breadcrumb-item active">FAQ</li>
                    </ol>
                </div>
            </nav> */}
            <h1> Questions fréquemment posées </h1>
            <div className="page-content">
                <div className="container">

                    <Accordion adClass="accordion-rounded">
                        <Card title="Qu'est-ce que flipini.fr?" adClass="card-box card-sm bg-light">
                        Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, lflipini.frélectroménager, le bricolage, la mode et bien d&apos;autres domaines. L&apos;application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.
                        </Card>

                        <Card title="Mes données seront-elles utilisées après mon inscription?" adClass="card-box card-sm bg-light">
                            
                            Oui, vos données sont utilisées mais uniquement pour pouvoir vous recommander des catalogues et des magasins.
                        </Card>

                        <Card title="Comment puis-je partager un catalogue avec ma famille et mes amis?" adClass="card-box card-sm bg-light">
                        Actuellement, le catalogue ne peut pas être partagé juste en appuyant sur un bouton, mais le lien peut bien sûr être partagé avec la famille et les amis.
                        </Card>

                        <Card title="Comment suivre un magasin?" adClass="card-box card-sm bg-light"  >
                        Vous pouvez ajouter un magasin dans vos favoris en appuyant sur le petit cœur. Ce magasin sera directement ajouté à &quot;Mes magasins&quot;.
                        </Card>
                    </Accordion>


                    <Accordion adClass="accordion-rounded">
                        <Card title="Le catalogue de mon magasin préféré n'est pas en ligne. Comment se fait-il ?" adClass="card-box card-sm bg-light">
                        C&apos;est bien dommage. Il y a deux raisons possibles pour lesquelles le catalogue nflipini.frest pas en ligne : soit que le catalogue de votre magasin préféré n’est pas encore disponible sur notre site, dans ce cas, vous pouvez nous communiquer le nom du magasin via le formulaire de contact. Nous ferons de notre mieux pour qu’il soit en ligne dans l’espace d’une semaine. Soit que le magasin n&apos;ait simplement pas de catalogue ou brochure disponible. Nous ferons de notre mieux pour placer le catalogue dès qu’il sera disponible!
                        </Card>

                        <Card title="Quand publiez-vous les tout derniers catalogues ?" adClass="card-box card-sm bg-light">
                        Nous essayons, tous les jours, de publier les tout derniers catalogues sur flipini.fr. Les catalogues de la semaine suivante sont mis en ligne sur notre site internet durant le week-end. Visitez donc, tous les jours, notre site pour découvrir les tout derniers catalogues ou brochures!
                        </Card>

                        <Card title="Comment puis-je modifier les informations de mon compte?" adClass="card-box card-sm bg-light">
                        Une fois connecté, vous verrez votre nom en haut à droite. Positionnez votre souris à ce niveau puis cliquez sur la gestion des comptes, maintenant vous pouvez modifier vos données.
                        </Card>
                    </Accordion>

                   
                </div>
            </div>

            <div className="cta cta-display bg-image pt-4 pb-4" style={ { backgroundImage: `url(images/bg-7.jpeg)` } }>
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
            </div>
        </div>
    )
}

export default FAQ;