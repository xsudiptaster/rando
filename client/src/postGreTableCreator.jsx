import React from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import SimpleCrypto from "simple-crypto-js";
import $ from "jquery";
import Cookies from "universal-cookie";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class postGreTableCreator extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = ContentReviewStore;
	}
	render() {
		var listTables = [];
		return (
			<div className="slds-grid">
				<table>
					<tr>
						<td>
							<label className="slds-text-heading_medium">Select Existing Table: </label>
						</td>
						<td>
							<input />
							<datalist />
						</td>
						<td>
							<input type="button" value="Create a New Table" />
						</td>
					</tr>
				</table>
			</div>
		);
	}
}
