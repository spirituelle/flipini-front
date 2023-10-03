import  Link  from 'next/link';

import { BookDetailsModel } from './../../model/BookDetailsModel';
import GeneralCard from "./../../components/Cards/generale";
import Breadcrumb from './../../components/Breadcrumb';
import { Metadata } from 'next'
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/chercher`,
    },
}

// app/posts/page.ts
type Props = {
    params: {},
    searchParams: { [key: string]: string | string[] | undefined },
  }
  

async function getSearchResult(term: string | string[] | undefined){
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-list?search_text=${term}&country_id=${1}`, { cache: 'no-store' });

    const data = await res.json();
    console.log(data.data)
    if(data)return data.data as BookDetailsModel[];
    throw new Error
    
}

export default async function SearchPage(props: Props){
    // const searchParams = useSearchParams()
    const searchParams = props.searchParams;
    const page = searchParams.page;

    let searchTerm = searchParams.term;
    const searchResult = await getSearchResult(searchTerm);



    return(
        <div className="category category-page container">
            <Breadcrumb containerClassName=""  />
            {/* <h1> {"Vous avez cherché " + `"${searchTerm}"` } </h1> */}
            <div >
                {/* {
                    searchResult.map((cat, index) => {
                        return ( 
                            <div key={index}> {cat.name} </div> 
                        )
                    })
                } */}
            <GeneralCard title={"Vous avez cherché " + `"${searchTerm}"` } onlyScroll={false} showReadMore={false} readMoreLink={`/`} catalogs={searchResult} />;
                
            </div>
        </div>
    )
}
