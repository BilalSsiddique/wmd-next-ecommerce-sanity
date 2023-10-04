import { client } from "@/lib/sanityClient";
import ProductCardHome from "./ProductCardHome";
import { urlForImage } from "../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
// import { PreviewSuspense } from "next-sanity/preview";

export interface Products {
  _id: string;
  title: string;
  price: number;
  image: SanityImageSource | any;
  slug: {
    current: string;
  };
  productTypes: string;
}

const getProductData = async () => {
  console.log("get called");
  const res = await client.fetch(
    `*[_type == "product"] | order(_createdAt asc) { _id,title,price,image,slug}`
  );
  return res;
};

async function Products() {
  const data: Products = await getProductData();

  // console.log(data);
  return (
    <div className="flex flex-col justify-center items-center mx-5 sm:mx-auto sm:w-5/6 ">
      <h2 className="font-semibold text-[12px] text-[#0062f5]">PRODUCTS</h2>
      <h1 className="text-[#212121] font-bold mt-4 text-xl sm:text-4xl">
        Check What We Have
      </h1>
      <div className=" xl:gap-0 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  w-full  mt-10">
        {Array.isArray(data) &&
          data
            .slice(0, 3)
            .map((productDATA: Products) => (
              <ProductCardHome
                key={productDATA._id}
                title={productDATA.title}
                price={productDATA.price}
                image={urlForImage(productDATA.image[0]).url()}
                _id={productDATA._id}
                slug={productDATA.slug}
              />
            ))}
      </div>
    </div>
  );
}

export default Products;
