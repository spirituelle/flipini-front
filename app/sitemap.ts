import { MetadataRoute } from 'next';
 import {CategoryModel} from './../model/CategoryModel';
 import {SubCategoryModel} from './../model/SubCategoryModel';
 import {BookDetailsModel} from './../model/BookDetailsModel';
const URL = "https://monsieurechantillons.com/";

type SiteMapType = {
    categories: CategoryModel[],
    magasins: SubCategoryModel[],
    catalogues: BookDetailsModel[],
}
async function getSiteMap(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/site-map?country_id=${process.env.COUNTRY_ID}`,{ cache: "no-cache"});
    if(res.status === 200){
        const data = await res.json();
        return data as SiteMapType;
    }
    else{
        throw new Error
    }
    
  }
type ReturnElement = {
    // changeFrequency: "yearly" | "daily" | "always" | "hourly" | "weekly" | "monthly" | "never" | undefined,
    url: string,
    lastModified: string | Date | undefined,
    // priority: number

}
  
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const siteMapData = await getSiteMap();

    let fetchedCatalogues = siteMapData.catalogues.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + "catalogues/"+ c.title,
            lastModified: c.updated_at,
            // changeFrequency: "never",
            // priority: c.expired? 0.1 : 1,

        };
        return toReturn;
    });

    let fetchedCategories = siteMapData.categories.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + "categories/" + c.slug,
            lastModified: new Date(),
            // changeFrequency: "daily",
            // priority: 0.5,

        };
        return toReturn;
    });

    let fetchedMagasins = siteMapData.magasins.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + "magasins/" + c.slug,
            lastModified: new Date(),
            // changeFrequency: "daily",
            // priority:  0.7,

        };
        return toReturn;
    });


  return [
    {
      url: URL + '/',
      lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 1,
    },
    {
        url: URL + '/contact',
        lastModified: new Date(),
        // changeFrequency: "never",
        // priority: 0.2,
    },
    {
        url: URL + '/contact',
        lastModified: new Date(),
        // changeFrequency: "never",
        // priority: 0.2,
    },
    {
        url: URL + '/about',
        lastModified: new Date(),
        // changeFrequency: "never",
        // priority: 0.2,
    },
    {
        url: URL+ '/faq',
        lastModified: new Date(),
        // changeFrequency: "never",
        // priority: 0.2,
    },
    {
        url: URL + '/magasins',
        lastModified: new Date(),
        // changeFrequency: "never",
        // priority: 0.2,
    },
    {
        url: URL + '/categories',
        lastModified: new Date(),
        // changeFrequency: "daily",
        // priority: 0.2,
    },
    {
        url: URL + '/nouveaux-catalogues',
        lastModified: new Date(),
        // changeFrequency: "daily",
        // priority: 0.2,
    },
    ...fetchedCatalogues,
    ...fetchedMagasins,
    ...fetchedCategories

  ]
}