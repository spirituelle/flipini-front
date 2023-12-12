import { BlogModel } from './BlogModel'
import {CardModel} from './CardModel'
import {SubCategoryModel} from './SubCategoryModel'

export interface DashboardModel{
    status:string,
    home_content: HomeContent,
    cards: CardModel[],
    top_magasin: SubCategoryModel[],
    blogs: BlogModel[],

}
export interface HomeContent{
   meta_description: string,
   meta_title: string,
   content: string,
   cover: string,
   page_slug: string
}

