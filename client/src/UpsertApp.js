import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import React from "react";
import "./App.css";
import FileuploadSection from "./FileuploadSection.js";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import LoginSection from "./LoginSection.js";
import MappingTable from "./MappingTable";
import ObjectMapping from "./ObjectMapping";
import QuestionsForOperation from "./QuestionsForOperation";
import StatusResult from "./StatusResult";

var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewStore = require("./ContentReviewStore.jsx");

class UpsertApp extends Reflux.Component {
	constructor(props) {
		super();
		this.store = ContentReviewStore;
		this.state = {
			displaySettings: {
				logindisplay: "block",
				uploadfiledisplay: "none",
				questionfordisplay: "none",
				objectmappingdisplay: "none",
				objectmappingtable: "none",
				finalupsertresult: "none",
			},
			errorModal: { height: "14rem", display: "none" },
			errorMessage: "",
			showProgress: false,
			currentApp: "Upsert",
		};
		ContentReviewerActions.stateupdates(this.state);
	}

	handleClose() {
		this.state.errorModal = { height: "14rem", display: "none" };
		ContentReviewerActions.stateupdates(this.state);
	}

	render() {
		return (
			<div>
				<div>
					<div className="slds-col slds-size_12-of-12">
						<div style={{ display: this.state.displaySettings.logindisplay }}>
							<LoginSection />
						</div>
						<div style={{ display: this.state.displaySettings.uploadfiledisplay }}>
							<FileuploadSection />
						</div>
						<div style={{ display: this.state.displaySettings.questionfordisplay }}>
							<QuestionsForOperation />
						</div>
						<div style={{ display: this.state.displaySettings.objectmappingdisplay }}>
							<ObjectMapping />
						</div>
						<div style={{ display: this.state.displaySettings.objectmappingtable }}>
							<MappingTable />
						</div>
						<div style={{ display: this.state.displaySettings.finalupsertresult }}>
							<StatusResult />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UpsertApp;
