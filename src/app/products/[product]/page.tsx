import React from "react";
import ImageSection from "@/components/ImageSection";
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "../../../../sanity/lib/image";
import { getProductData,getProductSlug } from "../../../../sanity/FetchData";


export async function generateStaticParams() {
  let slugs: any = await getProductSlug();
  return slugs.map((produ: { slug: { current: string } }) => ({
    product: produ.slug.current,
  }));
}

export const dynamic = "force-static";

const ProductDetails = async ({ params }: { params: { product: string } }) => {
  
  const produc = await getProductData(params.product);
//   const productData =  {
//   title: 'Cameryn Sash Tie Dress',
//   price: 545,
//   type:'jeans',
//   // image: [
//   //   { _type: 'img', _key: '198583e4bdf7', asset: [Object] },
//   //   { asset: [Object], _type: 'img', _key: '98ab2d66823b' },
//   //   { _type: 'img', _key: '34e7a75d4c11', asset: [Object] },
//   //   { _key: '1288f018d4f2', asset: [Object], _type: 'img' }
//   // ],
//   slug: { current: 'cameryn-sash-tie-dress', _type: 'slug' },
//   _id: 'c4bc24ac-d531-4659-9313-b1b8ad6a4510'
// }
  

  // const imageUrls =[
  //     "https://cdn.sanity.io/images/2uuczd4l/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png?w=700&fit=max&auto=format",
  //     "https://cdn.sanity.io/images/2uuczd4l/production/678c1dd51d26380191c9eef7f59e852522491f78-134x143.png?w=700&fit=max&auto=format",
  //     "https://cdn.sanity.io/images/2uuczd4l/production/fad703737467ff104a7224f38aaac61c29d5ce52-134x143.png?w=700&fit=max&auto=format",
  //     "https://cdn.sanity.io/images/2uuczd4l/production/1ddb566e73b9bc57c94e66196f6c2d818f894668-134x143.png?w=700&fit=max&auto=format"
  //   ];
  const productData = produc[0]
  const imageUrls =productData.image.map((imageUrl: any) =>
    urlForImage(imageUrl).width(700).url()
  );
  const product = {...productData,imageUrls}
  

  return (
    <div className="flex justify-between  mx-5 sm:mx-auto sm:w-5/6 my-[20px]">
      <ImageSection productData={product}/>
    </div>
  );
};

export default ProductDetails;
