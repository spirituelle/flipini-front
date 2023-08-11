import  Link  from 'next/link';
import slugify from 'slugify';
import { BookDetailsModel } from '../../../model/BookDetailsModel';
import GeneralCard from "./../../../components/Cards/generale";
import Breadcrumb from './../../../components/Breadcrumb';


async function getCatalogues(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/newest-book`, { cache: 'no-store' });
    const data = await res.json();
    
    // return data;
    return data?.data as BookDetailsModel[];
}

export default async function NewCatalogPage(){
    const catalogues = await getCatalogues();
    return(
        <div className="category category-page container">
            <Breadcrumb containerClassName=""  />
            {/* <h1>  </h1> */}
            <div >
            <GeneralCard title="Nouveaux Catlogues" readMoreLink={"/"} showReadMore={false} catalogs={catalogues} />
            </div>
        </div>
    )
}


  