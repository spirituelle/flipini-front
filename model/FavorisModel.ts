

import {BookDetailsModel} from './BookDetailsModel';

export interface FavorisModel{
    id: number,
    name: string,
    icon: string,
    path: string,
    slug: string,

    bookList: BookDetailsModel[],
}