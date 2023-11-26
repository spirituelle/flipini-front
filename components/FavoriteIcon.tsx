'use client'
import { SubCategoryModel } from '../model/SubCategoryModel';
import { useState } from 'react';
import { getCookie } from "cookies-next";
import {UserModel} from './../model/UserModel'
import { useRouter } from 'next/navigation';

import LoginPopUp from './LoginPopUp'
export default function FavoriteIcon({magasin}: {magasin: SubCategoryModel}) {
    const [isFavorite, setIsFavorite] = useState(magasin.is_favorite);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const handleFavorite = async (e: any, magasin: SubCategoryModel) => {
        e.preventDefault();

        const api_token = getCookie('api_token');
        if(api_token != null && api_token != undefined && api_token != ""){
            let data = {subcategory_id: magasin.subcategory_id }
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-remove-favorite-magasin?country_id=${process.env.COUNTRY_ID}`,
                { method: "POST", cache: "no-cache",body: JSON.stringify(data) , headers: { Authorization: "Bearer " + api_token, 'Content-type': 'application/json',} }
            );
            let saved = await res.json();
            if(saved.status == true ){
                if(saved.message === "Catalogue a été supprimé de votre liste de souhaits")  setIsFavorite(false);
                if(saved.message === "Catalogue a été ajouté à votre liste de souhaits")  setIsFavorite(true);
               
            }
        }else{
            setOpen(true)
        }
    }

    const handleREsubmit = async (user:UserModel ) => {
        
        console.log(user);

        let data = {subcategory_id: magasin.subcategory_id }
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-remove-favorite-magasin?country_id=${process.env.COUNTRY_ID}`,
            { method: "POST", cache: "no-cache",body: JSON.stringify(data) , headers: { Authorization: "Bearer " + user.api_token, 'Content-type': 'application/json',} }
        );
        let saved = await res.json();
        if(saved.status == true ){
            if(saved.message === "Catalogue a été supprimé de votre liste de souhaits")  setIsFavorite(false);
            if(saved.message === "Catalogue a été ajouté à votre liste de souhaits")  setIsFavorite(true);
            router.refresh()
            setOpen(false)
           
        }
    }

   
    return (
        <>
        <span className="p-3 text-yellow-300" onClick={ (e) => handleFavorite(e, magasin)}> 
            <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isFavorite? "currentColor" : "black"} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>


        </span>
        <LoginPopUp open={open} setOpen={setOpen} logedIn={handleREsubmit} />
        </>
    )
}
