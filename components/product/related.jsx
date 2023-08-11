
'use client';

import React from 'react';
// import CatalogItem from '~/components/features/products/product-six';
// import OwlCarousel from '~/components/features/owl-carousel';
// import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import { Carousel } from "@material-tailwind/react";
import Carousel from './Carousel'
// import { mainSlider8 } from '~/utils/data';
const responsive = {
    0: { 
        items: 1
    },
    568: { 
        items: 2
    },
    1024: {
        items: 6, 
        itemsFit: 'fill'
    },
};
function RelatedProducts ( props ) {
    const { catalogs } = props;
    // const items= 
    
    return (
      
            <Carousel title={"Catalogues similaires"} className="">
                
            </Carousel>
    );
}

export default RelatedProducts;