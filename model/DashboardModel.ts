import {CardModel} from './CardModel'
import {MagasinModel} from './MagasinDetailsModel'

export interface DashboardModel{
    status:String,
    cards: CardModel[],
    top_magasin: MagasinModel[],

}