
// import './../globals.css'
// import { Inter } from 'next/font/google'
// import  Link  from 'next/link';
// import { Providers } from "./../providers";

// import "./../../public/scss/style.scss";

import Header from './../../components/header-catalog'
// import  Link  from 'next/link';

// const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Flipini | ',
  description: 'Tous les catalogues de la semaine dans un seule endroit',
}

export default async function CataloguesLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section>

   
          
        <Header />
      <main id="main" >
          {children}
        </main>
        </section>
       
  )
}
