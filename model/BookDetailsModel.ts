// import { BookImagesModel } from './BookImagesModel';
// import { MagasinModel } from './MagasinDetailsModel';

export interface BookDetailsModel{
    book_id: number,
    category_name: string,
    subcategory_name : string,
    name: string,
    subtitle: string,
    date_of_publication: Date,
    date_expiration: Date,
    title: string,
    magasin_icon: string,
    magasin_path: string,
    expired: Boolean,
    description: string,
    thumbnail_path: string,
    is_wishlist: Boolean,
    page_count: number,
}