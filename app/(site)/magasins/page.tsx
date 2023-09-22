
import  Link  from 'next/link';
// import { useEffect } from 'react';
import  Image  from 'next/image';
import FavoriteIcon from './../../../components/FavoriteIcon'
import Breadcrumb from './../../../components/Breadcrumb';

import { cookies } from 'next/headers'

import { Metadata } from 'next'

import MagasinWithMore from './component/moreMagasin';
import {getMagasin} from './actions'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}


export default async function MagasinPage(){
    const cookieStore = cookies();
    const api_token = cookieStore.get('api_token');
    let token = api_token?.value? api_token.value : "";
    const magasins = await getMagasin({api_token: token, page: 1});

    return(
        <div className="magasin magasin-page container" >
             <Breadcrumb containerClassName=""  />
            <h1> Tous les magasins </h1>
            <div>
                <MagasinWithMore initialShop= {magasins} api_token={token} search="" />
            </div>
           
        </div>
    )
}
