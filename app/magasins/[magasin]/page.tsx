
import Breadcrumb from './../../../components/Breadcrumb';

import {MagasinModel} from './../../../model/MagasinDetailsModel';
import {SubCategoryModel} from './../../../model/SubCategoryModel';
import  Link  from 'next/link';
// import { cookies } from 'next/headers'

import CatalogItemExpended from "./../../../components/CatalogItemExpended";
import GeneralCard from "./../../../components/Cards/generale";

import  Image  from 'next/image';
// import FavoriteIcon from './../../../components/FavoriteIcon'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
export const dynamicParams = false;

export async function generateStaticParams() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/magasin-list?country_id=1`);
   const resJson = await res.json();
   const categories = resJson.data as SubCategoryModel[];
    return categories.map(mag=> ({
        magasin: mag.slug
    }));
}


async function getMagasin(magasin: string){
    const res = await fetch(
        `${process.env.BACKEND_URL}/api/magasin?country_id=1&magasin=${magasin}`
        ,{ next: { tags: ['home', 'magasins'] }}
    );

    if(res.status === 200){
        const data = await res.json();
        return data as MagasinModel;
    }
    else{
        notFound()
    }
  
    
}

export default async function MagasinPage({params}: any){
    // const cookieStore = cookies();
    // const api_token = cookieStore.get('api_token');
    // let token = api_token?.value? api_token.value : "";

    const response = await getMagasin(params.magasin);
   
    return(
        <div className="magasin magasin-page">
            <Breadcrumb containerClassName=""  />
            <div className="magasin-header-top py-5 bg-white dark:bg-slate-900">
                <div className="container" >
                    <div className="magasin-top">
                
                        <div className="magasin-image mr-4">
                            <Image width={90} height={90} className="" alt={response.magasin.name} src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${response.magasin.icon}`} /> 
                        </div>
                        <div className="magasin-details">
                            
                            <h1 className="magasin-name"> Catalogue {response.magasin.name} -  prospectus, pub et promos  </h1>

                        </div>
                        
                    </div>
                
                </div>
            </div>
            <div className="container mt-4">
                <div className="magasin-row ">
                    <div className="store-flayer"> 
                        <section>
                            {
                                response.catalogs?.map((catalog, index) => {
                                    return(
                                    <CatalogItemExpended key={index} catalog={catalog} />
                                    )
                                    
                                })
                            }
                        </section>
                    </div>
                </div>
                <div className="">
                    <section>
                        <GeneralCard title="Catalogues similaires" onlyScroll={false} showReadMore={false} readMoreLink={"/"}  catalogs={response.recommended_book} />
                           
                    </section>
                    <section>
                        <div className="heading heading-flex">
                            <div className="heading-left">
                                <h2 className="title">Magasins similaires</h2>
                            </div>
                          
                            
                        </div>
                        <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
                            {
                                response.similar_magasin?.map((magasin, index) => {
                                    return(
                                        <Link className="magasin-frid-item bg-white dark:bg-slate-900" key={index} href={"/magasins/" + magasin.slug}> 
                                            <div className="magasin-card " >
                                                <div> 
                                                    <Image 
                                                    alt={magasin.name}
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${magasin.icon }`}
                                                    width={72}
                                                    height={72}
                                                    className="magasin-image"
                                                    /> 
                                                </div>
                                                <h3> {magasin.name} </h3>
                                                {/* <FavoriteIcon  magasin={magasin} /> */}
                                               
                                            </div> 
                                        </Link>
                                       
                                    )
                                    
                                })
                            }
                        </div>
                    </section>

                    <section>
                        <GeneralCard title="Historique des catalogues" readMoreLink={"/"} showReadMore={false} onlyScroll={true} catalogs={response.catalogsExpired} />
                    </section>

                </div>
            </div>
        </div>
    )
}