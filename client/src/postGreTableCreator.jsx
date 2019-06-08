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
			.post("/api/runQuery",{
				oquery: "SELECT table_schema,table_name FROM information_schema.tables Where table_schema='salesforce';"
			})
			.then(response => {
				console.log("The response ", response);
				this.setState({
					allPostGresTables: response.data,
				});
				ContentReviewerActions.stateupdates(this.state);
			})
			.catch(error => {});
	}
	render() {
		var listTables = [];
		console.log("The state is", this.state);
		if (this.state && this.state.allPostGresTables != undefined) {
			listTables = this.state.allPostGresTable;
			console.log("The state inside is", listTables);
		}
		return (
			<div className="slds-grid">
				<table>
					<tr>
						<td>
							<label className="slds-text-heading_medium">Select Existing Table: </label>
						</td>
						<td>
							<input list="postGresTables" />
							<datalist id="postGresTables">
								{listTables.map(value => (
									<option>{value.table_name}</option>
								))}
							</datalist>
						</td>
						<td>
							<input type="button" value="Show Data" />
						</td>
					</tr>
				</table>
			</div>
		);
	}
}
