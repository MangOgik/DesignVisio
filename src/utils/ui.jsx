export function capitalizeFirstLetter(str) {
  if (Array.isArray(str)) {
    return str
      .map(element => {
        return element.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      })
      .join(' ');
  }
  
  if (!str) return str;
  
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const ellipsisGenerator = (description) => {
  return {
    rows: 2,
    expendable: true,
    symbol: "more",
    tooltip: description,
  };
};

import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
