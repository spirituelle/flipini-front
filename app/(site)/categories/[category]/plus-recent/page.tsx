
import Breadcrumb from './../../../../../components/Breadcrumb';

import {SubCategoryModel} from './../../../../../model/SubCategoryModel';
import { CategoryModel } from '../../../../../model/CategoryModel';
import { BookDetailsModel } from '../../../../../model/BookDetailsModel';
import GeneralCard from "./../../../../../components/Cards/generale";

import CategoriesWithOrder from './../../component/withOrder'
import Content, {contentText} from './../content';

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
type ObjectKey = keyof typeof contentText;


async function getCategory(category: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-list?category_slug=${category}`, { cache: 'no-store' });

    const data = await res.json();

    if(data)return data.data as BookDetailsModel[];
    throw new Error
    
}

export default async function CategoryPage({params}: {params: {category: ObjectKey}}){
    const catalogs = await getCategory(params.category);
    return(
        <div className="category category-page container">
             <Breadcrumb containerClassName=""  />
            {/* <h1> Catalogues de {category.category.name}  </h1> */}
            {/* <CategoriesWithOrder category={category.subcategories} /> */}
            <div className="categorie-description mb-10">
                {/* {content[params.category]} */}

                <GeneralCard title={"Catalogue les plus récents"} readMoreLink={""} onlyScroll={false} showReadMore={false} catalogs={catalogs}  />
                <Content category={params.category} />
            </div>
        </div>
    )
}




