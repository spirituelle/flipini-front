import  Link  from 'next/link';

import { CategoryModel } from '../../../model/CategoryModel';
import GeneralCard from "./../../../components/Cards/generale";
import Breadcrumb from './../../../components/Breadcrumb';
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}

async function getCategories(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/category-list`);
    const data = await res.json();
    
    // return data;
    return data?.data as CategoryModel[];
}

export default async function CategoriesPage(){
    const categories = await getCategories();
    return(
        <div className="category category-page container">
            <Breadcrumb containerClassName=""  />
            <h1> Tous les categories </h1>
            <div >
                {categories?.map((category) => {
                    return <Magasin key={category.category_id} category={category} />;
                })}
                {categories?.map((category, index) => {
                    if(category.catalogues.length == 0) return null
                    return (
                        <div key={index}>
                            <GeneralCard title={category.name} readMoreLink={`/categories/${category.slug}`} showReadMore={true} catalogs={category.catalogues} />
                            {/* <h3> {category.name} </h3> */}
                            {/* <div> 

                            </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Magasin({ category }: any) {
    return (
        
            <Link href={`/categories/${category.slug}`}>
                <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 p-2.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {category.name}
            </span>
        </Link>
        

        
      );
    
  }