import React from 'react'
import ProductCardHome from '@/components/ProductCardHome'
import { client } from '@/lib/sanityClient';
import type { Products } from '@/components/Products';
import { urlForImage } from '../../../sanity/lib/image';

const getProductData = async () => {
  console.log("get called");
  const res = await client.fetch(
    `*[_type == "product"] | order(_createdAt asc) { _id,title,price,image,slug,productType->{productType}}`
  );
  return res;
};

const page = async () => {
    const products:Products= await getProductData()
    console.log('pro0',products)
  return (
    <div className="grid gap-x-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-items-center mx-5 sm:mx-auto sm:w-5/6 my-[20px]">
      {Array.isArray(products) &&
        products.length > 0 &&
        products.map((product, index) => (
          <ProductCardHome
            category={true}
            swidth="250px"
            mwidth="250px"
            key={product._id}
            title={product.title}
            price={product.price}
            image={urlForImage(product.image[0]).url()}
            _id={product._id}
            slug={product.slug}
            productType={product.productType?.productType!}
          />
        ))}
    </div>
  );
}

export default page