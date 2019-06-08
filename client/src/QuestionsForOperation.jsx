import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import arrow_up from "./lightning-design/icons/utility/arrowup_60.png";
import arrow_down from "./lightning-design/icons/utility/arrowdown_60.png";
import $ from "jquery";
import "jquery-ui/ui/widgets/sortable";
import XLSX from "xlsx";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class FileuploadSection extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = ContentReviewStore;
	}

	isRealtedCheck(event) {
		this.state.isRelated = event.target.value;
	}

	isParallelCheck(event) {
		this.state.isParallel = event.target.value;
	}

	sheetsToInsertfn(event) {
		if (event.target.checked) {
			if (this.state.sheetsToInsert && this.state.sheetsToInsert.indexOf(event.target.value) == -1) {
				this.state.sheetsToInsert.push(event.target.value);
			} else {
				this.state.sheetsToInsert = [];
				this.state.sheetsToInsert.push(event.target.value);
			}
		} else {
			if (this.state.sheetsToInsert && this.state.sheetsToInsert.indexOf(event.target.value) != -1) {
				this.state.sheetsToInsert.splice(this.state.sheetsToInsert.indexOf(event.target.value), 1);
			}
		}
		ContentReviewerActions.stateupdates(this.state);
	}

	gotoObjectMapping() {
		this.$node = $(this.refs.Sortable);
		var listElements = this.$node.children();
		this.state.sheetsToInsert = [];
		for (var i = 0; i < listElements.length; i++) {
			this.state.sheetsToInsert.push(listElements[i].innerText);
		}
		if (this.state.sheetsToInsert != undefined && this.state.sheetsToInsert.length > 0) {
			this.state.objectMapping = {};
			for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
				this.state.objectMapping[this.state.sheetsToInsert[i]] = {};
				this.state.objectMapping[this.state.sheetsToInsert[i]].ObjectName = "";
				this.state.objectMapping[this.state.sheetsToInsert[i]].ExtFromSheet = "";
				this.state.objectMapping[this.state.sheetsToInsert[i]].ExtFromObject = "";
				this.state.objectMapping[this.state.sheetsToInsert[i]].sheetHeaders = [];
				this.state.objectMapping[this.state.sheetsToInsert[i]].sheetObjectFields = [];
				this.state.objectMapping[this.state.sheetsToInsert[i]].sheetDataJsonList = XLSX.utils.sheet_to_json(
					this.state.workbook.Sheets[this.state.sheetsToInsert[i]],
				);
				this.state.objectMapping[this.state.sheetsToInsert[i]].sheetUpsertCalled = 0;
				this.state.objectMapping[this.state.sheetsToInsert[i]].sheetUpsertCompleted = 0;
			}
		} else {
			ContentReviewerActions.showError("Please select at least One Sheet", this.state);
			return;
		}
		this.state.displaySettings.questionfordisplay = "none";
		this.state.displaySettings.objectmappingdisplay = "block";
		ContentReviewerActions.stateupdates(this.state);
	}

	componentDidMount() {
		this.$node = $(this.refs.Sortable);
		this.$node.sortable({
			opacity: "1",
		});
	}

	render() {
		var rowsdv = [];
		var shhetstoInsert = [];
		if (this.state && this.state.sheetNames != undefined) {
			rowsdv = this.state.sheetNames;
		}
		if (this.state && this.state.sheetsToInsert != undefined) {
			shhetstoInsert = this.state.sheetsToInsert;
		}
		return (
			<div>
				<input
					type="button"
					value="Proceed to Object Mapping"
					className="slds-button slds-button_neutral"
					onClick={() => this.gotoObjectMapping()}
				/>
				<article className="slds-card">
					<article className="slds-card slds-card__header slds-grid">
						<div className="slds-text-heading_large">Questions</div>
					</article>
					<table className="slds-table--bordered slds-table">
						<tr>
							<td>
								<article className="slds-card">
									<div className="slds-card__header slds-grid">
										<table className="slds-table">
											<tr>
												<td>
													<div className="slds-media__body">
														<h2 className="slds-card__header-title">
															<a
																href="javascript:void(0);"
																className="slds-card__header-link slds-truncate"
																title="Accounts">
																<span>Insert Sheets in parallel ?</span>
															</a>
														</h2>
													</div>
												</td>
												<td>
													<div>
														<input
															type="checkbox"
															className="slds-checkbox"
															ref="parallel"
															onChange={this.isParallelCheck.bind(this)}
														/>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="slds-media__body">
														<h2 className="slds-card__header-title">
															<a
																href="javascript:void(0);"
																className="slds-card__header-link slds-truncate"
																title="Accounts">
																<span>Sheets to Insert ?</span>
															</a>
														</h2>
													</div>
												</td>
											</tr>

											{rowsdv.map(value => (
												<tr>
													<td>
														<label className="slds-text-body_small">{value}</label>
													</td>
													<td>
														<input
															type="checkbox"
															value={value}
															onChange={this.sheetsToInsertfn.bind(this)}
														/>
													</td>
												</tr>
											))}
										</table>
									</div>
								</article>
							</td>
						</tr>
						<tr>
							<td>
								<article className="slds-card slds-card__header slds-grid">
									<div className="slds-text-heading_large">Sequence the Upserts</div>
								</article>

								<ul ref="Sortable" opacity={"0.8"}>
									{shhetstoInsert.map(value => (
										<li className="slds-box_border">
											<article className="slds-card" style={{ width: "200px" }}>
												<div className="slds-text-align_right">
													<img
														src={arrow_up}
														className="slds-icon slds-icon--right slds-icon_x-small "
													/>
												</div>
												<div
													className="slds-text-align_center slds-text-heading_small "
													style={{ textAlign: "center" }}
													ref="sortable">
													{value}
												</div>
												<div className="slds-text-align_right">
													<img
														src={arrow_down}
														className="slds-icon slds-icon--right slds-icon_x-small"
													/>
												</div>
											</article>
										</li>
									))}
								</ul>
							</td>
						</tr>
					</table>
				</article>
			</div>
		);
	}
}
