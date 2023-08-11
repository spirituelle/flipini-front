

import {BookDetailsModel} from './BookDetailsModel';

export interface CategoryModel{
    category_id: number,
    name: string,
    slug: string,
    icon: string,
    catalogues: BookDetailsModel[],
}