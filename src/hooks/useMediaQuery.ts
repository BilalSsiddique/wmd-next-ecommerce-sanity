import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQList = window.matchMedia(query);
    if (mediaQList.matches !== matches) {
      setMatches(mediaQList.matches);
    }
    const listener = () => setMatches(mediaQList.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

export default useMediaQuery;
