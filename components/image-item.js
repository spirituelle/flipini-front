'use client';

import React, { useEffect, useState, useRef } from "react";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom, Navigation, Thumbs, FreeMode } from "swiper";
import  Link  from 'next/link';
import axios from './../lib/axios'
import { v4 as uuidv4 } from 'uuid';
import { getCookie, setCookie } from "cookies-next";

import FullscreenIcon from './../assets/icons/fullscreen.svg'
import ExitFullscreen from './../assets/icons/exitFullscreen.svg'
import Navoverview from './../assets/icons/navOverview.svg'
import ZoomIn from './../assets/icons/zoomIn.svg'
import ZoomOut from './../assets/icons/zoomOut.svg'
import FirstPage from './../assets/icons/firstpage.svg'
import LastPage from './../assets/icons/lastpage.svg'
import { format } from 'date-fns'

import { default as NextImage } from 'next/image'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/navigation";
// import 'swiper/css/lazy';
import "swiper/css/thumbs";


const loadImage = (setImageDimensions, imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
    };
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
  };
    
export default function ImageElement({images, catalog}){

    const [imageDimensions, setImageDimensions] = useState({});
    const [sliderDimentions, setSliderDimensions] = useState({});
    const [slideElement, setSliderElement] = useState({});
    const [thumbsDimentions, setThumbsDimentions] = useState({});
    const [currentIndex, setCurrentIndex] = useState(1);
    const [fullscreenState, setStateFullscreen] = useState(false);
    const [thumbsOpen, setThumbsOpen] = useState(false);
    const [swiperRef, setSwiperRef] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [width, setWidth] = useState(0);
    const [elementToShow, setElementsToshow] = useState([]);
    const [thumbsToShow, setThumbsToShow] = useState([]);
    const [showInterstitialAd, seSshowInterstitialAd] = useState(false);
    const [changed, setChanged] = useState(false);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    var Adindex = 6;

    const isMobile = width <= 768;
    let indexes = elementToShow.length
  
    let elements= [];
    let cloned  =[...images];
    let thumbs = [];

    const imageUrl = process.env.NEXT_PUBLIC_STORAGE_END_POINT + "/" + images[0].path;
    const slider = useRef(null);
    const navigationPrevRef = useRef(null)
      const navigationNextRef = useRef(null)

    // const currentScaleRef = useRef(currentScale);

    const handle = useFullScreenHandle();

    const openThumbs = ( e) => {
        setThumbsOpen(old => !old)
    }
    const handleSlideChange = (i) => {
        setCurrentIndex(i.activeIndex + 1);
        setChanged(true);
        setTimeout(() => {
            setChanged(false)
        }, 1000);

    }
    useEffect(() => {
        // console.log(currentIndex % Adindex == 0)
        if(currentIndex % Adindex == 0 && currentIndex!= 0 ){
            seSshowInterstitialAd(true)
        }else{
            seSshowInterstitialAd(false)
        }
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])
    
    useEffect(() => {
        let sliderObserver = slider?.current;
        window.addEventListener('resize', handleWindowSizeChange);
        setWidth(window.innerWidth);


      loadImage(setImageDimensions, imageUrl);
      setSliderDimensions({ width: sliderObserver.offsetWidth, height: (sliderObserver.offsetHeight ) });

      const resizeObserver = new ResizeObserver((entries) => {
            // You can iterate all of the element entries observed
            for (const entry of entries) {
            // Do something on resize, access the element on `entry.target`
            setSliderDimensions({width: entry.contentRect.width, height: (entry.contentRect.height ) })
            }
        });
        
        // 👇 Listen to resize events on the element with `myElement` class
        resizeObserver.observe(sliderObserver);

        let visitorUUID = getCookie("visitorUUID") // unique vistor uuid
        if(!visitorUUID){
            visitorUUID = uuidv4();
            setCookie("visitorUUID", visitorUUID);
        }
        // book-viewcount
        process.env.NODE_ENV === "production" && axios.get(`api/book-viewcount?slug=${catalog.title}&uuid=${visitorUUID}`);

        if(process.env.NODE_ENV === "production"){
            var ads = document.getElementsByClassName('adsbygoogle').length;
            for (var i = 0; i < ads; i++) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (e) {}
            }
            
        }
       
        return () => {
            resizeObserver.unobserve(sliderObserver);
            window.removeEventListener('resize', handleWindowSizeChange);
        }
     
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    useEffect(() => {
        if(Object.keys(imageDimensions).length !== 0 ){
            let ratio = imageDimensions.width / imageDimensions.height; 
            setSliderElement({height:  sliderDimentions.height, width: sliderDimentions.height * ratio * 2  }) // * 2 for 2 image element in same slide
            setThumbsDimentions({height:  (sliderDimentions.height / 5), width: (sliderDimentions.height/5) * ratio * 2  }) // thumbnails 20% = /5 height
        }
    }, [imageDimensions, sliderDimentions]);

  
    useEffect(() => {
        if(width > 0){
            if(width <= 768){
                // TODO
                let es = _mobileSlider(0); // return object thumbs and element to show
                setElementsToshow(es.elements);
                setThumbsToShow(es.thumbs);
        
               }else{
                   let mes = recursiveFunction(0);
                   setElementsToshow(mes.elements);
                   setThumbsToShow(mes.thumbs);
        
        
               }
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, slideElement]);

    const handleZoom =(e) => {
        e.preventDefault();
        if(swiperRef.zoom.scale >= 4) return swiperRef.zoom.out();
        swiperRef.zoom.in(swiperRef.zoom.scale*2);
        // setScale(3)
        // swiperRef.zoom.scale = 2
    }

  
      useEffect(() => {
  
        if(swiperRef){
            var target = document.querySelectorAll('.slide')
            target.forEach((item) => {
                item.removeEventListener("mousewheel", () => {})
                item.addEventListener("mousewheel", (e) =>{
                    e.preventDefault();
                    if (e.deltaY < 0) // scrolling up
                    {
                        swiperRef.zoom.in(e)
                    }
                    else if (e.deltaY > 0) // scrolling down
                    {
                        swiperRef.zoom.out()
                    }
                })
            });
           
        }
    }, [swiperRef]);
 
    function _mobileSlider(mindex){

            // let firstSlide =cloned.splice(0,1);
            const element =   ( <SwiperSlide  key={images[mindex]?.id}>
                <div style={{ ...slideElement}}  className="swiper-zoom-container"> 
                
                    <div className="swiper-zoom-target slide">
                        
                        <div className="slideWrapper singlePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                    <NextImage alt={`Page du ${catalog.name}`} width={600} height={600} className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[mindex]?.path}`} />
                                </div>
                        </div>
                    </div> 
                </div>
                   
                         
            </SwiperSlide>);
            let thumb =  ( <SwiperSlide  key={images[mindex]?.id}>
                                
                    <div className="image-holder" style={ thumbsDimentions.width ? { height: thumbsDimentions.height, width :( thumbsDimentions.width / 2) }: {}} >
                        
                        <div style={{width: "100%"}} className="slideWrapper singlePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                    <NextImage  alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[mindex]?.path}`} />
                                </div>
                        </div>
                    </div>                    
                         
            </SwiperSlide>)
            elements.push(element);
            thumbs.push(thumb);
            if(images.length === mindex+1){
                return {elements, thumbs}
           };
            return _mobileSlider(mindex+1)
    }


    function recursiveFunction(windex){
        let isLast = images.length === windex+1;
       
        if(windex === 0){
            // let firstSlide =cloned.splice(0,1);
            const element =   ( <SwiperSlide  key={images[windex]?.id}>
                <div style={{ ...slideElement}} className="slideWrapper doublePage" >
                    <div  className="firstPage h-full"> 
                        {/* <h1> {catalog.name} </h1> */}
                        <div className="flex flex-col h-full items-center justify-center">
                            <div className="flex">
                                <div> <NextImage width={32} height={32} src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${catalog.magasin_icon}`} className="h-16 mr-3" alt="magasin Logo" /> </div>
                                <div className="flex flex-col items-start justify-center ml-3"> 
                                    <h2> {`Catalogue ${catalog.subcategory_name}`} </h2> 
                                    <h3> {catalog.subtitle} </h3> 
                                   
                                    <p className="text-xs">  { catalog.created_at ? `Publié le ${format(new Date(catalog.created_at), 'd MM yyyy')}` : ""} </p>
                                    <p className="text-xs">  {`Valable du ${format(new Date(catalog.date_of_publication), 'dd/MM/yyyy')} au ${format(new Date(catalog.date_expiration), 'dd/MM/yyyy')}`} </p>
                                </div>
                            </div>
                            <div className="catalog-ad-container" style={{width:"300px",height:"250px"}}>
                                <ins className="adsbygoogle"
                                style={{display:"inline-block",width:"300px",height:"250px"}}
                                data-ad-client="ca-pub-4248324788374908"
                                data-ad-slot="1536877753"></ins>
                            </div>
                           
                            <div className="flex mt-3 ">
                                <Link href={`/magasins/${catalog.subcategory_slug}`} className="btn btn-primary rounded-md px-6">  Visiter la page du magasin </Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div style={{ ...slideElement}}  className="swiper-zoom-container"> 
                
                    <div className="swiper-zoom-target slide">
                        
                        <div className="slideWrapper singlePage" style={{width: slideElement.width/2 }} >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                    <NextImage   alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[windex]?.path}`} />
                                </div>
                        </div>
                    </div> 
                </div>
                   
                         
            </SwiperSlide>);
            let thumb =  ( <SwiperSlide  key={images[windex]?.id}>
                                
                    <div className="image-holder" style={ thumbsDimentions.width ? { height: thumbsDimentions.height, width :( thumbsDimentions.width / 2) }: {}} >
                        
                        <div style={{width: "100%"}} className="slideWrapper singlePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                    <NextImage  alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[windex]?.path}`} />
                                </div>
                        </div>
                    </div>                    
                         
            </SwiperSlide>)
            elements.push(element);
            thumbs.push(thumb);
            
            return recursiveFunction(windex +1)
        }
        // let thisTwo = cloned.splice(0,2);
         const element =   ( <SwiperSlide  key={images[windex]?.id}>
           
            <div style={{ ...slideElement}} className="swiper-zoom-container"> 
                <div  className="swiper-zoom-target slide">
                    <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                <NextImage  alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[windex].path}`} />
                            </div>
                        
                    </div>
                    {(!isLast) && <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                <NextImage alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[windex+1]?.path}`} />
                            </div>
                        
                    </div>}
                    </div>
                    
                </div>
               
                     
        </SwiperSlide>);
        const thumb =   ( <SwiperSlide  key={images[windex]?.id}>
            <div className="image-holder" style={{ ...thumbsDimentions}} > 
                <div  >
                    <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                <NextImage  alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[windex].path}`} />
                            </div>
                        
                    </div>
                    {(!isLast) && <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                <NextImage  alt={`Page du ${catalog.name}`} width={600} height={600}  className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${images[windex+1]?.path}`} />
                            </div>
                        
                    </div>}
                    </div>
                    
                </div>
               
                     
        </SwiperSlide>)
        thumbs.push(thumb);
        elements.push(element);
        if(isLast) return {elements, thumbs};
        return recursiveFunction(windex+2)
    }
    console.log(currentIndex)
    return(
        <div>
            {/* <div style={{}}> */}
                <ins className="adsbygoogle"
                style={{display:"block", textAlign:"center"}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-4248324788374908"
                data-ad-slot="6665915501"></ins>
            {/* </div> */}
          
        
        <FullScreen onChange={(s) =>setStateFullscreen(s)} handle={handle}>
            {/* <div className="flex flex-row">
            <div className="catalogue-viewer"> */}
            <nav className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="">
                <div className="flex items-center justify-between catalog-top-nav">
                    <div className="flex items-center justify-start">
                    
                        <NextImage width={32} height={32}  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${catalog.magasin_icon}`} className="h-8 mr-3" alt="magasin Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"> {catalog.subcategory_name} </span>

                    </div>
                    <div className="flex items-center">
                        <span className="mr-5 cursor-pointer catalog-actions" onClick={ () => fullscreenState ? handle.exit() : handle.enter()}>
                            { fullscreenState ? <ExitFullscreen width={20} /> :  <FullscreenIcon width={20} />}
                        </span>
                        <span className="mr-5 cursor-pointer catalog-actions" onClick={openThumbs }>
                            <Navoverview width={20} />
                        </span>
                        <span className="mr-5 cursor-pointer catalog-actions" onClick={handleZoom} >
                        {
                            swiperRef?.zoom?.scale > 2 ? 
                            <ZoomOut  width={20} height={20} />
                            :
                            <ZoomIn  width={20} height={20} />
                        }
                        </span>
                    </div>
                </div>
                </div>
            </nav>
           <div className="swipers-container">
               {thumbsOpen && <div onClick={openThumbs} className="backdrop">  </div>}
                <Swiper
                modules={[Pagination, Zoom, Navigation, Thumbs, FreeMode]}
                slidesPerView={1}
                slidesPerGroup= {1}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.destroy()
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                spaceBetween={0}
                onSwiper={setSwiperRef}
                onSlideChange={handleSlideChange}
                speed={500}
                // navigation={true}
                centeredSlides={true}
                pagination={{
                    type: "progressbar",
                }}
                // scrollbar={true}
                // thumbs={{ swiper: thumbsSwiper }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                zoom={{enabled: true, maxRatio: 4, minRatio: 1}}
                grabCursor={true}
                style={{
                    "--swiper-navigation-color": "#c7a1d5",
                    "--swiper-pagination-color": "#c7a1d5",
                }}
                
                ref={slider}
                className="mySwiper"
                >
                
                        {elementToShow} 
                        {
                            showInterstitialAd && <AdsComponent seSshowInterstitialAd={seSshowInterstitialAd} /> 
                        }
                        <div style={width <= 768 && {display: "none"}} className="navigation-button navigation-button-prev" > 
                            <span ref={navigationPrevRef} className="nav-prev"> </span> 
                           { currentIndex != 1 &&  <span onClick= { () => swiperRef.slideTo(0)} className="nav-first">  <FirstPage width={24} /> <span> {  currentIndex >= 3 ?  (currentIndex + currentIndex - 2 ) + "/" + (images.length) :  (currentIndex) + "/" + images.length} </span> </span> }
                        </div>
                        <div style={width <= 768 && {display: "none"}} className="navigation-button navigation-button-next" >
                            <span ref={navigationNextRef} className="nav-next"> </span> 
                           { currentIndex <= images.length/2 && <span onClick= { () => swiperRef.slideTo(indexes)} className="nav-last"> <LastPage width={24} /> <span> { currentIndex >= 3  ? ((currentIndex + currentIndex - 2 ) + 1) + "/" + (images.length) :  (currentIndex +1) + " /" + images.length } </span> </span> }
                        </div>
                        <div className="pageNumBadge" style={changed ? {opacity: 1} : {opacity: 0}} >  {currentIndex+ "/" +  images.length} </div>
                </Swiper>
                <div className="thumbs-container bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" style={thumbsOpen? {visibility: "visible", opacity: 1} : {visibility: "hidden", opacity: 0}}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="thumbswiper"
                    >
                        {thumbsToShow}
                    </Swiper>
                </div>
            </div>
          {/* </div>
          <div className="aside-catalog bg-gray-100 dark:bg-slate-800">  </div>
        </div> */}
        </FullScreen>
        <ins className="adsbygoogle"
            style={{display:"block", textAlign:"center"}}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-4248324788374908"
            data-ad-slot="6665915501"></ins>
       
       </div>
        
    )
}

function AdsComponent ({seSshowInterstitialAd}) {

    useEffect(() => {
      
        if(process.env.NODE_ENV === "production"){
            var ads = document.getElementsByClassName('adsbygoogle').length;
            for (var i = 0; i < ads; i++) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (e) {}
            }
        }
    }, [])
    
    return (

        <div className="desktop-ad-overlay">

            <div className="ad-container">
                <div className="flex flex-col">
                <p className="text-white text-xs"> Publicité </p>
            { process.env.NODE_ENV === "production" && <ins className="adsbygoogle"
                            style={{display:"inline-block",width:"300px",height:"250px"}}
                            data-ad-client="ca-pub-4248324788374908"
                            data-ad-slot="1536877753"></ins>}
            
            <button onClick={(e) => seSshowInterstitialAd(false)} className="btn btn-primary"> Passez la publicité </button>
            </div>
            </div>
        </div>
    )
}