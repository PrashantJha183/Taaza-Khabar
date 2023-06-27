import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img
        src={loading}
        alt="loading"
        style={{ height: "50px", width: "50px" }}
        className="my-3"
      />
    </div>
  );
};

export default Spinner;
