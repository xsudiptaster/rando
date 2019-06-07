import { AppLauncherTile, BrandBand } from "@salesforce/design-system-react";
import React from "react";
import "./App.css";
import Headerdisplay from "./Headerdisplay.js";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import { Link } from "react-router-dom";
var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewStore = require("./ContentReviewStore.jsx");

class App extends Reflux.Component {
	constructor(props) {
		super();
		this.store = ContentReviewStore;
	}
	render() {
		return (
			<div>
				<div className="slds-p-around_small" >
				</div>
			</div>
		);
	}
}

export default App;
