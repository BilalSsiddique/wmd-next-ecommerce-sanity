import React from "react";
import Link from "next/link";

const LinkC = ({
  page,
  selectedPage,
  setSelectedPage,
  isMenuToggled,
  setIsMenuToggled,
}: {
  page: string;
  selectedPage: string;
  setSelectedPage: React.Dispatch<string>;
  setIsMenuToggled?: React.Dispatch<boolean>;
  isMenuToggled?: boolean;
}) => {
  function setPageAndToggle() {
    setSelectedPage(page);
    if (isMenuToggled !== undefined && setIsMenuToggled !== undefined) {
      setIsMenuToggled(!isMenuToggled);
    }
  }

  console.log(selectedPage, page);
  return (
    <Link
      className={`  sm:text-[16px] ${
        selectedPage === page ? "text-[#0062f5] " : ""
      }
        hover:text-yellow transition duration-500`}
      href={`/#${page}`}
      onClick={setPageAndToggle}
    >
      {page}
    </Link>
  );
};

export default LinkC;