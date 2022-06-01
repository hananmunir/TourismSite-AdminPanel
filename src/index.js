import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./Reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
