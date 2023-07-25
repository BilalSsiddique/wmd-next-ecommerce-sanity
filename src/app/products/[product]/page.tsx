import React from "react";
import { client } from "@/../sanity/lib/client";
import ImageSection from "@/components/ImageSection";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "../../../../sanity/lib/image";

// fetch product details based on slug
const getProductData = async (slug: string) => {
  const fetchedProduct = await client.fetch(
    `*[_type=="product" && slug.current=="${slug}"]{ _id,title,price,image,slug}`
  );
  return fetchedProduct;
};

// fetch all products slug
const getProductSlug = async () => {
  const fetchedProductSlug = await client.fetch(`*[_type=="product"]{slug}`);
  return fetchedProductSlug;
};

export async function generateStaticParams() {
  let slugs: any = await getProductSlug();
  return slugs.map((produ: { slug: { current: string } }) => ({
    product: produ.slug.current,
  }));
}

export const dynamic = "force-static";

const ProductDetails = async ({ params }: { params: { product: string } }) => {
  console.log("prams", params);
  const produc = await getProductData(params.product);
  const productData = produc[0];
  console.log("product:", productData);

  const imageUrls = productData.image.map((imageUrl: any) =>
    urlForImage(imageUrl).width(700).url()
  );
  console.log("url", imageUrls);

  return (
    <div className="flex justify-between  mx-5 sm:mx-auto sm:w-5/6 my-[20px]">
      <ImageSection urls={imageUrls} productData={productData}/>
    </div>
  );
};

export default ProductDetails;
