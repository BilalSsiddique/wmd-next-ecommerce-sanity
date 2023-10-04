import NotFound from "@/components/NotFound";
import ProductCardHome from "@/components/ProductCardHome";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";

export async function generateStaticParams() {
  const categories: string[] = ["female", "male", "kids"];
  return categories.map((category) => ({
    category: category,
  }));
}

/**
 * function to capatalize first leter of the input params
 * to be used for staic params to match category on sanity
 */
function makeSearchParam(params: string) {
  return params.charAt(0).toUpperCase() + params.slice(1);
}

const getProductData = async (param: string) => {
  const res = await client.fetch(
    `*[_type == "product" && category->category_name == "${makeSearchParam(
      param
    )}"]{_id,title,price,image,slug,productType->{productType},category->{category_name}}`
  );

  return res;
};

export const dynamic = "force-static";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProductData(params.category);
  if (products.length == 0) {
    return <NotFound />;
  }
  return (
    <div className="grid gap-x-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-items-center mx-5 sm:mx-auto sm:w-5/6 my-[20px]">
      {Array.isArray(products) &&
        products.length > 0 &&
        products.map((product, index) => (
          <Link
            href={`/products/${product.slug.current}`}
            className="cursor-pointer"
            key={index}
          >
            <ProductCardHome
              category={true}
              key={product._id}
              title={product.title}
              price={product.price}
              image={urlForImage(product.image[0]).url()}
              _id={product._id}
              slug={product.slug}
              productType={product.productType?.productType!}
            />
          </Link>
        ))}
    </div>
  );
}
