
import Breadcrumb from './../../../../components/Breadcrumb';
import GeneralCard from "./../../../../components/Cards/generale";
import {SubCategoryModel} from './../../../../model/SubCategoryModel';
import { CategoryModel } from '../../../../model/CategoryModel';

import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}

async function getCategory(category: string){
    const res = await fetch(`${process.env.BACKEND_URL}/api/sub-category-list?name=${category}`, { cache: 'no-store' });

    const data = await res.json();

    if(data)return data as CategoryPageModel;
    throw new Error
    
}

export default async function CategoryPage({params}: any){
    const category = await getCategory(params.category);
    console.log(params.category)
    return(
        <div className="category category-page container">
             <Breadcrumb containerClassName=""  />
            <h1> Catalogues de {category.category.name}  </h1>
            <div >
                {category.subcategories?.map((magasin, index) => {
                    if(magasin.catalogues.length ==0) return null
                    return <GeneralCard key={index} title={"Catalogues " + magasin.name} showReadMore={true} readMoreLink={`/magasins/${magasin.slug}`} catalogs={magasin.catalogues} />;
                })}
            </div>
            <div className="categorie-description mb-10">
                {content[params.category]}
            </div>
        </div>
    )
}


 interface CategoryPageModel{
    subcategories: SubCategoryModel[],
    category: CategoryModel,
    // category_id: number,
    // name: string,
    // icon: string,
    // catalogues: BookDetailsModel[],
}

