
import  Link  from 'next/link';

import {BookDescriptionModel} from './../../../model/BookDescriptionModel';


import Item from './../../../components/image-item.js'
import CatalogItem from './../../../components/Cards/catalogItem'

async function getCatalogDetail(slug: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-detail?country_id=1&slug=${slug}`, { cache: 'no-store'});
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
                <h3>catalog Information</h3>
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
                <div  className="block-wrapper">
                    <div className="heading heading-flex">
                                    <div className="heading-left">
                                        <h2 className="title"> Catalogues simmilaires </h2>
                                    </div>

                                    <div className="heading-right">
                                        <Link href="/catalogs" className="title-link">Voir tous <i className="icon-long-arrow-right"></i></Link>
                                    </div>
                                </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
                            {
                            catalogDetails.recommended_book.slice(0,12).map( ( catalog, index ) =>
                                <CatalogItem catalog={ catalog } key={ index } />
                            )
                            }
                    </div>
               </div>
           </section>
        </div>
    )
  }