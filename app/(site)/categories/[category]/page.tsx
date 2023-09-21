
import Breadcrumb from './../../../../components/Breadcrumb';
import GeneralCard from "./../../../../components/Cards/generale";
import {SubCategoryModel} from './../../../../model/SubCategoryModel';
import { CategoryModel } from '../../../../model/CategoryModel';

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}

async function getCategory(category: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/sub-category-list?name=${category}`, { cache: 'no-store' });

    const data = await res.json();

    if(data)return data as CategoryPageModel;
    throw new Error
    
}

export default async function CategoryPage({params}: any){
    const category = await getCategory(params.category);
    return(
        <div className="category category-page container">
             <Breadcrumb containerClassName=""  />
            <h1> Catalogues de {category.category.name}  </h1>
            <div >
                {category.subcategories?.map((magasin, index) => {
                    if(magasin.catalogues.length ==0) return null
                    return <GeneralCard key={index} title={"Catalogues " + magasin.name} showReadMore={true} readMoreLink={`/magasins/${magasin.slug}`} catalogs={magasin.catalogues} />;
                })}
            </div>
        </div>
    )
}


 interface CategoryPageModel{
    subcategories: SubCategoryModel[],
    category: CategoryModel,
    // category_id: number,
    // name: string,
    // icon: string,
    // catalogues: BookDetailsModel[],
}