// import Image from 'next/image'
import {DashboardModel} from './../../model/DashboardModel';


import Cards from './../../components/Cards'
import  Link  from 'next/link';
import { Metadata } from 'next'
export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
  },
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
async function getDashboard(){
  const res = await fetch(`${process.env.BACKEND_URL}/api/dashboard-detail`);
  if(res.status === 200){
      const data = await res.json();
      return data as DashboardModel;
  
  }
  else{
      throw new Error
  }
  
}

export default async function Home() {
  const dashboard = await getDashboard();
  // if (dashboard == null) return( <> Error </>);

  return (
    <div className="home-page">
      <div className="overflow-x-scroll flex">

        {
          dashboard.top_magasin.map((magasin, index)=>{
            return(
              <Link className="flex-none py-6 px-3 first:pl-6 last:pr-6" key={index} href={`/magasins/${magasin.slug}`}>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${magasin.icon}`} className="w-16 h-16 rounded-full magasin-rounded"  />
                    <strong className="text-slate-900 text-xs font-medium dark:text-slate-200"> {magasin.name} </strong>
                  </div>
              </Link>
            )
          })
        }
      </div>
      {dashboard.cards?.map((card, index: number) => {
        if(card.bookList.length == 0) return null
        return(
          <Cards key={index} card={card} />
        )
      })}
    </div>
  )
}
