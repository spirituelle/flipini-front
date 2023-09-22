

import {BookDetailsModel} from './BookDetailsModel';
import {SubCategoryModel} from './SubCategoryModel';

export interface CategoryModel{
    category_id: number,
    name: string,
    slug: string,
    icon: string,
    subcategories: SubCategoryModel[],
    catalogues: BookDetailsModel[],
}