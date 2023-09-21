import  Link  from 'next/link';
import slugify from 'slugify';
import { BookDetailsModel } from '../../../model/BookDetailsModel';
import GeneralCard from "./../../../components/Cards/generale";
import Breadcrumb from './../../../components/Breadcrumb';

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}

async function getCatalogues(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/newest-book`, { cache: 'no-store' });
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
            <div >
            <GeneralCard title="Nouveaux Catlogues" readMoreLink={"/"} showReadMore={false} catalogs={catalogues} />
            </div>
        </div>
    )
}


  