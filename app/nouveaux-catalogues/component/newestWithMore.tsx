'use client'
// import  Link  from 'next/link';
// import  Image  from 'next/image';
import {useState, useEffect} from 'react';
import { useInView } from 'react-intersection-observer'
import GeneralCard from "./../../../components/Cards/generale";

import axios from './../../../lib/axios'
import {BookDetailsModel} from './../../../model/BookDetailsModel';
// import { getMagasin } from './../actions'

// import FavoriteIcon from './../../../components/FavoriteIcon'

type Meta = {
    current_page: number,
    last_page: number,
    total_items: number,
  }
  


async function getMagasin( { page = 1,search}:{ page?: number, search?: string | undefined}){
    let user= {id: null};
        // if(api_token){
        //     const userRes = await axios.get('/api/user',  { headers: { Authorization: "Bearer " + api_token } })
        //     user= userRes.data;
        // }
        const res = await axios.get(`/api/newest-book?country_id=${process.env.NEXT_PUBLIC_COUNTRY_ID}&page=${page}&per_page=24&search=${search}`  )
        return { data: res.data.data as BookDetailsModel[], meta: res.data.pagination as Meta};
   
}

export default function NewestWithMore({initialItems, search}: {initialItems: BookDetailsModel[], search: string | undefined}){

    const [magasins, setMagasins] = useState(initialItems)
    const [page, setPage] = useState(1)
    const [finished, setFiniched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ref, inView] = useInView({ trackVisibility: true, delay: 500 })


    useEffect(() => {
        if (inView) {
            loadMore()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inView])
    async function loadMore(){
        if(!loading && !finished){
              const next = page + 1
        setLoading(true)
        const magasins = await getMagasin({ search, page: next })
        setLoading(false)
        setPage(next)
        setFiniched(magasins.meta.last_page == magasins.meta.current_page);
        setMagasins((prev) => [
            ...(prev?.length ? prev : []),
            ...magasins.data
          ])
        }
      
    } 
    return(
        <div>
           <GeneralCard title="Nouveaux Catlogues" readMoreLink={"/"} onlyScroll={false} showReadMore={false} catalogs={magasins} />
          {!finished &&  <div
                ref={ref}
                className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'
            >
                <svg
                aria-hidden='true'
                className='h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                >
                <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                />
                <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                />
                </svg>
                <span className='sr-only'>Loading...</span>
            </div>}
            
        </div>
    )
}