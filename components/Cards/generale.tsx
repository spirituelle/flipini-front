// import ALink from '~/components/features/alink';
import CatalogItem from './catalogItem';
// import OwlCarousel from './owlCarosel';
import  Link  from 'next/link';
// Import Utils
// import { productSlider } from '~/utils/data';
import { BookDetailsModel } from '../../model/BookDetailsModel';

function GeneralCard ( {catalogs, title, showReadMore, readMoreLink, onlyScroll}:{catalogs: BookDetailsModel[], title: string,showReadMore: boolean, readMoreLink: string, onlyScroll: boolean }) {
    // const { Card } = props;
let classNames= "overflow-x-scroll flex flex-row ";
classNames+= onlyScroll ? "space-x-3" : "md:grid md:grid-cols-1 md:gap-x-6 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8"
    return (
        <div className=" bg-light pt-5 pb-5 mb-5">
            <div className="block">
                <div className="block-wrapper">
                    <div className="">
                        <div className="heading heading-flex">
                            <div className="heading-left">
                                <h2 className="title">{title}</h2>
                            </div>
                            {showReadMore &&
                                <div className="heading-right">
                                    <Link href={readMoreLink} className="title-link">Voir tous <i className="icon-long-arrow-right"></i></Link>
                                </div>
                            }
                            
                        </div>
                        <div className={classNames }>
                            {
                                catalogs?.length > 0 ?
                                catalogs.map( ( catalog, index: number ) =>
                                        <CatalogItem catalog={ catalog } key={index } />
                                        // <p> alo </p>
                                    )
                                    :
                                    new Array( 6 ).fill( 1 ).map( ( item, index ) => (
                                        <div className="skel-pro" key={ "Skeleton" + index }></div>
                                    ) )
                            }
                        </div>
                           
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralCard;
