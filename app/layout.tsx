
import './globals.css'
import { Inter } from 'next/font/google'
// import  Link  from 'next/link';
import { Providers } from "./providers";
// import { cookies } from 'next/headers'

import "./../public/scss/style.scss";

import Footer from './../components/footer'
import PopupMobileApp from './../components/popupMobileApp'
import MobileMenu from './../components/header/partials/mobile-menu'
import OverlayMobileMenu from './../components/Overlay'
// import { AuthWrapper } from './../hooks/auth.context'; 
import Header from './../components/header'
import GoogleAnalytics from './GoogleAnalytics.jsx';
import {CategoryModel} from './../model/CategoryModel';

// import {SiteConfigModel} from './../model/SiteConfigModel'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  
  title: {
    default: process.env.SITE_NAME + ' : Catalogues en ligne, Promotions et Offres de la Semaine',
  },
  description: 'Découvrez les catalogues en ligne, le catalogue de la semaine, ainsi que les meilleures offres et promotions sur '+ process.env.SITE_NAME,
}


async function getSiteConfigs(){
//   let user = {} as UserModel;
//   if(api_token){
//     const userRes = await fetch(
//         `${process.env.BACKEND_URL}/api/user`, { headers: { Authorization: "Bearer " + api_token} }
//     );
//      user= await userRes.json();
// }
  const res = await fetch(`${process.env.BACKEND_URL}/api/site-config?country_id=${process.env.COUNTRY_ID}`,{next: { tags: ['menucategories'] } });

  if(res.status === 200){
      const data = await res.json();
      return data as CategoryModel[];
  
  }
  else{
     return [] as CategoryModel[];
  }
  
}
// const siteConfigs1 = [
//   {
//     slug: "supermarches",
//     name:"Supermarchés"
//   },
//   {
//     slug: "maison",
//     name:"Maison"
//   },
//   {
//     slug: "jouets",
//     name:"Jouets"
//   },
//   {
//     slug: "mode",
//     name:"Mode"
//   },
//   {
//     slug: "electromenager",
//     name:"Electroménager"
//   },
//   {
//     slug: "bricolage",
//     name:"Bricolage"
//   },
//   {
//     slug: "bio",
//     name:"Bio"
//   },
//   {
//     slug: "jardineries",
//     name:"Jardineries"
//   },
//   {
//     slug: "bazar",
//     name:"Bazar"
//   },
//   {
//     slug: "sport",
//     name:"Sport"
//   },
//   {
//     slug: "auto",
//     name:"Auto"
//   },
//   {
//     slug: "beaute",
//     name:"Beauté"
//   },
//   {
//     slug: "bijouteries",
//     name:"Bijouteries"
//   },
// ]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const cookieStore = cookies()

  // const api_token = cookieStore.get('api_token')

  const siteConfigs = await getSiteConfigs()
  return (
    <html suppressHydrationWarning={true} lang="fr">
      <head>
      <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    

     {
       process.env.NODE_ENV === "production" && (
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4248324788374908"
        crossOrigin="anonymous"></script>
   
       )
     }
      </head>
      <body className={inter.className}>
      {
       process.env.NODE_ENV === "production" && (
        <GoogleAnalytics />
       )
     }
        {/* <AuthWrapper> */}
          <Providers>
            <Header  categories={siteConfigs}  />
            {children}
            <Footer />
          <OverlayMobileMenu />
          <MobileMenu />
          <PopupMobileApp />
          </Providers>
        {/* </AuthWrapper> */}
      
      </body>
    </html>
  )
}

