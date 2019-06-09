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
			.post("/api/runQuery", {
				oquery:
					"SELECT table_schema,table_name FROM information_schema.tables Where table_schema='salesforce';",
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
	handleTableSelect(event) {
		this.state.selectTable = event.target.value;
	}
	showData() {
		var q = "SELECT * FROM " + this.state.selectTable;
		axios
			.post("/api/runQuery", {
				oquery: q,
			})
			.then(response => {
				console.log("The response Data ", response);
				this.state.currentTableHeaders = Object.keys(response.data[0]);
				this.state.currentTableValues = response.data;
				ContentReviewerActions.stateupdates(this.state);
			})
			.catch(error => {});
	}
	handleChange(fieldName,RowData,rowNo,thisVal) {
		console.log("Selected 1", thisVal);
		console.log("Selected 2", fieldName);
		console.log("Selected 3", RowData);
		console.log("Selected 4", rowNo);
		this.state.currentTableValues[rowNo][fieldName]=thisVal.value;
	}
	render() {
		var listTables = [];
		var headers = [];
		var valuesToDisplay = [];
		if (this.state && this.state.allPostGresTables != undefined) {
			listTables = this.state.allPostGresTables;
			console.log("The state inside is", this.state.allPostGresTables);
		}
		if (this.state && this.state.currentTableHeaders != undefined) {
			headers = this.state.currentTableHeaders;
		}
		if (this.state && this.state.currentTableValues != undefined) {
			valuesToDisplay = this.state.currentTableValues;
		}
		return (
			<div className="slds-grid">
				<table>
					<tr>
						<table style={{ maxWidth: "500px" }}>
							<tr>
								<td>
									<label className="slds-text-heading_medium">Select Existing Table: </label>
								</td>
								<td>
									<input
										list="postGresTables"
										onChange={this.handleTableSelect.bind(this)}
										className="slds-input"
									/>
									<datalist id="postGresTables">
										{listTables.map(value => (
											<option value={value.table_schema + "." + value.table_name}>
												{value.table_name}
											</option>
										))}
									</datalist>
								</td>
								<td>
									<input
										type="button"
										value="Show Data"
										className="slds-button slds-button_neutral"
										onClick={() => this.showData()}
									/>
								</td>
							</tr>
						</table>
						<div>
							<input
								type="button"
								value="Save Data"
								className="slds-button slds-button_neutral"
								onClick={() => this.showData()}
							/>
						</div>
					</tr>
					<tr>
						<div>
							<table className="displayTable slds-table " style={{ border: "solid thin" }}>
								<thead style={{ paddingBottom: "10px", minHeight: "10px" }}>
									<tr
										className="slds-line-height_reset "
										style={{ fontWeight: "5px", background: "#1798c1" }}>
										<th style={{ border: "solid thin", background: "#1798c1" }}>
											Row No.{" "}
										</th>
										{headers.map(headervalue => (
											<th
												style={{
													border: "solid thin",
													background: "#1798c1",
													minWidth: "200px"
												}}>
												{headervalue}
											</th>
										))}
									</tr>
								</thead>
								{valuesToDisplay.map((dataValue, index) => (
									<tr>
										<td> {index}</td>
										{headers.map(headervalue => (
											<td style={{ border: "solid thin" }}>
												<input
													className="slds-input"
													value={dataValue[headervalue]}
													onChange={this.handleChange.bind(this, headervalue, dataValue, index)
													}
												/>
											</td>
										))}
									</tr>
								))}
							</table>
						</div>
					</tr>
				</table>
			</div>
		);
	}
}
