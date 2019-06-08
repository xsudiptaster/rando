import { AppLauncherTile } from "@salesforce/design-system-react";
import React from "react";
import "./App.css";
import Headerdisplay from "./Headerdisplay";
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
				<div  >
					<div>
						<div className="slds-grid slds-wrap">
							<div className="slds-col slds-size_1-of-3">
								<AppLauncherTile
									title="Upsert Records"
									iconText="UR"
									description="Upsert Objects serially or parallel and use external Ids to relate them"
									href="/upsert"
								/>
							</div>
							<div className="slds-col slds-size_1-of-3">
								<AppLauncherTile
									title="Sample Records Creator"
									iconText="UR"
									description="Creates Sample records for testing"
								/>
							</div>
							<div className="slds-col slds-size_1-of-3">
								<AppLauncherTile
									title="PostgreTable Display"
									iconText="UR"
									description="Display Salesforce Table and use Heroku Connect"
									href="/postgretable"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
