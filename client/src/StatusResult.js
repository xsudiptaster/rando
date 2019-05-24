import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import XLSX from "xlsx";
import $ from "jquery";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class StatusResult extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = ContentReviewStore;
	}
	handleDownload() {
		var wb = { SheetNames: [], Sheets: {} };
		for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
			var sheetName = this.state.sheetsToInsert[i];
			var tbl = this.refs["log-" + sheetName];
			var ws = XLSX.utils.table_to_sheet(tbl);
			wb.SheetNames.push(sheetName);
			wb.Sheets[sheetName] = ws;
		}
		console.log("the WorkBook", wb);
		var blob = new Blob([this.s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))], {
			type: "application/octet-stream",
		});
		this.saveAs(blob, "logs.xlsx");
	}
	s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
		return buf;
	}
	saveAs(blob, name) {
		var element = document.createElement("a");
		element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(blob));
		element.setAttribute("download", name);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	render() {
		var SheetNames = [];
		var ObjMapping = {};
		var ErrorLog = {};
		var logButtonDisplay = "block";
		if (this.state != undefined && this.state.sheetsToInsert != undefined) {
			SheetNames = this.state.sheetsToInsert;
		}
		if (this.state && this.state.objectMapping) {
			ObjMapping = this.state.objectMapping;

			for (var i = 0; i < Object.keys(this.state.objectMapping).length; i++) {
				var sheetName = Object.keys(this.state.objectMapping)[i];
				if (
					this.state.objectMapping[sheetName].sheetUpsertCompleted !=
					this.state.objectMapping[sheetName].sheetDataJsonList.length
				) {
					logButtonDisplay = "none";
				}
			}
		}
		if (this.state && this.state.ErrorLog) {
			ErrorLog = this.state.ErrorLog;
		}

		return (
			<div>
				<div style={{ display: logButtonDisplay }}>
					<input
						type="button"
						value="Download Logs"
						className="slds-button slds-button_neutral"
						onClick={() => this.handleDownload()}
					/>
				</div>
				<br />
				<div>
					{SheetNames.map(value => (
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<table>
									<tr>
										<td>
											<Typography>
												<label className="slds-text-heading_medium">{value}</label>
											</Typography>
										</td>
									</tr>
									<tr>
										<td>
											<progress
												className="slds-progress-bar"
												value={
													ObjMapping[value] != undefined
														? ObjMapping[value].sheetUpsertCalled
														: 0
												}
												max={
													ObjMapping[value] != undefined
														? ObjMapping[value].sheetDataJsonList.length
														: 0
												}
											/>
										</td>
									</tr>
								</table>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<div style={{ maxHeight: "400px", overflow: "scroll" }}>
									<table className="resultTable" ref={"log-" + value} id={"log-" + value}>
										{(ErrorLog[value] != undefined ? ErrorLog[value] : []).map((val, key) => (
											<tr>
												<td className="slds-wrap ">
													<label style={{ fontWeight: 700 }}>{key}</label>
												</td>
												<td className="slds-wrap" style={{ borderBottom: "3px solid black" }}>
													{val}
												</td>
											</tr>
										))}
									</table>
								</div>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</div>
			</div>
		);
	}
}
