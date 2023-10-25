import React from 'react'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-and-conditions`,
    },
}
export default function PrivacyPolice() {
    return (
     <div className="container privacy py-10" >
        <p>Termes et Conditions de Flipini.fr</p>
        <h2>1. Introduction</h2>
        <p>Bienvenue sur Flipini.fr, la plateforme qui vous offre un accès simplifié aux catalogues en ligne, offres, et promotions des plus grands magasins en France. Avant de naviguer sur notre site ou d&aposutiliser notre application mobile, veuillez lire attentivement ces Termes et Conditions.</p>
        <p>En accédant à Flipini.fr ou à notre application mobile, vous acceptez sans réserve l&aposensemble de ces termes et conditions. Si vous n&aposêtes pas d&aposaccord avec une partie de ces termes, nous vous invitons à ne pas utiliser nos services.</p>
        <h2>2. Description du Service</h2>
        <p>Flipini.fr est une plateforme en ligne qui rassemble et met à la disposition des utilisateurs les catalogues, offres, et promotions des magasins partenaires. Nous ne vendons pas directement de produits, mais servons d&aposintermédiaire pour faciliter l&aposaccès à ces informations.</p>
        <h2>3. Accès au Service</h2>
        <p>L&aposaccès à Flipini.fr est gratuit. Cependant, des frais de connexion et d&aposutilisation d&aposInternet peuvent s&aposappliquer selon votre fournisseur d&aposaccès. Ces frais sont à votre charge.</p>
        <h2>4. Propriété intellectuelle</h2>
        <p>Tout le contenu présenté sur Flipini.fr, y compris les textes, images, logos, et mise en page, est protégé par les droits d&aposauteur et autres droits de propriété intellectuelle. Sauf indication contraire, ces éléments sont la propriété exclusive de Flipini.fr.</p>
        <p>Il est strictement interdit de copier, modifier, distribuer ou utiliser ces contenus sans l&aposautorisation expresse de Flipini.fr.</p>
        <h2>5. Utilisation du Service</h2>
        <p>En utilisant Flipini.fr, vous vous engagez à :</p>
        <ul>
            <li>Utiliser le site et l&aposapplication mobile de manière loyale et en conformité avec les présentes conditions.</li>
            <li>Ne pas introduire de virus, code malveillant ou toute autre technologie nuisible à Flipini.fr ou à ses utilisateurs.</li>
            <li>Ne pas utiliser le site pour des activités illégales ou pour envoyer des publicités ou sollicitations non sollicitées.</li>
        </ul>
        <h2>6. Limitation de responsabilité</h2>
        <p>Bien que nous nous efforçons de fournir des informations précises et à jour, des erreurs peuvent s&aposinfiltrer. Flipini.fr ne peut être tenu pour responsable de toute erreur, omission ou inexactitude dans les catalogues ou promotions présentés.</p>
        <p>De plus, nous ne sommes pas responsables de la disponibilité des produits ou des variations de prix entre le moment où ils sont présentés sur Flipini.fr et le moment où vous vous rendez en magasin ou sur le site du marchand.</p>
        <h2>7. Modifications des Termes et Conditions</h2>
        <p>Flipini.fr se réserve le droit de modifier à tout moment les présents Termes et Conditions. Les modifications entreront en vigueur dès leur publication sur le site. En continuant à utiliser nos services après toute modification, vous acceptez de vous conformer à la version mise à jour de ces Termes et Conditions.</p>
        <h2>8. Liens vers d&aposautres sites</h2>
        <p>Flipini.fr peut contenir des liens vers d&aposautres sites. Ces sites tiers ne sont pas sous notre contrôle, et nous ne sommes pas responsables de leur contenu ou de leurs pratiques.</p>
        <h2>9. Politique de Confidentialité</h2>
        <p>Nous attachons une grande importance à la protection de vos données personnelles. Pour en savoir plus sur la manière dont nous traitons vos informations, nous vous invitons à consulter notre Politique de Confidentialité.</p>
        <h2>10. Droit applicable et juridiction</h2>
        <p>Les présents Termes et Conditions sont régis par le droit français. Tout litige relatif à l&aposinterprétation, l&aposexécution ou la validité de ces Termes et Conditions sera soumis à la compétence exclusive des tribunaux français.</p>
        <h2>11. Contact</h2>
        <p>Pour toute question concernant ces Termes et Conditions, ou pour toute remarque ou réclamation, n&aposhésitez pas à nous contacter via la page &quot;<a href="/contact">Contact</a>&quot; de notre site.</p>
        </div>
    )
}
