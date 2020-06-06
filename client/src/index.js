import "./index.css";

import Loginpage from "./components/Loginpage";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./stores/store";

ReactDOM.render(
  <Provider store={store}>
    <Loginpage />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
