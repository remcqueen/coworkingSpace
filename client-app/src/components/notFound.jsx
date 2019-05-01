import React from "react";
import { toast } from "react-toastify";

const NotFound = () => {
  toast.error("The page you requested could not be found");
  return <h1>Not Found</h1>;
};

export default NotFound;
