"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {  useRouter } from 'next/navigation';
// import { useLazyQuery } from '@apollo/react-hooks';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

import  Link  from 'next/link';
import axios from './../../../lib/axios'
// import { GET_PRODUCTS } from '~/server/queries';
// import withApollo from '~/server/apollo';
import { safeContent } from './../../../utils';

function HeaderSearch () {
    const router = useRouter(  );
    const [ cat, setCat ] = useState( "" );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ catalogs, setCatalogs ] = useState( [] );
    // const searchParams = useSearchParams()
    // const [ searchProducts, { data } ] = useLazyQuery( GET_PRODUCTS );
    // const result = data && data.catalogs.data;
    // const [ timer, setTimer ] = useState( null );

    useEffect( () => {
        document.querySelector( "body" ).addEventListener( 'click', closeSearchForm );

        return ( () => {
            document.querySelector( "body" ).removeEventListener( 'click', closeSearchForm );
        } )
    }, [] );

    useEffect( () => {
        if ( searchTerm.length > 2 ){
              
            axios.get(`/api/book-list?page=${1}&search_text=${searchTerm}&country_id=${1}`)
            .then(res => {
                console.log(res.data.data)
                setCatalogs(res.data.data)
            }).catch((err) => {
                // console.log(err)
            })
        }
            // setCatalogs( )
    }, [ searchTerm ] )

    React.useEffect(()=>{
        window.localStorage.setItem('user_last_search_term', searchTerm)
      },[searchTerm])

    useEffect( () => {
        document.querySelector( '.header-search.show-results' ) && document.querySelector( '.header-search.show-results' ).classList.remove( 'show-results' );
    }, [ router.pathname ] );

    function matchEmphasize ( name ) {
        let regExp = new RegExp( searchTerm, "i" );
        return name.replace(
            regExp,
            ( match ) => "<strong>" + match + "</strong>"
        );
    }

    function closeSearchForm ( e ) {

        document
            .querySelector( '.header .header-search' )
            ?.classList.remove( 'show' );
    }

    function onCatSelect ( e ) {
        setCat( e.target.value );
    }

    function onSearchChange ( e ) {
        setSearchTerm( e.target.value );
    }

    function showSearchForm ( e ) {
        document
            .querySelector( '.header .header-search' )
            .classList.add( 'show' );
    }
    // const createQueryString = useCallback(
    //     (name, value) => {
    //       const params = new URLSearchParams(Array.from(searchParams.entries()))
    //       params.set(name, value)
     
    //       return params.toString()
    //     },
    //     [searchParams]
    //   )
    function onSubmitSearchForm ( e ) {
        e.preventDefault();
        router.push(  "chercher?term=" + searchTerm)
        // router.push( {
        //     pathname: '/shop/sidebar/list',
        //     query: {
        //         searchTerm: searchTerm,
        //         category: cat
        //     }
        // } );
    }

    function goProductPage () {
        setSearchTerm( '' );
        setCatalogs( [] );
    }

    return (
        <div className="header-search header-search-extended header-search-visible">
            <a href="#" className="search-toggle"><i className="icon-search"></i></a>

            <form action="#" method="get" onSubmit={ onSubmitSearchForm } onClick={ showSearchForm }>
                <div className={" header-search-wrapper search-wrapper-wide " }>
                    <label htmlFor="q" className="sr-only" value={ searchTerm } required>Rechercher</label>
                    <input type="text" onChange={ onSearchChange } value={ searchTerm } autoComplete="off" className= "form-control bg-neutral-100 dark:bg-gray-800 " name="q" placeholder="Rechercher ici ..." required />
                    {/* <div className="select-custom" onChange={ ( e ) => onCatSelect( e ) }>
                        <select id="cat" name="cat">
                            <option value={ null }>All Departments</option>
                            <option value="fashion">Fashion</option>
                            <option value="women">- Women</option>
                            <option value="men">- Men</option>
                            <option value="jewellery">- Jewellery</option>
                            <option value="kids-fashion">- Kids Fashion</option>
                            <option value="electronics">Electronics</option>
                            <option value="smart-tvs">- Smart TVs</option>
                            <option value="cameras">- Cameras</option>
                            <option value="cames">- Games</option>
                            <option value="home-and-garden">Home &amp; Garden</option>
                            <option value="motors">Motors</option>
                            <option value="cars-and-trucks">- Cars and Trucks</option>
                            <option value="boats">- Boats</option>
                            <option value="auto-tools-and-supplies">- Auto Tools &amp; Supplies</option>
                        </select>
                    </div> */}
                    {/* <button className="btn btn-primary" type="submit"> <MagnifyingGlassIcon className="w-10 h-10 text-white " /> </button> */}
                </div>
                <div className="live-search-list dark:bg-gray-800 bg-neutral-100" onClick={ goProductPage }>
                {/* {searchTerm.length < 2 && <div  className="stripe-title"><span >Recherches populaires</span></div>}
                        <div className="search-name" > lidl </div> */}
                    {
                        searchTerm.length > 2 && catalogs.map( ( catalog, index ) => (
                            <Link href={ `/catalogues/${catalog.slug}` } className="autocomplete-suggestion" key={ `search-result-${index}` }>
                                <img src={ process.env.NEXT_PUBLIC_STORAGE_END_POINT + catalog.thumbnail_path } width={ 40 } height={ 40 } alt="catalog" />
                                <div className="search-name" dangerouslySetInnerHTML={ safeContent( matchEmphasize( catalog.name ) ) }></div>
                                {/* <span className="search-price">
                                    {
                                        catalog.stock == 0 ?
                                            <div className="catalog-price mb-0">
                                                <span className="out-price">${ catalog.price.toFixed( 2 ) }</span>
                                            </div>
                                            :
                                            catalog.minPrice == catalog.maxPrice ?
                                                <div className="catalog-price mb-0">${ catalog.minPrice.toFixed( 2 ) }</div>
                                                :
                                                catalog.variants.length == 0 ?
                                                    <div className="catalog-price mb-0">
                                                        <span className="new-price">${ catalog.minPrice.toFixed( 2 ) }</span>
                                                        <span className="old-price">${ catalog.maxPrice.toFixed( 2 ) }</span>
                                                    </div>
                                                    :
                                                    <div className="catalog-price mb-0">${ catalog.minPrice.toFixed( 2 ) }&ndash;${ catalog.maxPrice.toFixed( 2 ) }</div>
                                    }
                                </span> */}
                            </Link>
                        ) )
                    }
                </div>
            </form>
        </div>
    );
}

export default  HeaderSearch;