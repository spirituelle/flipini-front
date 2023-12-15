
import Breadcrumb from './../../../components/Breadcrumb';

import {BlogModel} from './../../../model/BlogModel';
// import {SubCategoryModel} from './../../../model/SubCategoryModel';
import  Link  from 'next/link';
// import { cookies } from 'next/headers'

// import CatalogItemExpended from "./../../../components/CatalogItemExpended";
// import GeneralCard from "./../../../components/Cards/generale";
import Container from "./../../../components/container"

import  Image  from 'next/image';
import { parseISO, format } from "date-fns";

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryLabel from "./../../../components/categoryLabel";
// import {PortableText} from "./../component/portableText"
import MultiplexAd from './../../../components/ads/multiplex.js'
type Props = {
    params: { slug: string }
    // searchParams: { [key: string]: string | string[] | undefined }
  }
export async function generateMetadata(
    { params }: Props,
    // parent: ResolvingMetadata
  ): Promise<Metadata> {   
    // fetch data
    const res = await getBlog(params.slug);
      
    return {
        title:`${res.title}`,
        generator: `${res.title}`,
        applicationName: "Flipini",
        description: `${res.description}` ,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
        },
        openGraph: {
            title: res.title,
            type: "website",
            url: process.env.NEXT_PUBLIC_SITE_URL +  "/blog/" + params.slug,
            siteName: "flipini",
            description: `${res.description}` ,
            images: [`${process.env.NEXT_PUBLIC_STORAGE_END_POINT}${res.cover}`],
        },
    }
  }
 

export const dynamicParams = false;

export async function generateStaticParams() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/blog-posts/paths?country_id=${process.env.COUNTRY_ID}` ,{ next: { tags: [ 'blogs'] }});
   const resJson = await res.json();
   const blogPosts = resJson as BlogModel[];
    return blogPosts.map(blogpost=> ({
        slug: blogpost.slug
    }));
}


async function getBlog(slug: string){
    const res = await fetch(
        `${process.env.BACKEND_URL}/api/blog-post/${slug}?country_id=${process.env.COUNTRY_ID}`,{ next: { tags: [ 'blogs'] }}
    );
    if(res.status === 200){
        const data = await res.json();
        return data.data as BlogModel;
    }
    else{
        notFound()
    }
  
    
}

export default async function BlogPostPage({params}: any){

    const post = await getBlog(params.slug);
    return(
        <div className="blog blog-page container">
            <Breadcrumb containerClassName=""  />
      <Container className="!pt-0" large={false} alt={false}>
        <div className="mx-auto max-w-screen-md ">
          <div className="flex justify-center">
            <CategoryLabel nomargin={false} categories={[post.category, post.subcategory]} />
          </div>

          <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {post.title}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
           
              <div>
          
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.updated_at || post.created_at}>
                    {format(
                      parseISO(post?.updated_at || post.created_at),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  {/* <span>· {post.estReadingTime || "5"} min read</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_END_POINT +post.cover}
            alt={post.title || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover"
          />
      </div>

      <Container large={false} alt={false} className="">
        <article className="mx-auto max-w-screen-md ">
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600 blog-body">
            {post.content && <div className="leading-loose" dangerouslySetInnerHTML={{__html: post.content}} ></div>}
            
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href="/blog"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
              ← Voir tous les post
            </Link>
          </div>
          {/* {post.author && <AuthorCard author={post.author} />} */}
        </article>
      </Container>
        </div>
    )
}