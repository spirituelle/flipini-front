
import { BookDetailsModel } from './../../model/BookDetailsModel';
import Breadcrumb from './../../components/Breadcrumb';

import NewestWithMore from './component/newestWithMore'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/nouveaux-catalogues`,
    },
}

async function getCatalogues(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/newest-book?country_id=1&page=1&per_page=24`,{ next: { tags: ['home', 'catalogues'] }});
    const data = await res.json();
    
    // return data;
    return data?.data as BookDetailsModel[];
}

export default async function NewCatalogPage(){
    const catalogues = await getCatalogues();
    return(
        <div className="category category-page container">
            <Breadcrumb containerClassName=""  />
            {/* <h1>  </h1> */}
            {/* <div > */}
            <NewestWithMore initialItems={catalogues} search=""  />
            
            {/* </div> */}
        </div>
    )
}


  