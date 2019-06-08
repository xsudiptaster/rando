import axios from "axios";
import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class postGreTableCreator extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = ContentReviewStore;
		this.getalltables();
	}
	getalltables() {
		axios
			.post("/api/getTableNames")
			.then(response => {
				console.log("The response ", response);
				this.setState({
					allPostGresTables:response.data;
				})
			})
			.catch(error => {});
	}
	render() {
		var listTables = [];
		if (this.state && this.allPostGresTables!=undefined){
			listTables
		}
		return (
			<div className="slds-grid">
				<table>
					<tr>
						<td>
							<label className="slds-text-heading_medium">Select Existing Table: </label>
						</td>
						<td>
							<input data="postGresTables" />
							<datalist id="postGresTables" >
							{listTables.map(value => (
								<option>{value}</option>
							))}
							</datalist>
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
