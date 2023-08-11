import {CardModel} from './CardModel'
import {MagasinModel} from './MagasinModel'

export interface DashboardModel{
    status:String,
    cards: CardModel[],
    top_magasin: MagasinModel[],

}