
import Breadcrumb from './../../../components/Breadcrumb';

import {SubCategoryModel} from './../../../model/SubCategoryModel';
import { CategoryModel } from './../../../model/CategoryModel';
import { BookDetailsModel } from './../../../model/BookDetailsModel';

import Content, {contentText} from './content';
import GeneralCard from "./../../../components/Cards/generale";
import  Link  from 'next/link';
import { notFound } from 'next/navigation'

import { Metadata } from 'next'
type Props = {
    params: { category: string }
    // searchParams: { [key: string]: string | string[] | undefined }
  }
export async function generateMetadata(
    { params }: Props,
    // parent: ResolvingMetadata
  ): Promise<Metadata> {   
    // fetch data
    const category = await getCategory(params.category);
      
    return {
        title:`Catalogues ${category.category.name} en ligne`,
        generator: `Catalogues ${category.category.name} en ligne`,
        applicationName: "Flipini",
        description: `Feuilletez les catalogues ${category.category.name} et découvrez ainsi les promotions de la semaine.` ,
        openGraph: {
            title: category.category.name,
            type: "website",
            url: "https://flipini.fr/categories/" + params.category,
            siteName: "flipini",
            description: `Feuilletez les catalogues ${category.category.name} et découvrez ainsi les promotions de la semaine.` ,
            images: [`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${category.category.icon}`],
        },
    }
  }
 

type ObjectKey = keyof typeof contentText;

export const dynamicParams = false;

export async function generateStaticParams() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/category-list?country_id=1`);
   const resJson = await res.json();
   const categories = resJson.data as CategoryModel[];
    return categories.map(cat=> ({
        category: cat.slug
    }));
}

async function getCategory(category: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/sub-category-list?name=${category}`,{ next: { tags: ['home', 'categories'] }});

    const data = await res.json();
    if(data)return data as CategoryPageModel;
    notFound()
    
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
        
        <div className="container">
            <Breadcrumb containerClassName=""  />
            <div className="flex justify-between">
                <h1> Catalogues de {category.category.name}  </h1>
                {/* <Link href={`/categories/${params.category}/plus-recent`} className="btn"> les plus récents </Link> */}
            </div>
            <section>
                <GeneralCard title={"Catalogue les plus récents"} readMoreLink={""} onlyScroll={true} showReadMore={false} catalogs={category.catalogs}  />
            </section>
            <section >
                {category.subcategories?.map((magasin, index) => {
                    if(magasin.catalogues.length ==0) return null
                    return <GeneralCard key={index} onlyScroll={false} title={"Catalogues " + magasin.name} showReadMore={true} readMoreLink={`/magasins/${magasin.slug}`} catalogs={magasin.catalogues} />;
                })}
            </section>
            <section className="categorie-description mb-10">
                {/* {content[params.category]} */}
                <Content category={params.category} />
            </section>
        </div>


        </div>
    )
}


 interface CategoryPageModel{
    catalogs: BookDetailsModel[],
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
  

