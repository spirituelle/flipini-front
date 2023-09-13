

'use client';

import React, { useEffect, useState, useRef } from "react";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom, Navigation, Thumbs, FreeMode } from "swiper";

import FullscreenIcon from './../assets/icons/fullscreen.svg'
import ExitFullscreen from './../assets/icons/exitFullscreen.svg'
import Navoverview from './../assets/icons/navOverview.svg'
import ZoomIn from './../assets/icons/zoomIn.svg'
import ZoomOut from './../assets/icons/zoomOut.svg'
import FirstPage from './../assets/icons/firstpage.svg'
import LastPage from './../assets/icons/lastpage.svg'


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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullscreenState, setStateFullscreen] = useState(false);
    const [thumbsOpen, setThumbsOpen] = useState(false);
    const [swiperRef, setSwiperRef] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [width, setWidth] = useState(0);
    const [elementToShow, setElementsToshow] = useState([]);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    const isMobile = width <= 768;

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
        setCurrentIndex(i.activeIndex + 1)

    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        setWidth(window.innerWidth);


      loadImage(setImageDimensions, imageUrl);
      setSliderDimensions({ width: slider.current.offsetWidth, height: (slider.current.offsetHeight ) });

      const resizeObserver = new ResizeObserver((entries) => {
            // You can iterate all of the element entries observed
            for (const entry of entries) {
            // Do something on resize, access the element on `entry.target`
            setSliderDimensions({width: entry.contentRect.width, height: (entry.contentRect.height ) })
            }
        });
        
        // 👇 Listen to resize events on the element with `myElement` class
        resizeObserver.observe(slider.current);

        
       
        return () => {
            resizeObserver.unobserve(slider.current);
            window.removeEventListener('resize', handleWindowSizeChange);
        }
     
        
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

                let es = _mobileSlider();
                setElementsToshow(es);
        
               }else{
                   let mes = recursiveFunction(0);
                   setElementsToshow(mes);
        
        
               }
        }
     
    }, [width, slideElement]);

  
    let elements= [];
    let cloned  =[...images];
    let thumbs = [];

    function _mobileSlider(){

        if(cloned.length == 0){
            // alert('is mobile')
             return elements};

            let firstSlide =cloned.splice(0,1);
            const element =   ( <SwiperSlide  key={firstSlide[0]?.id}>
                <div style={{ ...slideElement}}  className="swiper-zoom-container"> 
                
                    <div className="swiper-zoom-target slide">
                        
                        <div className="slideWrapper singlePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                    <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${firstSlide[0]?.path}`} />
                                </div>
                        </div>
                    </div> 
                </div>
                   
                         
            </SwiperSlide>);
            let thumb =  ( <SwiperSlide  key={firstSlide[0]?.id}>
                                
                    <div className="image-holder" style={ thumbsDimentions.width ? { height: thumbsDimentions.height, width :( thumbsDimentions.width / 2) }: {}} >
                        
                        <div style={{width: "100%"}} className="slideWrapper singlePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                    <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${firstSlide[0]?.path}`} />
                                </div>
                        </div>
                    </div>                    
                         
            </SwiperSlide>)
            elements.push(element);
            thumbs.push(thumb);
            
            return _mobileSlider()
        
       
    }


    function recursiveFunction(i){

        if(cloned.length == 0) return elements;

        if(i === 0){
            let firstSlide =cloned.splice(0,1);
            const element =   ( <SwiperSlide  key={firstSlide[0]?.id}>
                <div style={{ ...slideElement}} className="slideWrapper doublePage" >
                    <div  className="firstPage"> 
                        <h1> {catalog.name} </h1>
                    </div>
                </div>
                <div style={{ ...slideElement}}  className="swiper-zoom-container"> 
                
                    <div className="swiper-zoom-target slide">
                        
                        <div className="slideWrapper doublePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                    <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${firstSlide[0]?.path}`} />
                                </div>
                        </div>
                    </div> 
                </div>
                   
                         
            </SwiperSlide>);
            let thumb =  ( <SwiperSlide  key={firstSlide[0]?.id}>
                                
                    <div className="image-holder" style={ thumbsDimentions.width ? { height: thumbsDimentions.height, width :( thumbsDimentions.width / 2) }: {}} >
                        
                        <div style={{width: "100%"}} className="slideWrapper singlePage" >
                            {/* <div className="addFavoriteStar left "> favorite </div> */}
                                <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                    <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${firstSlide[0]?.path}`} />
                                </div>
                        </div>
                    </div>                    
                         
            </SwiperSlide>)
            elements.push(element);
            thumbs.push(thumb);
            
            return recursiveFunction(i +1)
        }
        let thisTwo = cloned.splice(0,2);
         const element =   ( <SwiperSlide  key={thisTwo[0]?.id}>
            <div style={{ ...slideElement}} className="swiper-zoom-container"> 
                <div  className="swiper-zoom-target slide">
                    <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${thisTwo[0].path}`} />
                            </div>
                        
                    </div>
                    {(thisTwo.length >= 2) && <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: slideElement.height + "px"}}>
                                <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${thisTwo[1]?.path}`} />
                            </div>
                        
                    </div>}
                    </div>
                    
                </div>
               
                     
        </SwiperSlide>);
        const thumb =   ( <SwiperSlide  key={thisTwo[0]?.id}>
            <div className="image-holder" style={{ ...thumbsDimentions}} > 
                <div  >
                    <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${thisTwo[0].path}`} />
                            </div>
                        
                    </div>
                    {(thisTwo.length >= 2) && <div className="slideWrapper doublePage" >
                        {/* <div className="addFavoriteStar left "> favorite </div> */}
                            <div style={{width: "100%", height: 0, display:"block", position: "relative", paddingBottom: (thumbsDimentions.height - 6) + "px"}}>
                                <img className="swiper-image"  src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${thisTwo[1]?.path}`} />
                            </div>
                        
                    </div>}
                    </div>
                    
                </div>
               
                     
        </SwiperSlide>)
        thumbs.push(thumb);
        elements.push(element);
        return recursiveFunction(i+1)
    }

    const handleZoom =(e) => {
        e.preventDefault();
        if(swiperRef.zoom.scale >= 4) return swiperRef.zoom.out();
        swiperRef.zoom.in(swiperRef.zoom.scale*2);
        // setScale(3)
        // swiperRef.zoom.scale = 2
    }

    const zoomChange = (swiper, scale, imageEl, slideEl) => {
        // console.log(swiper, scale, imageEl, slideEl);
        // setCurrentScale(scale);
        // currentScaleRef.current= scale
      };
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
    let indexes = elementToShow.length

    return(
        <FullScreen onChange={(s) =>setStateFullscreen(s)} handle={handle}>
            <nav className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="">
                <div className="flex items-center justify-between catalog-top-nav">
                    <div className="flex items-center justify-start">
                    
                    <a href={catalog.magasin_path} target="_blank" rel="noreferrer" className="flex ml-2 md:mr-24">
                        <img src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${catalog.magasin_icon}`} className="h-8 mr-3" alt="FlowBite Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"> {catalog.subcategory_name} </span>

                    </a>
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
                            swiperRef?.zoom.scale > 2 ? 
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
                thumbs={{ swiper: thumbsSwiper }}
                onZoomChange={zoomChange}
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
                        <div className="navigation-button navigation-button-prev" > 
                            <span ref={navigationPrevRef} className="nav-prev"> </span> 
                            <span onClick= { () => swiperRef.slideTo(0)} className="nav-first">  <FirstPage width={24} /> <span> {  currentIndex >= 3 ?  (currentIndex + currentIndex - 2 ) + "/" + ((indexes -1) * 2) :  (currentIndex) + "/" + ((indexes -1) * 2)} </span> </span> 
                        </div>
                        <div className="navigation-button navigation-button-next" >
                            <span ref={navigationNextRef} className="nav-next"> </span> 
                            <span onClick= { () => swiperRef.slideTo(indexes)} className="nav-last"> <LastPage width={24} /> <span> { currentIndex >= 3  ? ((currentIndex + currentIndex - 2 ) + 1) + "/" + ((indexes -1) * 2) :  (currentIndex +1) + " /" + ((indexes-1) * 2) } </span> </span> 
                        </div>
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
                        {thumbs}
                    </Swiper>
                </div>
            </div>
          

</FullScreen>
        
    )
}
