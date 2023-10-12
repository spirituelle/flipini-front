

import {CategoryModel} from './CategoryModel';
import {BookDetailsModel} from './BookDetailsModel';

export interface SubCategoryModel{
    subcategory_id: number,
    name: string,
    meta_description: string,
    meta_title: string,
    description: string,
    slug: string,
    icon: string,
    path: string,
    is_favorite: boolean,
    categories:CategoryModel[],
    catalogues: BookDetailsModel[],


}