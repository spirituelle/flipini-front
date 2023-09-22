'use client'
import  Link  from 'next/link';
import  Image  from 'next/image';
import {useState} from 'react';

import axios from './../../../../lib/axios'
import {SubCategoryModel} from './../../../../model/SubCategoryModel';
// import { getMagasin } from './../actions'

import FavoriteIcon from './../../../../components/FavoriteIcon'

async function getMagasin( {api_token, page = 1,search}:{api_token: string, page?: number, search?: string | undefined}){
    let user= {id: null};
        if(api_token){
            const userRes = await axios.get('/api/user',  { headers: { Authorization: "Bearer " + api_token } })
            console.log(userRes)
            user= userRes.data;
            // .then(response => { 
            //   dispatch({ type: "LOGIN" , user:{...response.data, api_token: state.token}})
            //     // setUser(response.data); 
            //     // setError(response.data.data.error); 
            //     // return response.data.data
            // })
            // .catch(err => {
            //     console.log(err.response);
            //     // setToken(null)
            //     deleteCookie('api_token');
            //     dispatch({ type: "LOGOUT", user: {} as UserModel })
      
            //     // setUser({} as UserModel)
            // })

            // const userRes = await fetch(
            //     `${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/api/user`, { headers: { Authorization: "Bearer " + api_token} }
            // );
            //  user= await userRes.json();
        }
        const res = await axios.get(`/api/magasin-list?user_id=${user.id}&country_id=1&page=${page}&per_page=24&search=${search}`  )
        console.log(res)
        return res.data.data as SubCategoryModel[];
    // const res = await fetch(`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/api/magasin-list?user_id=${user.id}&country_id=1&page=${page}&per_page=24&search=${search}`, { cache: 'no-store'});
    // const data = await res.json();
    // return data?.data as SubCategoryModel[];
}

export default function MAgasinsWithMore({initialShop, search, api_token}: {initialShop: SubCategoryModel[], search: string | undefined, api_token: string}){

    const [magasins, setMagasins] = useState(initialShop)
    const [page, setPage] = useState(1)

    const _showMore = () =>{
        loadMore()
    }
    async function loadMore(){
        const next = page + 1
        const magasins = await getMagasin({ search, page: next, api_token })
        setPage(next)
        setMagasins((prev) => [
            ...(prev?.length ? prev : []),
            ...magasins
          ])
    } 
    return(
        <div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
                {magasins?.map((magasin, index) => {                   
                    return (
                        <Link key={index} className="magasin-frid-item bg-white dark:bg-slate-900" href={"/magasins/" + magasin.slug}> 
                            <div className="magasin-card " >
                                <div> 
                                    <Image 
                                    alt={magasin.name}
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}/${magasin.icon }`}
                                    width={72}
                                    height={72}
                                    className="magasin-image"
                                    /> 
                                </div>
                                <h3> {magasin.name} </h3>
                                <FavoriteIcon  magasin={magasin} />
                            
                            </div> 
                        </Link>
                    )
                })}
            </div>
            <div className="my-4 flex flex-row justify-center">
                <button type="button" onClick={ () => _showMore()} className="btn btn-primary"> Afficher plus </button>
            </div>
        </div>
    )
}