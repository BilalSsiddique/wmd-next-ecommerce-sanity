import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default async function SuccessPayment() {
  return (
    <div className="mx-auto flex max-w-[1560px] flex-col space-y-24 px-5 sm:px-10 md:px-16 lg:px-20">
      <div className="my-2  flex flex-col items-center justify-center space-y-6 rounded-xl shadow-inner bg-[#f1f1f1] px-5 py-10 sm:my-10">
        <BsFillCheckCircleFill size={120} color={"green"} />
        <p className="text-center text-xl sm:text-4xl font-bold text-[#212121]">
          Thank you for your order!
        </p>
        <p className="text-center">Check your email inbox for the receipt</p>
        <p className="text-center">
          If you have any questions, please email{" "}
          <span className="whitespace-nowrap text-red-800">
            dinemarket@example.com
          </span>
        </p>
        <Link className="w-full sm:w-5/6 mx-auto" href={"/products"}>
          <button
            className={`  border-custom w-full  px-2 shadow-inner  gap-x-2   py-2  rounded-md bg-[#212121] text-white text-base`}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
