import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "250px", margin: "auto", display: "block" }}
        alt="uniConn Loading..."
      />
    </div>
  );
};

export default Spinner;
