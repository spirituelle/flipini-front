

import {BookDetailsModel} from './BookDetailsModel';

export interface CardModel{
    id: number,
    title: string,
    bookList: BookDetailsModel[],
}