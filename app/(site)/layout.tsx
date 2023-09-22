
import Header from './../../components/header'

import {SiteConfigModel} from './../../model/SiteConfigModel'
async function getSiteConfigs(){
  const res = await fetch(`${process.env.BACKEND_URL}/api/site-config`,{next: { revalidate: 3600 } });
  if(res.status === 200){
      const data = await res.json();
      return data as SiteConfigModel;
  
  }
  else{
     return {} as SiteConfigModel;
  }
  
}



export default async function SiteLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const siteConfigs = await getSiteConfigs()


    return (
      <div >
        <Header categories={siteConfigs.categories} />
        
        <main id="main">
          {children}
        </main>
      </div>
    );
  }