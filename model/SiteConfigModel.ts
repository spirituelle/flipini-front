

import {CategoryModel} from './CategoryModel';
import {UserModel} from './UserModel';

export interface SiteConfigModel{
    user: UserModel,
    categories:CategoryModel[],


}