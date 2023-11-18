
// 'use client'; 

// import { useRouter } from 'next/navigation';

import  Link  from 'next/link';
import Image from 'next/image';
import { formatDistance, compareDesc } from 'date-fns'
import fr from 'date-fns/locale/fr';

export default function catalogItem ( props: any ) {
    // const router = useRouter();
    const { catalog } = props;
    // console.log(catalog)
    if( !catalog || catalog == undefined) return( <> undefined</>)
    const calculateTime = () => {
        
        if(compareDesc(new Date(catalog.date_of_publication), new Date()) == -1){
            return `Valable dans ${formatDistance(new Date(catalog.date_of_publication), new Date(), {includeSeconds: false, locale: fr})}`
        }
        return  `Valable encore ${formatDistance(new Date(), new Date(catalog.date_expiration+" 23:59:59"), {includeSeconds: false, locale: fr})} `
    }
    return (
        <div className="catalog bg-white dark:bg-slate-900 mx-2 md:mx-0 flex-none">
            <Link prefetch={false} href={ `/catalogues/${catalog.title}` }>
            {
                catalog.new ?
                    <span className="catalog-label label-new">New</span>
                    :null
            }

            {
                catalog.top ?
                    <span className="catalog-label label-top">Top</span>
                    : null
            }

            <div className="catalogue-image">
                 <picture className="catalog-media dark:bg-slate-600">
                
                    <Image
                        alt="catalog"
                        src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${catalog.thumbnail_path }`}
                        width={186}
                        height={299}
                        className="catalog-image"
                    />
                   
               
                </picture>
            </div>
           

            <div className="catalog-body">
               <p className="mb-2 text-xs"> {`Catalogue ${catalog.subcategory_name}`} </p>
                <h3 className="catalog-title font-bold">
                     { catalog.subtitle }
                </h3>

              <span className="text-xs"> {calculateTime()} </span>

            </div>
            </Link>
        </div>
    )
}

