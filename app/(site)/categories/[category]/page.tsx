
import Breadcrumb from './../../../../components/Breadcrumb';

import {SubCategoryModel} from './../../../../model/SubCategoryModel';
import { CategoryModel } from '../../../../model/CategoryModel';

import Content, {contentText} from './content';
import GeneralCard from "./../../../../components/Cards/generale";

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
type ObjectKey = keyof typeof contentText;

import  Link  from 'next/link';

async function getCategory(category: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/sub-category-list?name=${category}`, { cache: 'no-store' });

    const data = await res.json();

    if(data)return data as CategoryPageModel;
    throw new Error
    
}

export default async function CategoryPage({params}: {params: {category: ObjectKey}}){
    const category = await getCategory(params.category);

    return(
        <div className="category category-page flex flex-row no-wrap">
            <div className="aside">
                <h2> {category.category.name}  </h2>
                <ul>
                    {category.subcategories?.map((magasin, index) => {
                        // if(magasin.catalogues.length ==0) return null
                        return <li className="aside-link" key={index}> <Link className="" href={`/magasins/${magasin.slug}`}> {magasin.name} </Link> </li>
                    })}
                </ul>
            </div>
        
        <div className=" ">
            <Breadcrumb containerClassName=""  />
            <div className="flex justify-between">
                <h1> Catalogues de {category.category.name}  </h1>
                <Link href={`/categories/${params.category}/plus-recent`} className="btn"> les plus récents </Link>
            </div>
          
            <div >
                {category.subcategories?.map((magasin, index) => {
                    if(magasin.catalogues.length ==0) return null
                    return <GeneralCard key={index} title={"Catalogues " + magasin.name} showReadMore={true} readMoreLink={`/magasins/${magasin.slug}`} catalogs={magasin.catalogues} />;
                })}
            </div>
            <div className="categorie-description mb-10">
                {/* {content[params.category]} */}
                <Content category={params.category} />
            </div>
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
// type contentType = {
//     supermarches: Element[]
//   }
  

