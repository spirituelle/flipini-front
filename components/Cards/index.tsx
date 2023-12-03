// import ALink from '~/components/features/alink';
'use client'; 
import CatalogItem from './catalogItem';
// import OwlCarousel from './owlCarosel';
import  Link  from 'next/link';
// Import Utils
// import { productSlider } from '~/utils/data';
import { CardModel } from '../../model/CardModel';

function Cards ( {card}:{card: CardModel }) {
    // const { Card } = props;

    return (
        <div className="catalogs-card bg-light p-5 mb-5">
            <div className="heading heading-flex">
                <div className="heading-left">
                    <h2 className="title">{card.title}</h2>
                </div>

                <div className="heading-right">
                    <Link href={ `/tous-catalogues/${card.slug}` } className="title-link">Voir tous <i className="icon-long-arrow-right"></i></Link>
                </div>
            </div>
            <div className="overflow-x-scroll flex flex-row md:grid md:grid-cols-1 md:gap-x-6 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
                {
                    card.bookList.map( ( catalog, index: number ) =>
                            <CatalogItem catalog={ catalog } key={index } />
                        )
                }
            </div>              
        </div>
    )
}

export default Cards;
