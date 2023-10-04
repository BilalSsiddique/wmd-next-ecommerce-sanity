import { client } from "@/../sanity/lib/client";


// fetch product details based on slug
export const getProductData = async (slug: string) => {
  const fetchedProduct = await client.fetch(
    `*[_type=="product" && slug.current=="${slug}"]{ _id,title,price,image,slug,productType->{productType}}`
  );
  return fetchedProduct;
};

// fetch all products slug
export const getProductSlug = async () => {
  const fetchedProductSlug = await client.fetch(`*[_type=="product"]{slug}`);
  return fetchedProductSlug;
};


// Fetch all products for displaying at Home page
export const getProductDataHome = async () => {
  console.log("get called");
  const res = await client.fetch(
    `*[_type == "product"] | order(_createdAt asc) { _id,title,price,image,slug,productType->{productType}}`
  );
  return res;
};