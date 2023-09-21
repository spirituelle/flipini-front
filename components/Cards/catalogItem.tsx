
'use client'; 

// import { useRouter } from 'next/navigation';

import  Link  from 'next/link';
import Image from 'next/image';


export default function catalogItem ( props: any ) {
    // const router = useRouter();
    const { catalog } = props;
    // console.log(catalog)
    if( !catalog || catalog == undefined) return( <> undefined</>)
    return (
        <div className="catalog bg-white dark:bg-slate-900 mx-2 md:mx-0">
            <Link href={ `/catalogues/${catalog.title}` }>
            {
                catalog.new ?
                    <span className="catalog-label label-new">New</span>
                    : ""
            }

            {
                catalog.sale_price ?
                    <span className="catalog-label label-sale">Sale</span>
                    : ""
            }

            {
                catalog.top ?
                    <span className="catalog-label label-top">Top</span>
                    : ""
            }

            {
                catalog.stock == 0 ?
                    <span className="catalog-label label-out">Out of Stock</span>
                    : ""
            }
            <div className="catalogue-image">
                 <picture className="catalog-media dark:bg-slate-600">
                
                    <Image
                        alt="catalog"
                        src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${catalog.thumbnail_path }`}
                        width={186}
                        height={299}
                        className="catalog-image"
                    />
                   
               
                </picture>
            </div>
           

            <div className="catalog-body">
               
                <h4 className="catalog-title">
                     { catalog.subtitle }
                </h4>

              

            </div>
            </Link>
        </div>
    )
}

