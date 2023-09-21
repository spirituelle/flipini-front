
import Breadcrumb from './../../../../components/Breadcrumb';
import GeneralCard from "./../../../../components/Cards/generale";
import {CardModel} from './../../../../model/CardModel';
import { CategoryModel } from '../../../../model/CategoryModel';
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
async function getCategory(type: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/dashboard-detail?card=${type}`, { cache: 'no-store' });

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
            {/* <h1> Catalogues de {card.title}  </h1> */}
            <div >
                {/* {card.bookList?.map((book, index) => { */}
                     <GeneralCard title={" " + card.title} showReadMore={false} readMoreLink={`/`} catalogs={card.bookList} />;
                {/* })} */}
            </div>
        </div>
    )
}


