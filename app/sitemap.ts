import { MetadataRoute } from 'next';
 import {CategoryModel} from './../model/CategoryModel';
 import {SubCategoryModel} from './../model/SubCategoryModel';
 import {BookDetailsModel} from './../model/BookDetailsModel';
const URL = "https://flipini.fr/";

type SiteMapType = {
    categories: CategoryModel[],
    magasins: SubCategoryModel[],
    catalogues: BookDetailsModel[],
}
async function getSiteMap(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/site-map`,{ cache: 'no-store'});
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
            url: URL + c.title,
            lastModified: c.updated_at,

        };
        return toReturn;
    });

    let fetchedCategories = siteMapData.categories.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + c.slug,
            lastModified: new Date(),

        };
        return toReturn;
    });

    let fetchedMagasins = siteMapData.magasins.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + c.slug,
            lastModified: new Date(),

        };
        return toReturn;
    });


  return [
    {
      url: 'https://flipini.fr',
      lastModified: new Date(),

    },
    {
        url: 'https://flipini.fr/contact',
        lastModified: new Date(),

      },
    ...fetchedCatalogues,
    ...fetchedMagasins,
    ...fetchedCategories

  ]
}