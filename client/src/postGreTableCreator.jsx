import Modal from "@material-ui/core/Modal";
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
		this.state = this.store.firstdata;
		this.state.showAddRow = false;
		this.state.newObj={};
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
				.post(
					"/api/runUpdateQuery",
					{
						oquery: oq,
						dataValue: dat,
					},
					{
						timeout: 50000,
					},
				)
				.then(response => {
					if (!response.data.status) {
						ContentReviewerActions.showError(response.data.msg.toString(), this.state);
						console.log("The response ", response);
					}
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			var oq = "INSERT INTO " + this.state.selectTable + "(";
			var columns = "";
			//INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00, '2007-12-13' ), (5, 'David', 27, 'Texas', 85000.00, '2007-12-13');
		}
	}
	addRow() {
		this.state.showAddRow = true;
		this.state.newObj={};
		ContentReviewerActions.stateupdates(this.state);
	}
	callSaveOfNew() {
		this.state.showAddRow = false;
		ContentReviewerActions.stateupdates(this.state);
	}
	cancelScreen() {
		this.state.showAddRow = false;
		ContentReviewerActions.stateupdates(this.state);
	}
	render() {
		var listTables = [];
		var headers = [];
		var valuesToDisplay = [];
		var listEvenHeader = [];
		var listOddHeader = [];
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
		if (this.state && this.state.currentTableHeaders != undefined) {
			headers = this.state.currentTableHeaders;
			for (var i = 0; i < this.state.currentTableHeaders.length; i++) {
				if (i % 2 == 0) {
					listEvenHeader.push(this.state.currentTableHeaders[i]);
				} else {
					listOddHeader.push(this.state.currentTableHeaders[i]);
				}
				this.state.newObj[this.state.currentTableHeaders[i]] = "";
			}
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
											className="slds-button slds-button_neutral"
											value="Add New Row"
											type="button"
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
				<div className="slds-align_absolute-center">
					<Modal
						open={this.state.showAddRow}
						style={{ height: "100%" }}
						className="slds-align_absolute-center">
						<div style={{ paddingBottom: "100Px" }}>Insert Object Info</div>
						<div>
							<div
								style={{
									height: "100%",
									width: "100%",
									zIndex: "10",
									backgroundColor: "white",
								}}
								className="slds-align_absolute-center">
								<div style={{ alignItems: "center" }}>
									<table className="slds-table">
										<tr>
											<td>
												<table className="slds-table">
													{listEvenHeader.map(value1 => (
														<tr>
															<td>{value1}</td>
															<td>
																<input type="text" value={this.state.newObj[value1]} />
															</td>
														</tr>
													))}
												</table>
											</td>
											<td>
												<table className="slds-table">
													{listOddHeader.map(value1 => (
														<tr>
															<td>{value1}</td>
															<td>
																<input type="text" />
															</td>
														</tr>
													))}
												</table>
											</td>
										</tr>
										<tr>
											<td>
												<input
													type="button"
													value="Cancel"
													className="slds-button slds-button_neutral"
													onClick={() => this.cancelScreen()}
												/>
											</td>
											<td>
												<input
													type="button"
													value="Save"
													className="slds-button slds-button_neutral"
													onClick={() => this.callSaveOfNew()}
												/>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}
