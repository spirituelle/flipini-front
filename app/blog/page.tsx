


import Breadcrumb from './../../components/Breadcrumb';

// import { cookies } from 'next/headers'
import  Link  from 'next/link';
// import  Image  from 'next/image';
import { Metadata } from 'next'
import {BlogModel} from './../../model/BlogModel';
// import { format } from 'date-fns'
import PostList from "./../../components/postlist"
import Container from "./../../components/container"
// import BlogWithMore from './component/moreBlog';
// import {getMagasin} from './actions'
import { cx } from "./../../utils/all";
import { redirect } from 'next/navigation'
// import {  RedirectType } from 'next/redirect'


export const metadata: Metadata = {
  title:  "Flipini: l'appli pour consulter Catalogues et Promos de vos enseignes préférées.",
  description:
    "Flipini est une application innovante qui vous permet de consulter les catalogues en ligne des enseignes françaises spécialisées dans la grande distribution, l'électroménager, le bricolage, la mode et bien d'autres domaines. L'application met à votre disposition une vaste sélection de catalogues pour vous aider à dénicher les meilleures offres et promotions en un seul endroit.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    },
}


type Meta = {
    current_page: number,
    last_page: number,
    total:number
  }
async function getBlogPosts( { page, limit, search}:{ page?: number, limit?: number, search?: string | undefined}){
    const res = await fetch(`${process.env.BACKEND_URL}/api/blog-posts?country_id=${process.env.COUNTRY_ID}&page=${page}&per_page=24&search=${search}&per_page=${limit}`,{ next: { tags: [ 'blogposts'] }});
    const data = await res.json();
    return  { data: data.data as BlogModel[], meta: data.meta as Meta};
}

export default async function MagasinPage({
    searchParams
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }){
    let page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

    const blogPosts = await getBlogPosts({ page, limit, search});
    const isLast = blogPosts.meta.last_page == blogPosts.meta.current_page;
    const isAboveLast = blogPosts.meta.current_page >blogPosts.meta.last_page;
    // page = isAboveLast ? blogPosts.meta.last_page : page;
    if(isAboveLast){
        redirect(`/blog?page=${blogPosts.meta.last_page}`);
    }
    return(
        <div className="blog blog-page" >
            <Container large={false} className="articles-list" alt={false} >
                <Breadcrumb containerClassName=""  />
                <div className="page-header blog-header">
                    <h1 className="page-title subtitle bg-primary">
                        <div className="bg-primary">
                                Actualité &amp; Vie Pratique								
                        </div>
                    </h1>
                </div>
                <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
                    {blogPosts.data.slice(0, 2).map((post, index) => (
                    <PostList
                        key={post.id}
                        post={post}
                        aspect="landscape"
                        preloadImage={index== 0 ? true : false}
                        minimal={false}
                        fontSize="large"
                        fontWeight="normal"
                    />
                    ))}
                </div>
                <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
                    {blogPosts.data.slice(2, 14).map(post => (
                    <PostList key={post.id} post={post} aspect="square" preloadImage={false} minimal={false}  fontSize="large" fontWeight="normal"  />
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                <Link
                    href={{
                        pathname: '/blog',
                        query: {
                        ...(search ? { search } : {}),
                        page: page > 1 ? page - 1 : 1
                        }
                    }}
                    className={cx(
                        ' gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:bg-gray-800 dark:text-gray-300',
                        page <= 1 && 'pointer-events-none opacity-50'
                    )}
                    >
                    Précédent
                    </Link>
                    <Link
                    href={{
                        pathname: '/blog',
                        query: {
                        ...(search ? { search } : {}),
                        page: page + 1
                        }
                    }}
                    className={cx(' gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:bg-gray-800 dark:text-gray-300', isLast && 'pointer-events-none opacity-50' )}
                    >
                    Suivant
                    </Link>
                </div>
          </Container>
        </div>
    )
}
