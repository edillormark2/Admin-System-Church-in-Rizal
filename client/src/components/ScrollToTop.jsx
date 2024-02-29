import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      {showScrollButton &&
        <button
          className="fixed bottom-10 right-10 bg-primary text-white text-center p-2 rounded-md hover:opacity-70 text-sm sm:text-base cursor-pointer"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>}
    </div>
  );
};

export default ScrollToTop;
