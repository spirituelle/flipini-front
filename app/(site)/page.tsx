// import Image from 'next/image'
import {DashboardModel} from './../../model/DashboardModel';

import  Image  from 'next/image';
import { Suspense} from 'react'
import MagasinRowSkeleton from './../../components/magasinsRowSkeleton'
import CardSkeleton from './../../components/cardsSkeleton'


import Cards from './../../components/Cards'
import  Link  from 'next/link';
import { Metadata } from 'next'
import PostList from '../../components/postlist';
import Container from '../../components/container';
export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
  },
  title:  `${process.env.SITE_NAME} : Catalogues en ligne, Promotions et Offres de la Semaine`,
  description:
    `Découvrez les catalogues en ligne, le catalogue de la semaine, ainsi que les meilleures offres et promotions sur  ${process.env.SITE_NAME}.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
}
async function getDashboard(){
  const res = await fetch(`${process.env.BACKEND_URL}/api/accueil-site?country_id=${process.env.COUNTRY_ID}`,{ next: { tags: ['home'] } });
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
  console.log(dashboard)
  // if (dashboard == null) return( <> Error </>);
  return (
    // <Suspense fallback={<div> Loading ... </div>}>
    <div className="home-page">
       
      <div className="overflow-x-scroll flex">
        <Suspense fallback={<MagasinRowSkeleton />}>
        {
          dashboard.top_magasin.map((magasin, index)=>{
            return(
              <Link  className="flex-none py-6 px-3 first:pl-6 last:pr-6" key={index} href={`/magasins/${magasin.slug}`}>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Image alt={magasin.name} width={32} height={32} src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${magasin.icon}`} className="w-16 h-16 rounded-full magasin-rounded"  />
                    <strong className="text-slate-900 text-xs font-medium dark:text-slate-200"> {magasin.name} </strong>
                  </div>
              </Link>
            )
          })
        }
        </Suspense>
      </div>
      <section className="container">
      <Suspense fallback={<CardSkeleton />}>
      {dashboard.cards?.map((card, index: number) => {
        if(card.bookList.length == 0) return null
        return(
          <Cards key={index} card={card} />
        )
      })}
      </Suspense >
      </section>
      <section className="container mb-5 ">
        <div className="catalogs-card p-5">
          <div className="heading heading-flex">
              <div className="heading-left">
                  <h2 className="title">Magasins recommandés</h2>
              </div>
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
            <Suspense fallback={<div> Loading ... </div>}>
              {
                  dashboard.top_magasin?.map((magasin, index) => {
                      return(
                          <Link className="magasin-frid-item bg-white dark:bg-slate-900" key={index} href={"/magasins/" + magasin.slug}> 
                              <div className="magasin-card " >
                                  <div> 
                                      <Image 
                                      alt={magasin.name}
                                      src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${magasin.icon }`}
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
            </Suspense >
            </div>
          </div>
        </section>

       { dashboard.blogs?.length && <section className="container mb-5 ">
          <div className="catalogs-card p-5">
            <div className="heading heading-flex">
                <div className="heading-left">
                    <h2 className="title">Les derniers articles de notre blog</h2>
                </div>
                <div className="heading-right">
                    <Link href={ `/blog` } className="title-link">Voir tous <i className="icon-long-arrow-right"></i></Link>
                </div>
            </div>
            <Container large={false} className="articles-list" alt={false} >
              <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                <Suspense fallback={<div> Loading ... </div>}>
                  {
                      dashboard.blogs?.map((blog, index) => {
                          return(
                            <PostList key={blog.id} post={blog} aspect="square" preloadImage={false} minimal={false}  fontSize="large" fontWeight="normal"  />
                          )
                          
                      })
                  }
                </Suspense >
              </div>
            </Container>
          </div>
        </section>}
        <section className="container mb-10">
   
          {
                        dashboard.home_content?.content &&
                        <div className="catalogs-card p-5" dangerouslySetInnerHTML={{__html: dashboard.home_content?.content}}>
                           
                        </div>
                    }
        </section>


    </div>
    //  </Suspense>
  )
}
