import React from "react";
import ReactDOM from "react-dom";
import "./app/styles/index.css";
import "dayjs/locale/ru";
import App from "./app";
import reportWebVitals from "./app/reportWebVitals";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-5XKDH4C",
};

TagManager.initialize(tagManagerArgs);

declare global {
  interface Window {
    app: {
      name?: string;
      version?: string;
    };
  }
}

window.app = {
  name: process.env.REACT_APP_NAME,
  version: process.env.REACT_APP_VERSION,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
