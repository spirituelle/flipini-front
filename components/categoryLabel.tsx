import Link from "next/link";
import Label from "./ui/label";

export default function CategoryLabel({
  categories,
  nomargin = false
}: {
  categories: any[],
  nomargin: boolean
}) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/category/${category?.slug}`}
            key={index}>
            <Label nomargin={nomargin} color={"pink"}>
              {category?.name}
            </Label>
          </Link>
        ))}
    </div>
  );
}
