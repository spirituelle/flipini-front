import {CardModel} from './CardModel'
import {SubCategoryModel} from './SubCategoryModel'

export interface DashboardModel{
    status:string,
    cards: CardModel[],
    top_magasin: SubCategoryModel[],

}