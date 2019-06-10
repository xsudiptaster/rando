import axios from "axios";
import React from "react";
import "./App.css";
import ErrorAndLoading from "./errorAndLoading";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class postGreTableCreator extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = ContentReviewStore;
		this.state=this.store.firstdata;
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
	handleChange(fieldName, RowData, rowNo, thisVal) {
		if (this.state.currentTableValues[rowNo]["id"] != undefined) {
			this.state.currentTableValues[rowNo][fieldName] = thisVal.target.value;
			var oq = "Update " + this.state.selectTable + " SET " + fieldName + " =$2 Where id= $1";
			var dat = [];
			dat.push(this.state.currentTableValues[rowNo]["id"]);
			dat.push(this.state.currentTableValues[rowNo][fieldName]);
			ContentReviewerActions.stateupdates(this.state);
			axios
				.post("/api/runUpdateQuery", {
					oquery: oq,
					dataValue: dat,
				})
				.then(response => {
					if (!response.data.status) {
						ContentReviewerActions.showError(response.data.msg.toString(), this.state);
						console.log("The response ", response);
					}
					
				})
				.catch(error => {
					ContentReviewerActions.showError(error.toString(), this.state);
				});
		} else {
			//INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00, '2007-12-13' ), (5, 'David', 27, 'Texas', 85000.00, '2007-12-13');
		}
	}
	addRow() {
		if (this.state.currentTableHeaders.length > 0) {
			var newObj = {};
			for (var i = 0; i < this.state.currentTableHeaders.length; i++) {
				newObj[this.state.currentTableHeaders[i]] = "";
			}
			this.state.currentTableValues.push(newObj);
			ContentReviewerActions.stateupdates(this.state);
		}
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
					</tr>
					<tr>
						<div>
							<table className="displayTable slds-table " style={{ border: "solid thin" }}>
								<thead style={{ paddingBottom: "10px", minHeight: "10px" }}>
									<tr
										className="slds-line-height_reset "
										style={{ fontWeight: "5px", background: "#1798c1" }}>
										<th style={{ border: "solid thin", background: "#1798c1" }}>Row No. </th>
										{headers.map(headervalue => (
											<th
												style={{
													border: "solid thin",
													background: "#1798c1",
													minWidth: "200px",
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
													onChange={this.handleChange.bind(
														this,
														headervalue,
														dataValue,
														index,
													)}
												/>
											</td>
										))}
									</tr>
								))}
								<tr>
									<td>
										<input
											class="slds-button slds-button_neutral"
											value="Add New Row"
											onClick={() => this.addRow()}
											style={{
												display:
													this.state != undefined &&
													this.state.currentTableHeaders != undefined &&
													this.state.currentTableHeaders.length > 0
														? "block"
														: "none",
											}}
										/>
									</td>
								</tr>
							</table>
						</div>
					</tr>
				</table>
				<ErrorAndLoading />
			</div>
		);
	}
}
