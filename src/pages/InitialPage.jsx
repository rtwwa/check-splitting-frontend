import React from "react";
import Camera from "../components/Camera";
import { Link } from "react-router";

const InitialPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex flex-col">
      <Camera />
      <Link to="/check/123">TestPage</Link>
    </div>
  );
};

export default InitialPage;
