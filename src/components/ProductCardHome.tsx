import React from "react";
import Image from "next/image";
import Link from "next/link";


interface IProductCardHome {
  _id: string;
  title: string;
  price: number;
  image: string;
  slug: {
    current: string;
  };
  category?:boolean;
  productType?:string;
}

const ProductCardHome: React.FC<IProductCardHome> = ({slug,title,price,image,category,productType}) => {
  return (
    <div className={`   w-full  mb-10`}>
      <Link className="" href={`/products/${slug.current}`}>
        <Image
          priority={true}
          className="object-cover "
          src={image}
          alt={title}
          height={350}
          width={650}
        ></Image>
        <div className="mt-2 text-lg font-semibold flex flex-col justify-start items-start">
          <h2>{title}</h2>
          {category ? <p className="text-[#888]">{productType}</p> : ""}
          <p className="mt-1">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardHome;
