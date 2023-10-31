
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/constact`,
    },
}
function Contact () {
    return (
        <div className="main">
       
            <div className="page-content">

                <div className="container">
                   

                    <hr className="mt-3 mb-5 mt-md-1" />
                    <div className="touch-container flex flex-row flex-wrap justify-center">
                        <div className="basis-7/12 md:basis-9/12 ">
                            <div className="text-center">
                                <h2 className="title mb-1">Contactez-nous</h2>
                                <p className="lead text-primary">
                                Nous collaborons avec des marques et des personnes ambitieuses ; nous aimerions construire quelque chose de grand ensemble.
							    </p>
                                {/* <p className="mb-3">Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p> */}
                            </div>

                            <form action="#" className="contact-form mb-2 flex flex-col gap-y-8 ">
                                <div className="flex flex-row flex-wrap gap-y-8 gap-x-6">
                                    <div className=" basis-2/5">
                                        <label htmlFor="cname" className="sr-only">Nom</label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6" id="cname" placeholder="Nom *" required />
                                    </div>

                                    <div className=" basis-2/5">
                                        <label htmlFor="cemail" className="sr-only">Email</label>
                                        <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6" id="cemail" placeholder="Email *" required />
                                    </div>

                                </div>

                                <label htmlFor="csubject" className="sr-only">Sujet</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6" id="csubject" placeholder="Subject" />

                                <label htmlFor="cmessage" className="sr-only">Message</label>
                                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:leading-6" cols={30} rows={4}  id="cmessage" required placeholder="Message *"></textarea>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                        <span>Envoyez</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;