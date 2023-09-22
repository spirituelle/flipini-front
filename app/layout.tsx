
import './globals.css'
import { Inter } from 'next/font/google'
// import  Link  from 'next/link';
import { Providers } from "./providers";

import "./../public/scss/style.scss";

import Footer from './../components/footer'
import MobileMenu from './../components/header/partials/mobile-menu'
import OverlayMobileMenu from './../components/Overlay'
import { AuthWrapper } from './../hooks/auth.context'; 

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Flipini | ',
  description: 'Tous les catalogues de la semaine dans seule endroit',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

