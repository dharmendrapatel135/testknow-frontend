import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const CircleLoader = ({ color = "blue", size = 20 }) => {
  return (
    <ClipLoader
      color={color}
      loading={true}
      size={size}
    />
  );
};

export default CircleLoader;
