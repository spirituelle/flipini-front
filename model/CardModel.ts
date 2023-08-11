

import {BookDetailsModel} from './BookDetailsModel';

export interface CardModel{
    id: number,
    title: String,
    bookList: BookDetailsModel[],
}