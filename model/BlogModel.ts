

import { SubCategoryModel } from "./SubCategoryModel";
import { CategoryModel } from "./CategoryModel";
export interface BlogModel{
    id: number,
    subcategory: SubCategoryModel,
    category: CategoryModel,
    title: string,
    content: string,
    slug: string,
    description: string,
    thumbnail: string,
    cover: string,
    is_recomded: boolean,
    created_at: string,
    updated_at: string,
    publisher: string,
    
}