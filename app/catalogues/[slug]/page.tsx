

import {BookDescriptionModel} from './../../../model/BookDescriptionModel';
import {BookDetailsModel} from './../../../model/BookDetailsModel';

import GeneralCard from "./../../../components/Cards/generale";

import Item from './../../../components/image-item.js'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-list?all=all&country_id=1`);
   const catalogues = await res.json() ;
    return catalogues;
}
  
async function getCatalogDetail(slug: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-detail?country_id=1&slug=${slug}`,{ next: { tags: ['home', 'catalogue'] }});
    if(res.status === 200){
        // return res;
        const data = await res.json();
        // console.log(data);
        return data as BookDescriptionModel;
    
    }
    else{
        throw new Error
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
                {catalogDetails.book_detail.description.split('\n').map((c, index: number) => {
                    if(c == "\r") return <br key={index} />
                    return(
                        <p key={index}>
                            {c}
                        </p>
                    )
                })}
            </div>
           </section>
           <section>
                <GeneralCard title={"Catalogues simmilaires"} showReadMore={false} onlyScroll={false} readMoreLink={`/`} catalogs={catalogDetails.recommended_book} />;

            </section>
        </div>
    )
  }