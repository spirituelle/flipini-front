import Image from 'next/image'
import  Link  from 'next/link';
import Tabs from "./../../../components/Tab"
import Breadcrumb from './../../../components/Breadcrumb';
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
}
export default function ProfilePage() {
 
    return (
      <div className="md:container profile-page">
        <Breadcrumb containerClassName=""  />

        <Tabs />
      </div>
     
    )
  }
  