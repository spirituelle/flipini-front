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
    const res = await fetch(`${process.env.BACKEND_URL}/api/site-map`,{ next: { tags: ['home', 'catalogues'] }});
    if(res.status === 200){
        const data = await res.json();
        return data as SiteMapType;
    }
    else{
        throw new Error
    }
    
  }
type ReturnElement = {
    changeFrequency: "yearly" | "daily" | "always" | "hourly" | "weekly" | "monthly" | "never" | undefined,
    url: string,
    lastModified: string | Date | undefined,
    priority: number

}
  
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const siteMapData = await getSiteMap();

    let fetchedCatalogues = siteMapData.catalogues.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + "catalogues/"+ c.title,
            lastModified: c.updated_at,
            changeFrequency: "never",
            priority: c.expired? 0.1 : 1,

        };
        return toReturn;
    });

    let fetchedCategories = siteMapData.categories.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + "categories/" + c.slug,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,

        };
        return toReturn;
    });

    let fetchedMagasins = siteMapData.magasins.map((c, i) => {
        let toReturn:ReturnElement;
        toReturn = {
            url: URL + "magasins/" + c.slug,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority:  0.7,

        };
        return toReturn;
    });


  return [
    {
      url: 'https://flipini.fr',
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
        url: 'https://flipini.fr/contact',
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.2,
    },
    {
        url: 'https://flipini.fr/contact',
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.2,
    },
    {
        url: 'https://flipini.fr/about',
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.2,
    },
    {
        url: 'https://flipini.fr/faq',
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.2,
    },
    {
        url: 'https://flipini.fr/magasins',
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.2,
    },
    {
        url: 'https://flipini.fr/categories',
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.2,
    },
    {
        url: 'https://flipini.fr/nouveaux-catalogues',
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.2,
    },
    ...fetchedCatalogues,
    ...fetchedMagasins,
    ...fetchedCategories

  ]
}