

import {BookDescriptionModel} from './../../../model/BookDescriptionModel';
// import {BookDetailsModel} from './../../../model/BookDetailsModel';

import GeneralCard from "./../../../components/Cards/generale";

import Item from './../../../components/image-item.js'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

export const dynamicParams = true;

type Props = {
    params: { slug: string }
    // searchParams: { [key: string]: string | string[] | undefined }
  }

  export async function generateMetadata(
    { params }: Props,
    // parent: ResolvingMetadata
  ): Promise<Metadata> {   
    // fetch data
    const catalog = await getCatalogDetail(params.slug);
      
    return {
        title: catalog.book_detail.name,
        generator: `${catalog.book_detail.subcategory_name}`,
        applicationName: "Flipini",
        description: `Feuilletez le catalogue ${catalog.book_detail.subcategory_name} « ${catalog.book_detail.subtitle} » contenant ${catalog.book_detail.page_count} pages et découvrez ainsi les promotions de la semaine.` ,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/catalogues/${params.slug}`,
        },
        openGraph: {
            title: catalog.book_detail.name,
            type: "website",
            url:process.env.NEXT_PUBLIC_SITE_URL + "/catalogues/"+ params.slug,
            siteName: "flipini",
            description: `Feuilletez le catalogue ${catalog.book_detail.subcategory_name} « ${catalog.book_detail.subtitle} » contenant ${catalog.book_detail.page_count} pages et découvrez ainsi les promotions de la semaine.` ,
            images: [`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${catalog.book_image_data[0].path}`],
        },
    }
  }
 
  
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-list?all=all&country_id=${process.env.COUNTRY_ID}`, {cache: "no-cache" });
   const catalogues = await res.json() ;
    return catalogues;
}
  
async function getCatalogDetail(slug: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-detail?country_id=${process.env.COUNTRY_ID}&slug=${slug}`,{ next: { tags: ['home', 'catalogue'] }});
    if(res.status === 200){
        // return res;
        const data = await res.json();
        if(data.status === 404) return notFound();
        // console.log(data);
        return data as BookDescriptionModel;
    }
    else{
        notFound()
    }
    
}

export default async function CatalogueDetails({params}: any) {
    const catalogDetails  = await getCatalogDetail(params.slug);  

    return (
        <div className="catalog-page">
       
            <Item catalog={catalogDetails.book_detail} images={catalogDetails.book_image_data} />
           <section className="container mt-10">
               {/* <h1> {catalogDetails.book_detail.name} </h1> */}
               {/* <Info catalog={ catalogDetails.book_detail } /> */}

               <div className="catalog-desc-content">
                <h1> {catalogDetails.book_detail.name} </h1>
                {/* {parse(catalog.description.split('\n'))}  */}
                {
                        /<\/?[a-z][\s\S]*>/i.test(catalogDetails.book_detail.description)  ?
                        <div className="mb-5 description" dangerouslySetInnerHTML={{__html: catalogDetails.book_detail.description}}>
                           
                        </div>
                        :
                        catalogDetails.book_detail.description.split('\n').map((c, index: number) => {
                            if(c == "\r") return <br key={index} />
                            return(
                                <p key={index}>
                                    {c}
                                </p>
                            )
                        })
                    }
                {/* {catalogDetails.book_detail.description.split('\n').map((c, index: number) => {
                    if(c == "\r") return <br key={index} />
                    return(
                        <p key={index}>
                            {c}
                        </p>
                    )
                })} */}
            </div>
           </section>
           <section>
                <GeneralCard title={"Catalogues simmilaires"} showReadMore={false} onlyScroll={false} readMoreLink={`/`} catalogs={catalogDetails.recommended_book} />

            </section>
        </div>
    )
  }