import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import UpsertApp from "./UpsertApp.js";
import FileuploadSection from "./FileuploadSection.js";
import QuestionsForOperation from "./QuestionsForOperation";
import ObjectMapping from "./ObjectMapping";
import MappingTable from "./MappingTable";
import Headerdisplay from "./Headerdisplay";
import StatusResult from "./StatusResult";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import { BrandBand } from "@salesforce/design-system-react";

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
