import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import $ from "jquery";
import axios from "axios";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class MappingTable extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = ContentReviewStore;
	}

	mapfieldAsSelected(SheetName, SheetHeader, ev) {
		this.mapFieldsAsSelectedUpdate(SheetName, SheetHeader, ev.target.value);
	}

	mapFieldsAsSelectedUpdate(SheetName, SheetHeader, FieldApi) {
		this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader] = {};
		this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["FieldName"] = FieldApi;
		for (var i = 0; i < this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields.length; i++) {
			if (
				this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].name == FieldApi &&
				this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].type == "reference"
			) {
				this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["ExterId"] = "";
				this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader][
					"ObjectName"
				] = this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].referenceTo[0];
				this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader][
					"RelationName"
				] = this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].relationshipName;
				if (
					this.state == undefined ||
					this.state.ObjectDesb == undefined ||
					this.state.ObjectDesb[
						this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].referenceTo[0]
					] == undefined
				) {
					ContentReviewerActions.describeObject(
						this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].referenceTo[0],
						this.state,
					);
				}
			}
		}
		ContentReviewerActions.stateupdates(this.state);
	}

	mapfieldWhenExternalId(SheetName, SheetHeader, ev) {
		this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["ExterId"] = ev.target.value;
		ContentReviewerActions.stateupdates(this.state);
	}

	onClickUpsert() {
		this.state.ErrorLog = {};
		this.state.objectmappingtable = {
			display: "none",
		};
		this.state.finalupsertresult = {
			display: "block",
		};
		ContentReviewerActions.stateupdates(this.state);
		if (this.state.isParallel) {
			for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
				var SheetName = this.state.sheetsToInsert[i];
				this.state.ErrorLog[SheetName] = [];
				this.callforSingleRecordUpsert(SheetName);
			}
		} else {
			this.state.SheetInsertIndex = 0;
			if (this.state.sheetsToInsert[this.state.SheetInsertIndex] != undefined) {
				var SheetName = this.state.sheetsToInsert[this.state.SheetInsertIndex];
				this.state.ErrorLog[SheetName] = [];
				this.callforSingleRecordUpsert(SheetName);
			}
		}
	}

	callNextSheetInsert(SheetName) {
		if (
			(this.state.objectMapping[SheetName].sheetUpsertCalled = this.state.objectMapping[
				SheetName
			].sheetDataJsonList.length)
		) {
			this.state.SheetInsertIndex++;
			if (this.state.sheetsToInsert[this.state.SheetInsertIndex] != undefined) {
				var SheetName = this.state.sheetsToInsert[this.state.SheetInsertIndex];
				this.state.ErrorLog[SheetName] = [];
				this.callforSingleRecordUpsert(SheetName);
			}
		}
	}
	callforSingleRecordUpsert(SheetName) {
		if (
			this.state.objectMapping[SheetName].sheetUpsertCalled <
			this.state.objectMapping[SheetName].sheetDataJsonList.length
		) {
			var JsonString = this.createTheRequestJson(
				this.state.objectMapping[SheetName].sheetUpsertCalled,
				SheetName,
			);
			this.callupsertAccordingly(SheetName, JsonString);
		} else if (!this.state.isParallel) {
			this.callNextSheetInsert(SheetName);
		}
	}

	callupsertAccordingly(SheetName, JsonString) {
		axios
			.post(
				"/api/objectUpsert",
				{
					sessiontok: this.state.sessiontok,
					oUrl: this.state.instanceUrl,
					objectName: this.state.objectMapping[SheetName].ObjectName,
					ExternalName: this.state.objectMapping[SheetName].ExtFromObject,
					dataToUpsert: JsonString,
				},
				{
					timeout: 50000,
				},
			)
			.then(response => {
				if (!response.data[0].success) {
					this.state.ErrorLog[SheetName].push(response.data[0].errors[0].message);
				}
				this.state.objectMapping[SheetName].sheetUpsertCompleted++;
				this.state.objectMapping[SheetName].sheetUpsertCalled++;
				ContentReviewerActions.stateupdates(this.state);
				this.callforSingleRecordUpsert(SheetName);
			})
			.catch(error => {
				console.log("The Error", error);
			});
	}

	createTheRequestJson(indexRecord, SheetName) {
		if (this.state.objectMapping != undefined) {
			var sheetParam = this.state.objectMapping[SheetName];
			var JsonBuilt = {};
			var listData = [];
			var headerMapped = Object.keys(sheetParam.sheetObjectFields);
			var JsonSheet = sheetParam.sheetDataJsonList[indexRecord];
			var obj = {};
			for (var i = 0; i < headerMapped.length; i++) {
				var stateHeaderObject = sheetParam.sheetObjectFields[headerMapped[i]];
				if (stateHeaderObject.FieldName != undefined && stateHeaderObject.FieldName != "") {
					if (
						stateHeaderObject.RelationName != undefined &&
						stateHeaderObject.RelationName != "" &&
						stateHeaderObject.ExterId != undefined &&
						stateHeaderObject.ExterId != ""
					) {
						var InnerObj = {};
						InnerObj[sheetParam.sheetObjectFields[headerMapped[i]].ExterId] = JsonSheet[headerMapped[i]];
						obj[sheetParam.sheetObjectFields[headerMapped[i]].RelationName] = InnerObj;
					} else {
						obj[sheetParam.sheetObjectFields[headerMapped[i]].FieldName] = JsonSheet[headerMapped[i]];
					}
				}
			}
			obj[sheetParam.ExtFromObject] = JsonSheet[sheetParam.ExtFromSheet];
			listData.push(obj);
			return JSON.stringify(listData);
		}
	}

	autoMatch() {
		var sheetNames = Object.keys(this.state.objectMapping);
		for (var i = 0; i < sheetNames.length; i++) {
			var objName = this.state.objectMapping[sheetNames[i]].ObjectName;
			for (var j = 0; j < this.state.objectMapping[sheetNames[i]].sheetHeaders.length; j++) {
				var sheetHeader = this.state.objectMapping[sheetNames[i]].sheetHeaders[j];
				for (var k = 0; k < this.state.ObjectDesb[objName].fields.length; k++) {
					var field = this.state.ObjectDesb[objName].fields[k];
					if (field.label.indexOf(sheetHeader) > -1 || field.name.indexOf(sheetHeader) > -1) {
						this.mapFieldsAsSelectedUpdate(sheetNames[i], sheetHeader, field.name);
						$(this.refs["select-" + sheetNames[i] + "-" + sheetHeader]).val(field.name);
					}
				}
			}
		}
	}
	render() {
		var panls = [];
		var objdesbs = {};
		var extrDesbs = {};
		var Headers = {};
		if (this.state && this.state.objectMapping != undefined) {
			panls = Object.keys(this.state.objectMapping);
			for (var l = 0; l < panls.length; l++) {
				if (
					this.state.objectMapping[panls[l]].ExtFromSheet != "" &&
					this.state.objectMapping[panls[l]].ExtFromSheet != undefined
				) {
					Headers[panls[l]] = this.state.objectMapping[panls[l]].sheetHeaders;

					Headers[panls[l]].splice(
						Headers[panls[l]].indexOf(this.state.objectMapping[panls[l]].ExtFromSheet),
						1,
					);
				}
			}
		}
		if (this.state && this.state.ObjectDesb != undefined) {
			objdesbs = this.state.ObjectDesb;
		}
		if (this.state && this.state.ObjectDesb != undefined) {
			for (var i = 0; i < Object.keys(this.state.ObjectDesb).length; i++) {
				extrDesbs[Object.keys(this.state.ObjectDesb)[i]] = [];
				for (var j = 0; j < this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields.length; j++) {
					if (this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].externalId == true) {
						extrDesbs[Object.keys(this.state.ObjectDesb)[i]].push(
							this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j],
						);
					}
				}
			}
		}

		return (
			<div>
				<table>
					<tr>
						<td>
							<div>
								<input
									value="Upsert"
									type="button"
									className="slds-button slds-button--neutral"
									onClick={() => this.onClickUpsert()}
								/>
							</div>
						</td>
						<td>
							<div>
								<input
									value="Auto Match"
									type="button"
									className="slds-button slds-button--neutral"
									onClick={() => this.autoMatch()}
								/>
							</div>
						</td>
					</tr>
				</table>
				{panls.map(value => (
					<ExpansionPanel>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>{value}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								<table className="slds-table slds-table_bordered">
									<tr>
										<th className="slds-line-height_reset slds-truncate slds-text-heading_medium">
											Column Name
										</th>
										<th className="slds-line-height_reset slds-truncate slds-text-heading_medium">
											Field Name
										</th>
										<th className="slds-line-height_reset slds-truncate slds-text-heading_medium">
											External Id(Default is Id)
										</th>
									</tr>
									{this.state && this.state.objectMapping && Headers[value] != undefined ? (
										Headers[value].map(val => (
											<tr>
												<td> {val} </td>
												<td>
													<input
														list={"List3-" + value}
														style={{
															width: "200px!",
														}}
														className="slds-input"
														ref={"select" + "-" + value + "-" + val}
														onChange={this.mapfieldAsSelected.bind(this, value, val)}
													/>
													<datalist id={"List3-" + value}>
														{objdesbs[this.state.objectMapping[value].ObjectName] !=
															undefined &&
														objdesbs[this.state.objectMapping[value].ObjectName].fields !=
															undefined ? (
															objdesbs[
																this.state.objectMapping[value].ObjectName
															].fields.map(valfld => (
																<option value={valfld.name}>{valfld.label}</option>
															))
														) : (
															<option> None </option>
														)}
													</datalist>
												</td>
												<td
													style={{
														display:
															this.state.objectMapping[value].sheetObjectFields !=
																undefined &&
															this.state.objectMapping[value].sheetObjectFields[val] !=
																undefined &&
															this.state.objectMapping[value].sheetObjectFields[val]
																.ObjectName != undefined
																? "block"
																: "none",
													}}>
													<div
														style={{
															display:
																this.state.objectMapping[value].sheetObjectFields !=
																	undefined &&
																this.state.objectMapping[value].sheetObjectFields[
																	val
																] != undefined &&
																this.state.objectMapping[value].sheetObjectFields[val]
																	.ObjectName != undefined &&
																extrDesbs[
																	this.state.objectMapping[value].sheetObjectFields[
																		val
																	].ObjectName
																] == undefined
																	? "block"
																	: "none",
														}}>
														<CircularProgress
															style={{
																position: "absolute",
																top: "30%",
																left: "30%",
																width: "17px",
																height: "17px",
																zIndex: "10",
															}}
														/>
													</div>
													<input
														list={"List4-" + value + "-" + val}
														style={{
															width: "200px!",
															display:
																extrDesbs[
																	this.state.objectMapping[value].sheetObjectFields[
																		val
																	].ObjectName
																].length > 0
																	? "block"
																	: "none",
														}}
														className="slds-input"
														onChange={this.mapfieldWhenExternalId.bind(this, value, val)}
													/>
													<datalist id={"List4-" + value + "-" + val}>
														{this.state.objectMapping[value].sheetObjectFields !=
															undefined &&
														this.state.objectMapping[value].sheetObjectFields[val] !=
															undefined &&
														this.state.objectMapping[value].sheetObjectFields[val]
															.ObjectName != undefined &&
														extrDesbs[
															this.state.objectMapping[value].sheetObjectFields[val]
																.ObjectName
														] != undefined &&
														extrDesbs[
															this.state.objectMapping[value].sheetObjectFields[val]
																.ObjectName
														].length > 0 ? (
															extrDesbs[
																this.state.objectMapping[value].sheetObjectFields[val]
																	.ObjectName
															].map(valfld => (
																<option value={valfld.name}>{valfld.label}</option>
															))
														) : (
															<option> None </option>
														)}
													</datalist>
												</td>
											</tr>
										))
									) : (
										<div />
									)}
								</table>
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))}
			</div>
		);
	}
}
