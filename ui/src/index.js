import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import RestaurantsTable from "./components/restaurantsTable";
import Uploader from "./components/uploader";
import RestaurantEditor from "./components/restaurantEditor";
import Filter from "./components/filter";
import './styles.css';

const rootElement = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <Filter/>
    <RestaurantsTable/>
    <Uploader/>
    <RestaurantEditor/>
  </Provider>,
  rootElement
);