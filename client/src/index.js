import BrandBand from "@salesforce/design-system-react/components/brand-band";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Headerdisplay from "./Headerdisplay";
import "./index.css";
import postGreTableCreator from "./postGreTableCreator";
import registerServiceWorker from "./registerServiceWorker";
import UpsertApp from "./UpsertApp";

ReactDOM.render(
	<BrowserRouter>
		<div
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
					<Route exact={true} path="/" component={App} />
					<Route path="/upsert" component={UpsertApp} />
					<Route path="/postgretable" component={postGreTableCreator} />
				</div>
			</div>
		</div>
	</BrowserRouter>,
	document.getElementById("root"),
);
registerServiceWorker();
