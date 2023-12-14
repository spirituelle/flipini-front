import  Link  from 'next/link';

import { CategoryModel } from '../../model/CategoryModel';
import GeneralCard from "./../../components/Cards/generale";
import Breadcrumb from './../../components/Breadcrumb';
import { Metadata } from 'next'
import  Image  from 'next/image';


export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categories`,
    },
}

async function getCategories(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/category-list?country_id=${process.env.COUNTRY_ID}`,{ next: { tags: ['home', 'categories'] }});
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
                <div className="flex overflow-x-scroll">
                    {categories?.map((category) => {
                        return <Magasin key={category.category_id} category={category} />;
                    })}
                </div>
               
                {categories?.map((category, index) => {
                    if(category.catalogues.length == 0) return null
                    return (
                        <div key={index}>
                            <GeneralCard title={category.name} onlyScroll={false} readMoreLink={`/categories/${category.slug}`} showReadMore={true} catalogs={category.catalogues} />
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
        
        <Link  className="flex-none py-6 px-3 first:pl-6 last:pr-6" href={`/categories/${category.slug}`}>
        <div className="flex flex-col items-center justify-center gap-3 p-3 rounded-3xl magasin-rounded">
            <span className="w-16 h-16 p-2">
                <Image alt={category.name} width={64} height={64} src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${category.icon}`} className=""  />
            </span>
            <strong className="text-slate-900 text-xs font-medium dark:text-slate-200"> {category.name} </strong>
        </div>
    </Link>

        
      );
    
  }