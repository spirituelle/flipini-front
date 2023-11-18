
import  Link  from 'next/link';
import Image from 'next/image';

import { format } from 'date-fns'
export default function CatalogItem({catalog}: any){

    return(
        
        <div className="catalog-item-expended dark:catalog-item-expended-dark bg-white dark:bg-slate-900 mb-4">
            <Link className="thumbnail" href={`/catalogues/${catalog.title}`}>
                <div className="catalogue-image"> 
            <picture className="catalog-media dark:bg-slate-600 ">
                
                <Image
                    alt="catalog"
                    src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${catalog.thumbnail_path }`}
                    width={186}
                    height={299}
                    className="catalog-image"
                />
               
           
            </picture>
            </div>
            </Link>
            <div className="catalog-info m-3">
                <div>
                    <h2 className="font-bold"> Catalogue {catalog.subcategory_name}</h2>
                    <small > {format(new Date(catalog.date_of_publication), 'dd/MM/yyyy')} - {format(new Date(catalog.date_expiration), 'dd/MM/yyyy')} </small>
                    <p className="my-2 font-normal text-gray-700 dark:text-gray-400"> Feuilletez le catalogue {catalog.subcategory_name} « {catalog.subtitle} » contenant {catalog.page_count} pages et découvrez ainsi les promotions de la semaine. </p>
                </div>
                <div className="catalog-actions">
                    <Link href={`/catalogues/${catalog.title}`} className="inline-flex catalog-actions-button items-center px-3 py-2 bg-primary">
                        Feilletez le catalogue
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
                

            </div>
        </div>

    )
  }