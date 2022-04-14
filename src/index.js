import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoute } from "./pages/AppRoute";
import "./assets/css/index.scss";
import { Provider } from "react-redux";
import { appStore } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <AppRoute />
  </Provider>
);
