

import {CategoryModel} from './CategoryModel';
import {BookDetailsModel} from './BookDetailsModel';

export interface SubCategoryModel{
    subcategory_id: number,
    name: string,
    slug: string,
    icon: string,
    path: string,
    is_favorite: boolean,
    categories:CategoryModel[],
    catalogues: BookDetailsModel[],


}