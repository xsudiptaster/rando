import { AppLauncherTile, BrandBand } from "@salesforce/design-system-react";
import React from "react";
import "./App.css";
import Headerdisplay from "./Headerdisplay.js";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
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
				<BrandBand
					id="brand-band-lightning-blue"
					className="slds-p-around_small"
					theme="lightning-blue"
					style={{ minHeight: "1000px" }}>
					<div>
						<div className="slds-grid slds-wrap">
							<div className="slds-col slds-size_12-of-12">
								<Headerdisplay />
							</div>
							<br />
							<br />
							<br />
							<br />
							<div className="slds-col slds-size_1-of-3">
								<AppLauncherTile
									title="Upsert Records"
									iconText="UR"
									description="Upsert Objects serially or parallel and use external Ids to relate them">
									<link to="/upsert" />
								</AppLauncherTile>
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
									description="Display PostGre Table and use Heroku Connect"
								/>
							</div>
						</div>
					</div>
				</BrandBand>
			</div>
		);
	}
}

export default App;