const content = {
    supermarches:[
        <h2 key={1}><strong>Catalogues Hypermarchés et Supermarchés : Feuilletez en Ligne sur Flipini.fr</strong></h2>,
        <p key={2}>   Avec l&apos;essor du digital, les moyens traditionnels de faire ses courses ont considérablement changé. Les catalogues papier, autrefois très populaires, ont progressivement fait place à leurs versions numériques. C&apos;est dans ce contexte que le site <a href="https://flipini.fr/" target="_new">Flipini.fr</a> et son application mobile se sont imposés comme la référence pour feuilleter les <strong>catalogues hypermarché en ligne</strong> et les <strong>catalogues supermarché en ligne</strong>. Zoom sur cette catégorie et sur ce qu&apos;elle propose. </p>,
<h3 key={3}>Lidl, le leader européen à portée de clic</h3>,
 <p key={4}> En tête de liste, <a href="https://flipini.fr/magasins/lidl" target="_new">Lidl</a> est reconnu pour ses produits de qualité à des prix compétitifs. Chaque <strong>catalogue Lidl de la semaine</strong> est une mine d&apos;or pour les amateurs de bonnes affaires.</p>,
<h3 key={5}>Intermarché, l&apos;incontournable des régions françaises</h3>,
<p key={6}> Si vous êtes à la recherche d&apos;un <strong>catalogue hypermarché de la semaine</strong>, <a href="https://flipini.fr/magasins/intermarche" target="_new">Intermarché</a> est la solution. Avec un assortiment varié, cette enseigne répond à tous les besoins des consommateurs.</p>,
<h3 key={7}>Carrefour et Carrefour Market, la diversité à l&apos;honneur</h3>,
<p key={8}>Avec ses deux entités, <a href="https://flipini.fr/magasins/carrefour" target="_new">Carrefour</a> et <a href="https://flipini.fr/magasins/carrefour-market" target="_new">Carrefour Market</a>, le groupe propose des produits pour tous les goûts et toutes les envies. Une vaste gamme est disponible chaque semaine dans leurs catalogues respectifs.</p>,
<h3 key={9}>Auchan, le géant des hypermarchés</h3>,
<p key={10}>Pour ceux qui recherchent la variété, le <strong>catalogue Auchan en ligne</strong> est un incontournable. On y trouve de tout, de l&apos;épicerie à l&apos;électronique, en passant par la mode.</p>,
<h3 key={11}>Magasins U et E.Leclerc, la garantie de produits locaux</h3>,
<p key={12}>Les <a href="https://flipini.fr/magasins/magasins-u" target="_new">Magasins U</a> et <a href="https://flipini.fr/magasins/eleclerc" target="_new">E.Leclerc</a> se sont engagés depuis de nombreuses années à soutenir les producteurs locaux. Feuilletez leurs catalogues en ligne pour découvrir des produits de proximité.</p>,
<h3 key={13}>Aldi, Cora, Leader Price : le trio gagnant pour les économies</h3>,
<p key={14}>Si vous avez un budget serré, ces trois enseignes sont faites pour vous. Les catalogues d&apos;<a href="https://flipini.fr/magasins/aldi" target="_new">Aldi</a>, <a href="https://flipini.fr/magasins/cora" target="_new">Cora</a>, et <a href="https://flipini.fr/magasins/leader-price" target="_new">Leader Price</a> regorgent de promotions et d&apos;offres imbattables.</p>,
<h3 key={15}>Monoprix, Géant Casino : la touche urbaine</h3>,
<p key={16}>Spécialement conçus pour les citadins, les <strong>catalogues supermarché en ligne</strong> de <a href="https://flipini.fr/magasins/monoprix" target="_new">Monoprix</a> et <a href="https://flipini.fr/magasins/geant-casino" target="_new">Géant </a><a href="https://flipini.fr/magasins/casino/" target="_new">Casino</a> sont synonymes de qualité et d&apos;élégance.</p>,
<h3 key={17}>Grand Frais, Picard, Match : l&apos;exotisme et la fraîcheur</h3>,
<p key={18}>En quête de produits frais ou d&apos;exotisme ? Ne cherchez pas plus loin ! Les catalogues de <a href="https://flipini.fr/magasins/grand-frais" target="_new">Grand Frais</a>, <a href="https://flipini.fr/magasins/picard" target="_new">Picard</a>, et <a href="https://flipini.fr/magasins/match" target="_new">Match</a> répondront à toutes vos envies gourmandes.</p>,
<h3 key={19}>Conclusion</h3>,
<p key={20}>Feuilleter les <strong>catalogues hypermarché de la semaine</strong> ou les <strong>catalogues supermarché de la semaine</strong> n&apos;a jamais été aussi facile grâce à Flipini.fr. Que vous soyez à la recherche d&apos;une promotion, d&apos;un produit spécifique ou simplement de l&apos;inspiration pour vos prochaines courses, la plateforme vous offre un vaste choix parmi les plus grandes enseignes de France. Alors n&apos;hésitez plus et rendez-vous sur <a href="https://www.flipini.fr/" target="_new">Flipini.fr</a> ! Et pour encore plus de catégories, découvrez <a href="https://flipini.fr/categories" target="_new">les autres catégories du site</a>.</p>,
<h2 key={21}>Questions fréquemment posées sur la catégorie &ldquo;Supermarchés&ldquo; de Flipini.fr</h2>,
<h4 key={22}>Qu&apos;est-ce que la catégorie &ldquo;Supermarchés&ldquo; sur Flipini.fr ?</h4>,
<p key={23}>La catégorie &ldquo;Supermarchés&ldquo; regroupe l&apos;ensemble des <strong>catalogues en ligne</strong> des principales enseignes de supermarchés en France. Vous pouvez y feuilleter facilement et rapidement les dernières offres et promotions.</p>,
<h4 key={24}>Quels sont les supermarchés disponibles dans cette catégorie ?</h4>,
<p key={25}>Dans la catégorie &ldquo;Supermarchés&ldquo;, vous trouverez les catalogues de grandes enseignes telles que Lidl, Intermarché, Carrefour, Auchan, Aldi, Magasins U, Carrefour Market, E.Leclerc, Cora, Leader Price, Monoprix, Géant, Casino, Grand Frais, Picard, Match et bien d&apos;autres.</p>,
<h4 key={26}>Est-ce gratuit de feuilleter les catalogues sur Flipini.fr ?</h4>,
<p key={27}>Oui, l&apos;accès et la consultation des catalogues sur Flipini.fr sont totalement gratuits. Aucune inscription n&apos;est requise pour feuilleter les catalogues.</p>,
<h4 key={28}>À quelle fréquence les catalogues sont-ils mis à jour ?</h4>,
<p key={29}>Les catalogues sont mis à jour régulièrement, généralement en fonction de la périodicité de chaque enseigne. La plupart des supermarchés publient un nouveau catalogue chaque semaine.</p>,
<h4 key={30}>Comment puis-je rechercher un produit ou une offre spécifique ?</h4>,
<p key={31}>Vous pouvez utiliser la fonction de recherche intégrée sur Flipini.fr pour trouver un produit ou une offre spécifique dans les catalogues. Saisissez simplement le nom du produit ou le mot-clé souhaité dans la barre de recherche.</p>,
<h4 key={32}>Y a-t-il une application mobile Flipini pour consulter les catalogues ?</h4>,
<p key={33}>Oui, Flipini.fr dispose d&apos;une <a href="https://play.google.com/store/apps/details?id=com.ya2s.flipini">application mobile</a> pour une expérience optimisée sur smartphones et tablettes. Elle est disponible sur les principales plateformes de téléchargement.</p>,
<h4 key={34}>Puis-je recevoir des notifications pour les nouvelles offres ?</h4>,
<p key={35}>Si vous utilisez l&apos;application mobile, vous pouvez activer les notifications pour être informé des nouveaux catalogues et des offres spéciales des supermarchés de votre choix.</p>,
<h4 key={36}>Je ne trouve pas le catalogue de mon supermarché préféré. Que faire ?</h4>,
<p key={37}>Si vous ne trouvez pas le catalogue d&apos;une enseigne spécifique, nous vous invitons à nous contacter via la section &ldquo;Contact&ldquo; du site. Nous ferons de notre mieux pour l&apos;ajouter à notre sélection.</p>,
<h4 key={38}>Puis-je partager une offre intéressante avec mes amis ou ma famille ?</h4>,
<p key={39}>Oui, chaque page de catalogue dispose d&apos;options de partage qui vous permettent de partager vos trouvailles sur les réseaux sociaux, par e-mail ou via d&apos;autres plateformes de messagerie.</p>,

    ]
}