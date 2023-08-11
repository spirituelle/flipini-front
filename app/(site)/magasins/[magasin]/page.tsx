
import Breadcrumb from './../../../../components/Breadcrumb';

import {MagasinModel} from './../../../../model/MagasinDetailsModel';
import  Link  from 'next/link';
import { cookies } from 'next/headers'

import CatalogItemExpended from "./../../../../components/CatalogItemExpended";
import GeneralCard from "./../../../../components/Cards/generale";
import  Image  from 'next/image';
import FavoriteIcon from './../../../../components/FavoriteIcon'

async function getMagasin(magasin: string, api_token: string){
    try {
        let user= {id: null};
        if(api_token){
            const userRes = await fetch(
                `${process.env.BACKEND_URL}/api/user`, { headers: { Authorization: "Bearer " + api_token} }
            );
             user= await userRes.json();
        }
        const res = await fetch(
            `${process.env.BACKEND_URL}/api/magasin?country_id=1&magasin=${magasin}&user_id=${user.id}`,
            { next: { revalidate: 10 } }
        );
        console.log(res.status)
        if(res.status === 200){
            const data = await res.json();
            return data as MagasinModel;
        }
        else{
            throw new Error
        }
    } catch (error) {
       throw error
        // return null
    }
  
    
}

export default async function MagasinPage({params}: any){
    const cookieStore = cookies();
    const api_token = cookieStore.get('api_token');
    let token = api_token?.value? api_token.value : "";

    const response = await getMagasin(params.magasin, token);
   
    return(
        <div className="magasin magasin-page">
             {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4994931420191066" /> */}
            <Breadcrumb containerClassName=""  />
            <div className="magasin-header-top py-5 bg-white dark:bg-slate-900">
                <div className="container" >
                    <div className="magasin-top">
                
                        <div className="magasin-image mr-4">
                            <Link href={"/click-out/magasin/"+ response.magasin.name}> <img className="" alt={response.magasin.name} src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${response.magasin.icon}`} /> </Link>
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
                    {/* <div className="magasin-actions">
                        <h4> Tenez-moi au courant </h4>
                        <p> Voulez vous recevoir des alerts des nouveux catalogues catalogues {response.magasin.name} publié </p>
                    </div> */}
                </div>
                <div className="">
                    <section>
                        <GeneralCard title="Catalogues similaires" showReadMore={false} readMoreLink={"/"}  catalogs={response.recommended_book} />
                           
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
                                        <Link className="magasin-frid-item bg-white dark:bg-slate-900" key={index} href={"/magasins/" + magasin.name}> 
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
                                                <FavoriteIcon  magasin={magasin} />
                                               
                                            </div> 
                                        </Link>
                                       
                                    )
                                    
                                })
                            }
                        </div>
                    </section>

                    <section>
                        <GeneralCard title="Historique des catalogues" readMoreLink={"/"} showReadMore={false} catalogs={response.catalogsExpired} />
                    </section>

                </div>
            </div>
        </div>
    )
}