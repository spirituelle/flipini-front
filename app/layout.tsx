
import './globals.css'
import { Inter } from 'next/font/google'
// import  Link  from 'next/link';
import { Providers } from "./providers";
import { cookies } from 'next/headers'

import "./../public/scss/style.scss";
import {SiteConfigModel} from './../model/SiteConfigModel'
import Footer from './../components/footer'
import MobileMenu from './../components/header/partials/mobile-menu'
import OverlayMobileMenu from './../components/Overlay'
import { AuthWrapper } from './../hooks/auth.context'; 
import Header from './../components/header'

import { UserModel } from '../model/UserModel';
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Flipini | ',
  description: 'Tous les catalogues de la semaine dans seule endroit',
}


async function getSiteConfigs({api_token}: {api_token: string | undefined}){
  let user = {} as UserModel;
  if(api_token){
    const userRes = await fetch(
        `${process.env.BACKEND_URL}/api/user`, { headers: { Authorization: "Bearer " + api_token} }
    );
     user= await userRes.json();
}
  const res = await fetch(`${process.env.BACKEND_URL}/api/site-config`,{next: { revalidate: 3600 } });
  if(res.status === 200){
      const data = await res.json();
      return {...data, user} as SiteConfigModel;
  
  }
  else{
     return {} as SiteConfigModel;
  }
  
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  const api_token = cookieStore.get('api_token')

  const siteConfigs = await getSiteConfigs({api_token: api_token?.value})

  return (
    <html lang="fr">
      <head>
      <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4994931420191066"
     crossOrigin="anonymous"></script> */}
      {/* <link rel="stylesheet" type="text/css" href="css/fonts-molla.min.css" /> */}

      </head>
      <body className={inter.className}>
        <AuthWrapper>
          <Providers>
            <Header  categories={siteConfigs.categories} user={siteConfigs.user} />
            {children}
            <Footer />
          <OverlayMobileMenu />
          <MobileMenu />

          </Providers>
        </AuthWrapper>
      
      </body>
    </html>
  )
}

