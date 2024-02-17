import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

const PageLoader = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(
    () => {
      let timer;
      if (isLoading) {
        // Display the loader after 300 milliseconds
        timer = setTimeout(() => {
          setShowLoader(true);
        }, 300);
      } else {
        // Hide the loader when isLoading becomes false
        setShowLoader(false);
      }

      return () => clearTimeout(timer);
    },
    [isLoading]
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)", // semi-transparent white background
        zIndex: 9999, // ensure the loader is on top of everything
        visibility: showLoader ? "visible" : "hidden" // show/hide the loader
      }}
    >
      {showLoader &&
        <ThreeDots
          visible={true}
          height={80}
          width={80}
          color="#4fa94d"
          radius={9}
          ariaLabel="three-dots-loading"
        />}
    </div>
  );
};

export default PageLoader;
