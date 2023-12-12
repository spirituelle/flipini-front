

import {BookDetailsModel} from './BookDetailsModel';
import {SubCategoryModel} from './SubCategoryModel';

export interface CategoryModel{
    category_id: number,
    name: string,
    meta_title: string,
    meta_description: string,
    description: string,
    slug: string,
    icon: string,
    subcategories: SubCategoryModel[],
    catalogues: BookDetailsModel[],
}