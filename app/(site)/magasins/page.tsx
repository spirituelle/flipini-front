
import  Link  from 'next/link';
// import { useEffect } from 'react';
import  Image  from 'next/image';
import FavoriteIcon from './../../../components/FavoriteIcon'
import Breadcrumb from './../../../components/Breadcrumb';
import {SubCategoryModel} from './../../../model/SubCategoryModel';
import { cookies } from 'next/headers'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}

async function getMagasin( api_token: string){
    let user= {id: null};
        if(api_token){
            const userRes = await fetch(
                `${process.env.BACKEND_URL}/api/user`, { headers: { Authorization: "Bearer " + api_token} }
            );
             user= await userRes.json();
        }
    const res = await fetch(`${process.env.BACKEND_URL}/api/magasin-list?user_id=${user.id}&country_id=1&page=1&per_page=24`);
    const data = await res.json();
    return data?.data as SubCategoryModel[];
}
export default async function MagasinPage(){
    const cookieStore = cookies();
    const api_token = cookieStore.get('api_token');
    let token = api_token?.value? api_token.value : "";
    const magasins = await getMagasin(token);

    return(
        <div className="magasin magasin-page container" >
             <Breadcrumb containerClassName=""  />
            <h1> Tous les magasins </h1>
            <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
                {magasins?.map((magasin, index) => {                   
                    return <Magasin key={magasin.subcategory_id} magasin={magasin} />;
                })}
            </div>
        </div>
    )
}

function Magasin({ magasin }: any) {
    return (
        <Link className="magasin-frid-item bg-white dark:bg-slate-900" href={"/magasins/" + magasin.slug}> 
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
     
      );
  }