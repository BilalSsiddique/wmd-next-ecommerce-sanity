"use client";
import { client } from "@/lib/sanityClient";
import ProductCardHome from "./ProductCardHome";
import { urlForImage } from "../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, A11y, Autoplay } from "swiper";

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
      <div className=" xl:gap-0 place-items-center  w-full flex mt-10">
        <Swiper
        
          spaceBetween={0}
          slidesPerView={3}
          autoplay
          modules={[Navigation, A11y, Autoplay]}
          breakpoints={{
            100: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            // width >= 300
            300: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // width >= 1000
            1000: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // width >= 1260
            1260: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
        >
          {Array.isArray(data) &&
            data.map((productDATA: Products) => (
              <SwiperSlide key={productDATA._id}>
                <ProductCardHome
                  swidth="340px"
                  mwidth="380px"
                  title={productDATA.title}
                  price={productDATA.price}
                  image={urlForImage(productDATA.image[0]).url()}
                  _id={productDATA._id}
                  slug={productDATA.slug}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Products;
