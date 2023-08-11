import  Link  from 'next/link';
import slugify from 'slugify';
import { CategoryModel } from '../../../model/CategoryModel';
import GeneralCard from "./../../../components/Cards/generale";
import Breadcrumb from './../../../components/Breadcrumb';


async function getCategories(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/category-list`);
    const data = await res.json();
    
    // return data;
    return data?.data as CategoryModel[];
}

export default async function CategoriesPage(){
    const categories = await getCategories();
    return(
        <div className="category category-page container">
            <Breadcrumb containerClassName=""  />
            <h1> Tous les categories </h1>
            <div >
                {categories?.map((category) => {
                    return <Magasin key={category.category_id} category={category} />;
                })}
                {categories?.map((category) => {
                    return (
                        <div>
                            <GeneralCard title={category.name} readMoreLink={`/categories/${slugify(category.slug, { lower: true, remove: /[*+~.()'"!:@]/g, }) }`} showReadMore={true} catalogs={category.catalogues} />
                            {/* <h3> {category.name} </h3> */}
                            {/* <div> 

                            </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Magasin({ category }: any) {
    return (
        
            <Link href={`/categories/${slugify(category.slug, { lower: true, remove: /[*+~.()'"!:@]/g, }) }`}>
                <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 p-2.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {category.name}
            </span>
        </Link>
        

        
      );
    
  }