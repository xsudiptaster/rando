import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import axios from "axios";
import XLSX  from "xlsx";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class ObjectMapping extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
    }

    columnnOptions() {
        if (this.state && this.state.objectMapping != undefined) {
            for (var i = 0; i < Object.keys(this.state.objectMapping).length; i++) {
                var first_sheet_name = Object.keys(this.state.objectMapping)[i];
                /* Get worksheet */
                var worksheet = XLSX.utils.sheet_to_json(
                    this.state.workbook.Sheets[first_sheet_name]
                );
                this.state.objectMapping[
                    Object.keys(this.state.objectMapping)[i]
                    ].sheetHeaders = Object.keys(worksheet[0]);
            }
        }
    }

    onchangeObjectSelection(val, event) {

        this.state.objectMapping[val].ObjectName = event.target.value;
        ContentReviewerActions.stateupdates(this.state);
        if (this.state == undefined || this.state.ObjectDesb == undefined ||
            this.state.ObjectDesb[event.target.value] ==
            undefined) {
            this.getObjectDescribe(event.target.value);
        }
    }

    onchangeGetExterIdFromSheet(val, event) {
        this.state.objectMapping[val].ExtFromSheet = event.target.value;
        ContentReviewerActions.stateupdates(this.state);
    }

    onchangeGetExterIdFromObj(val, event) {
        this.state.objectMapping[val].ExtFromObject = event.target.value;
        ContentReviewerActions.stateupdates(this.state);
    }

    getObjectDescribe(objName) {

        axios
            .post("/api/objectDescribe", {
                sessiontok: this.state.sessiontok,
                oUrl      : this.state.instanceUrl,
                objName   : objName
            })
            .then(response => {
                if (this.state.ObjectDesb == undefined) {
                    this.state.ObjectDesb = {};
                }
                this.state.ObjectDesb[response.data.name] = response.data;
                console.log('The Return Val', response.data);
                ContentReviewerActions.stateupdates(this.state);

            })
            .catch(error => {
                console.log(error);

            });
    }

    afterSelectionDoneClick() {
        this.state.objectmappingdisplay = {
            display: "none"
        };
        this.state.objectmappingtable = {
            display: "block"
        };
        console.log('This Sate Now', this.state);
        ContentReviewerActions.stateupdates(this.state);
    }

    render() {
        var rowsdv = [];
        var objdesb = {};
        this.columnnOptions();
        if (this.state && this.state.objectMapping != undefined) {
            rowsdv = Object.keys(this.state.objectMapping);
        }
        if (this.state && this.state.ObjectDesb != undefined) {
            for (var i = 0; i < Object.keys(this.state.ObjectDesb); i++) {
                console.log('The Key is', Object.keys(this.state.ObjectDesb)[i]);
                objdesb[Object.keys(this.state.ObjectDesb)[i]] = [];
                for (var j = 0; j < this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields.length; j++) {
                    console.log('The Field is', this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j]);
                    if (this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].externalId == true &&
                        this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].name == 'Id') {
                        objdesb[Object.keys(this.state.ObjectDesb)[i]].push(
                            this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j]);
                    }
                }

            }

        }
        console.log('The Object extIds', objdesb);
        return (
            <div className="slds-card">
                <table className="slds-table">
                    <tr>
                        <th>
                            <label className="slds-text-heading_medium">SheetName</label>
                        </th>
                        <th>
                            <label className="slds-text-heading_medium">Object Name</label>
                        </th>
                        <th>
                            <label className="slds-text-heading_medium">
                                External Id From Sheet
                            </label>
                        </th>
                        <th>
                            <label className="slds-text-heading_medium">
                                External Id in Object
                            </label>
                        </th>
                    </tr>
                    {rowsdv.map(value => (
                        <tr>
                            <td>
                                <label className="slds-text-body_small">{value}</label>
                            </td>
                            <td>
                                <input list="mylist" className="slds-input" style={{width: "200px!"}}
                                       onChange={this.onchangeObjectSelection.bind(this, value)}/>
                                <datalist id="mylist">
                                    {this.state.objectList.map(val => (
                                        <option value={val.value}>{val.label}</option>
                                    ))}
                                </datalist>
                            </td>
                            <td>
                                <input list="mylist2" style={{width: "200px!"}} className="slds-input"
                                       onChange={this.onchangeGetExterIdFromSheet.bind(this, value)}/>
                                <datalist id="mylist2">
                                    {this.state.objectMapping[value].sheetHeaders.map(val => (
                                        <option value={val}>{val}</option>
                                    ))}
                                </datalist>

                            </td>
                            <td>
                                <input list="mylist3" style={{width: "200px!"}} className="slds-input"
                                       onChange={this.onchangeGetExterIdFromObj.bind(this, value)} required=""/>
                                <datalist id="mylist3">
                                    {( objdesb[this.state.objectMapping[value].ObjectName] != undefined &&
                                        objdesb[this.state.objectMapping[value].ObjectName] != undefined )
                                     ? objdesb[this.state.objectMapping[value].ObjectName].map(valfld => (
                                            <option value={valfld.name}>{valfld.label}</option>
                                        )) : <option value="None">None</option>}
                                </datalist>

                            </td>
                        </tr>

                    ))}
                    <tr>
                        <td>
                            <input type="button" className="slds-button slds-button_neutral" value="Map Fields"
                                   onClick={() => this.afterSelectionDoneClick()}/>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}
