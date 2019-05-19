import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./rootReducer";

import "./index.css";

let initialStore = JSON.parse(localStorage.getItem("store")) || {};

let store = createStore(
    rootReducer,
    initialStore,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

store.subscribe(() =>
    localStorage.setItem("store", JSON.stringify(store.getState()))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
