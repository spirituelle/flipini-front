

import {BookDetailsModel} from './BookDetailsModel';

export interface CardModel{
    id: number,
    title: string,
    slug: string,

    bookList: BookDetailsModel[],
}