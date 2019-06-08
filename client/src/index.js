import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Headerdisplay from "./Headerdisplay.jsx";
import "./index.css";
import postGreTableCreator from "./postGreTableCreator.jsx";
import registerServiceWorker from "./registerServiceWorker";
import UpsertApp from "./UpsertApp.jsx";

ReactDOM.render(
	<BrowserRouter>
		<div style={{ minHeight: "1000px" }}>
			<div>
				<div className="slds-grid slds-wrap">
					<div className="slds-col slds-size_12-of-12">
						<Headerdisplay />
					</div>
					<br />
					<br />
					<br />
					<br />
					<div className="slds-col slds-size_12-of-12">
						<Route exact={true} path="/" component={App} />
						<Route path="/upsert" component={UpsertApp} />
						<Route path="/postgretable" component={postGreTableCreator} />
					</div>
				</div>
			</div>
		</div>
	</BrowserRouter>,
	document.getElementById("root"),
);
registerServiceWorker();
