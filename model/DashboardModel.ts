import {CardModel} from './CardModel'
import {SubCategoryModel} from './SubCategoryModel'

export interface DashboardModel{
    status:String,
    cards: CardModel[],
    top_magasin: SubCategoryModel[],

}