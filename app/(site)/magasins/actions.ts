'use server'

import {SubCategoryModel} from './../../../model/SubCategoryModel';


export async function getMagasin( {api_token, page = 1,search}:{api_token: string, page?: number, search?: string | undefined}){
    let user= {id: null};
        if(api_token){
            const userRes = await fetch(
                `${process.env.BACKEND_URL}/api/user`, { headers: { Authorization: "Bearer " + api_token} }
            );
             user= await userRes.json();
        }
    const res = await fetch(`${process.env.BACKEND_URL}/api/magasin-list?user_id=${user.id}&country_id=1&page=${page}&per_page=24&search=${search}`, { cache: 'no-store'});
    const data = await res.json();
    return data?.data as SubCategoryModel[];
}