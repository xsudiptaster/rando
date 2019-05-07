import React            from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import XLSX             from "xlsx";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        ContentReviewerActions.describeObject(objName, this.state);
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
            for (var i = 0; i < Object.keys(this.state.ObjectDesb).length; i++) {
                objdesb[Object.keys(this.state.ObjectDesb)[i]] = [];
                for (var j = 0; j < this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields.length; j++) {
                    if (this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].externalId == true ||
                        this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].name == 'Id') {
                        objdesb[Object.keys(this.state.ObjectDesb)[i]].push(
                            this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j]);
                    }
                }
            }
        }

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
                                <input list={"mylist-" + value} className="slds-input" style={{width: "200px!"}}
                                       onChange={this.onchangeObjectSelection.bind(this, value)}/>
                                <datalist id={"mylist-" + value}>
                                    {this.state.objectList.map(val => (
                                        <option value={val.value}>{val.label}</option>
                                    ))}
                                </datalist>
                            </td>
                            <td>
                                <input list={"mylist2-" + value} style={{width: "200px!"}} className="slds-input"
                                       onChange={this.onchangeGetExterIdFromSheet.bind(this, value)}/>
                                <datalist id={"mylist2-" + value}>
                                    {this.state.objectMapping[value].sheetHeaders.map(val => (
                                        <option value={val}>{val}</option>
                                    ))}
                                </datalist>

                            </td>
                            <td>
                                <div style={{
                                    display: objdesb[this.state.objectMapping[value].ObjectName] == undefined &&
                                             this.state.objectMapping[value].ObjectName != ""
                                             ? "block"
                                             : "none"
                                }}>
                                    <CircularProgress style={{
                                        position: "absolute", top: "30%", left: "30%", width: "17px", height: "17px",
                                        zIndex  : "10"

                                    }}/>
                                </div>
                                <input list={"mylist3-" + value} style={{
                                    width: "200px!",
                                    display: objdesb[this.state.objectMapping[value].ObjectName] != undefined ? "block"
                                                                                                              : "none"
                                }} className="slds-input"
                                       onChange={this.onchangeGetExterIdFromObj.bind(this, value)} required=""/>
                                <datalist id={"mylist3-" + value}>
                                    {(
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
