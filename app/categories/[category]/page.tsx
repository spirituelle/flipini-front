
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
        title:`${category.category.meta_title}`,
        generator: `${category.category.meta_title}`,
        applicationName: "Flipini",
        description: `${category.category.meta_description}`,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${params.category}`,
        },
        openGraph: {
            title: category.category.meta_title,
            type: "website",
            url:process.env.NEXT_PUBLIC_SITE_URL+ "/categories/" + params.category,
            siteName: "flipini",
            description: `${category.category.meta_description}`,
            images: [`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${category.category.icon}`],
        },
    }
  }
 

type ObjectKey = keyof typeof contentText;

export const dynamicParams = false;

export async function generateStaticParams() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/category-slug-list?country_id=${process.env.COUNTRY_ID}`,{ next: { tags: [ 'categories'] }});
   const resJson = await res.json();
   const categories = resJson as CategoryModel[];
    return categories.map(cat=> ({
        category: cat.slug
    }));
}

async function getCategory(category: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/sub-category-list?name=${category}&country_id=${process.env.COUNTRY_ID}`,{ next: { tags: ['home', 'categories'] }});

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
                {
                    category.category.description &&
                    <div className="mb-5 description" dangerouslySetInnerHTML={{__html: category.category.description}}>
                        
                    </div>
                }
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
  

