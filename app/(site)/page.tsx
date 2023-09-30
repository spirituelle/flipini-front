// import Image from 'next/image'
import {DashboardModel} from './../../model/DashboardModel';

import  Image  from 'next/image';
import { Suspense} from 'react'
import MagasinRowSkeleton from './../../components/magasinsRowSkeleton'
import CardSkeleton from './../../components/cardsSkeleton'


import Cards from './../../components/Cards'
import  Link  from 'next/link';
import { Metadata } from 'next'
export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
  },
  title:  "Flipini.fr : Catalogues en ligne, Promotions et Offres de la Semaine",
  description:
    "Découvrez les catalogues en ligne, le catalogue de la semaine, ainsi que les meilleures offres et promotions sur Flipini.fr. ",
}
async function getDashboard(){
  const res = await fetch(`${process.env.BACKEND_URL}/api/accueil-site`,{ next: { tags: ['home'] } });
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
    // <Suspense fallback={<div> Loading ... </div>}>
    <div className="home-page">
       
      <div className="overflow-x-scroll flex">
        <Suspense fallback={<MagasinRowSkeleton />}>
        {
          dashboard.top_magasin.map((magasin, index)=>{
            return(
              <Link  className="flex-none py-6 px-3 first:pl-6 last:pr-6" key={index} href={`/magasins/${magasin.slug}`}>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Image alt={magasin.name} width={32} height={32} src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${magasin.icon}`} className="w-16 h-16 rounded-full magasin-rounded"  />
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
              </Suspense >
          </div>
        </div>
        </section>
        <section className="container mb-10">
          <div className="catalogs-card p-5">
          <p>         Bienvenue sur Flipini.fr, votre destination privilégiée pour découvrir les catalogues en ligne les plus récents. Plongez dans le catalogue de la semaine, profitez des offres exceptionnelles et découvrez les promotions incontournables des plus grandes enseignes de France. Simplifiez vos achats et restez à la pointe des tendances grâce à Flipini.fr. </p>
<h2><strong>Flipini.fr : Votre Compagnon de Shopping Multicatégorie en Ligne</strong></h2>
Bienvenue sur Flipini.fr, la plateforme qui révolutionne votre expérience de shopping en ligne en rassemblant une multitude de catalogues, promotions et prospectus des enseignes les plus prisées de France.
<h3><strong>Supermarché : Vos Courses à Portée de Clic</strong></h3>
Ne faites plus la queue à la caisse ! Découvrez toutes les offres et promotions de vos supermarchés préférés grâce à nos <Link className="text-primary" href="/categories/supermarches" target="_new">Catalogues Supermarchés</Link>. Que vous recherchiez des produits frais, des articles d&apos;épicerie ou des plats préparés, tout est là pour faciliter vos courses du quotidien.
<h3><strong>Maison : Créez Votre Cocon</strong></h3>
Que vous souhaitiez refaire votre décoration intérieure, renouveler votre linge de maison ou trouver des accessoires tendances pour chaque pièce, nos <a className="text-primary" href="https://flipini.fr/categories/maison" target="_new">Catalogues Maison</a> vous proposent un large choix pour faire de votre intérieur un véritable nid douillet.
<h3><strong>Jouets : L&apos;Imagination au Pouvoir</strong></h3>
Pour les plus petits comme pour les grands enfants, notre sélection de <a className="text-primary" href="https://flipini.fr/categories/jouets" target="_new">Catalogues Jouets</a> regorge de jeux et jouets pour tous les âges. Découvrez les dernières tendances et offrez des moments de pur bonheur.
<h3><strong>Mode à la Pointe des Tendances</strong></h3>
La mode est en constante évolution et Flipini vous offre un accès instantané aux <a className="text-primary" href="https://flipini.fr/categories/mode" target="_new">Catalogues Mode</a> des géants tels que Zara, H&amp;M, Bershka et bien d&apos;autres. Retrouvez toutes les nouvelles collections et lookbooks pour rester à la pointe des tendances.
<h3><strong>Électroménager &amp; Multimédia : La Technologie à Votre Portée</strong></h3>
Équipez votre maison avec les meilleures offres en matière d&apos;<a className="text-primary" href="https://flipini.fr/categories/electromenager" target="_new">Électroménager</a>. Des catalogues de Darty à Boulanger, sans oublier Conforama, explorez les promotions et innovations pour chaque coin de votre maison.
<h3><strong>Bricolage : Tout pour Vos Travaux</strong></h3>
Les amateurs de bricolage trouveront leur bonheur avec notre sélection de <a className="text-primary" href="https://flipini.fr/categories/bricolage" target="_new">Catalogues Bricolage</a>. De Castorama à Leroy Merlin, trouvez l&apos;outil ou le matériel qu&apos;il vous faut pour vos projets.
<h3><strong>Bien-être &amp; Bio : Retour aux Sources</strong></h3>
Plongez dans un univers de produits sains et biologiques. D&apos;Aroma Zone à La Vie Claire, parcourez nos <a className="text-primary" href="https://flipini.fr/categories/bio" target="_new">Catalogues Bio</a> et découvrez une gamme variée pour une vie plus naturelle.
<h3><strong>Jardin &amp; Animalerie : Votre Oasis de Détente</strong></h3>
Que vous soyez jardinier passionné ou amoureux des animaux, notre catégorie <a className="text-primary" href="https://flipini.fr/categories/jardineries" target="_new">Jardineries et Animaleries</a> saura satisfaire tous vos besoins.
<h3><strong>Bazar &amp; Déstockage : Les Bonnes Affaires</strong></h3>
Dénichez des trésors à petits prix dans nos <a className="text-primary" href="https://flipini.fr/categories/bazar" target="_new">Catalogues Bazar</a>. De Gifi à Noz, des promotions incroyables vous attendent.
<h3><strong>Sport : Équipement &amp; Performance</strong></h3>
Athlètes ou amateurs, nos <a className="text-primary" href="https://flipini.fr/categories/sport" target="_new">Catalogues Sport</a> vous proposent un choix vaste pour toutes vos activités, de la course à pied au fitness.
<h3><strong>Automobile : Conduisez avec Passion</strong></h3>
Des nouvelles voitures aux accessoires indispensables, notre sélection <a className="text-primary" href="https://flipini.fr/categories/auto" target="_new">Auto</a> vous guide vers les meilleures offres du moment.
<h3><strong>Beauté &amp; Parfumerie : Rayonnez au Quotidien</strong></h3>
Avec des enseignes comme Sephora, Yves Rocher, et bien d&apos;autres, nos <a className="text-primary" href="https://flipini.fr/categories/beaute" target="_new">Catalogues Beauté</a> vous ouvrent les portes de la beauté et du bien-être.
<h3><strong>Bijouteries : Éclat &amp; Élégance</strong></h3>
Découvrez une collection impressionnante de bijoux à travers nos <a className="text-primary" href="https://flipini.fr/categories/bijouteries" target="_new">Catalogues Bijouteries</a> et ajoutez une touche d&apos;éclat à chaque occasion.
<h2><strong>Conclusion</strong></h2>
Que vous recherchiez des produits du quotidien, des articles spécifiques ou des cadeaux, Flipini.fr est votre destination de choix pour un shopping en ligne complet et avantageux. Naviguez à travers nos différentes catégories et profitez des meilleures offres du moment. Bon shopping sur Flipini.fr !

<em>Flipini.fr est bien plus qu&apos;un simple site d&apos;achat en ligne. C&apos;est une destination où chaque catégorie vous offre un monde de découvertes. Alors, pourquoi attendre? Commencez votre voyage shopping dès maintenant!</em>
</div>
        </section>


    </div>
    //  </Suspense>
  )
}
