

import {BookDetailsModel} from './BookDetailsModel';
import {SubCategoryModel} from './SubCategoryModel';

export interface MagasinModel{
    magasin: SubCategoryModel,
    catalogs: BookDetailsModel[],
    catalogsExpired: BookDetailsModel[],
    recommended_book: BookDetailsModel[],
    similar_magasin: SubCategoryModel[]
}