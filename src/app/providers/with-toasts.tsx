import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const withToasts = (component: () => React.ReactNode) => () =>
  (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      {component()}
    </>
  );
