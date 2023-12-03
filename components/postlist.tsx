import Image from "next/image";
import Link from "next/link";
import { cx } from "./../utils/all";
import { parseISO, format } from "date-fns";
import CategoryLabel from "./categoryLabel";
import {BlogModel} from './../model/BlogModel';

export default function PostList({
  post,
  aspect,
  minimal,
  preloadImage,
  fontSize,
  fontWeight
}:{
  post: BlogModel,
  aspect: string,
  fontSize: string,
  fontWeight: string,
  minimal: boolean,
  preloadImage: boolean,
}) {

  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            " overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800"
          )}>
          <Link
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square"
            )}
            href={`/blog/${
              post.slug
            }`}>
              <Image
                src={process.env.NEXT_PUBLIC_STORAGE_END_POINT +  post.cover}
                alt={post.title}
                priority={preloadImage ? true : false}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            
          </Link>
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div>
            <CategoryLabel
              categories={[post.subcategory, post.category]}
              nomargin={minimal}
            />
            
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                  ? "text-3xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2    dark:text-white"
              )}>
              <Link
                href={`/blog/${
                  post.slug
                }`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                      bg-no-repeat
                      transition-[background-size]
                      duration-500
                      hover:bg-[length:100%_3px]
                      group-hover:bg-[length:100%_10px]
                      dark:from-purple-800 dark:to-purple-900">
                  {post.title}
                </span>
              </Link>
            </h2>

            

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
             
                {/* <div className="flex items-center gap-3">
               
                  <span className="truncate text-sm">
                    {post.publisher}
                  </span>
                </div> */}
              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="truncate text-sm"
                dateTime={post?.updated_at || post.created_at}>
                {format(
                  parseISO(post?.updated_at || post.created_at),
                  "dd MMMM, yyyy"
                )}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
