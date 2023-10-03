
import Breadcrumb from './../../../components/Breadcrumb';
import GeneralCard from "./../../../components/Cards/generale";
import {CardModel} from './../../../model/CardModel';

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    // alternates: {
    //     canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tous-catalogues/${params.slug}`,
    // },
}
async function getCategory(type: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/dashboard-detail?card=${type}`,{ next: { tags: ['home', 'catalogues'] }});

    const data = await res.json();
    // console.log(data)
    if(data)return data as CardModel;
    throw new Error
    
}

export default async function CategoryPage({params}: any){
    const card = await getCategory(params.type);
    return(
        <div className="category category-page container">
             <Breadcrumb containerClassName=""  />
            <div >
                     <GeneralCard title={" " + card.title} showReadMore={false} onlyScroll={false} readMoreLink={`/`} catalogs={card.bookList} />;
            </div>
        </div>
    )
}


