import { BookDetailsModel } from './BookDetailsModel';
import { BookImagesModel } from './BookImagesModel';

export interface BookDescriptionModel{
    book_detail: BookDetailsModel,
    recommended_book: BookDetailsModel[],
    book_image_data: BookImagesModel[],

}
