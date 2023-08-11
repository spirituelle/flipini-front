import { useRouter } from 'next/navigation';

import  Link  from 'next/link';
import DropDpwn from './dropdown'
function CategoryMenu () {
    const query = useRouter().query;

    // return (
    //     <div className="dropdown category-dropdown">
    //         <Link href="/shop/sidebar/list" className="dropdown-toggle" title="Browse Categories">
    //             Browse Categories
    //         </Link>

    //         <div className="dropdown-menu">
    //             <nav className="side-nav">
    //                 <ul className="menu-vertical sf-arrows">
    //                     <li className={ query?.category == 'electronics' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=electronics" scroll={ false }>Electronics</Link></li>
    //                     <li className={ query?.category == 'gift-idea' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=gift-idea" scroll={ false }>Gift Ideas</Link></li>
    //                     <li className={ query?.category == 'beds' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=beds" scroll={ false }>Beds</Link></li>
    //                     <li className={ query?.category == 'lighting' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=lighting" scroll={ false }>Lighting</Link></li>
    //                     <li className={ query?.category == 'sofas-and-sleeper-sofas' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=sofas-and-sleeper-sofas" scroll={ false }>Sofas & Sleeper sofas</Link></li>
    //                     <li className={ query?.category == 'storage' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=storage" scroll={ false }>Storage</Link></li>
    //                     <li className={ query?.category == 'armchairs-and-chaises' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=armchairs-and-chaises" scroll={ false }>Armchairs & Chaises</Link></li>
    //                     <li className={ query?.category == 'decoration' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=decoration" scroll={ false }>Decoration </Link></li>
    //                     <li className={ query?.category == 'kitchen-cabinets' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=kitchen-cabinets" scroll={ false }>Kitchen Cabinets</Link></li>
    //                     <li className={ query?.category == 'coffee-and-tables' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=coffee-and-tables" scroll={ false }>Coffee & Tables</Link></li>
    //                     <li className={ query?.category == 'furniture' ? 'active' : '' }><Link href="/shop/sidebar/3cols?category=furniture" scroll={ false }>Outdoor Furniture </Link></li>
    //                 </ul>
    //             </nav>
    //         </div>
    //     </div>
    // );
    return(
    //     <div>
    //     <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Browse Categories <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
    //     <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    //         <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
    //           <li>
    //             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
    //           </li>
    //           <li>
    //             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
    //           </li>
    //           <li>
    //             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
    //           </li>
    //         </ul>
    //         <div className="py-1">
    //           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
    //         </div>
    //     </div>
    // </div>
    <DropDpwn />
    )
}

export default CategoryMenu; 