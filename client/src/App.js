import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import UpsertApp from "./UpsertApp.js";

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
				<UpsertApp />
			</div>
		);
	}
}

export default App;
