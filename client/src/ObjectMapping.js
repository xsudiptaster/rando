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
        console.log("This is ", val);
        console.log('This is event', event.target.value);
        this.state.objectMapping[val].ObjectName = event.target.value;
        if (this.state == undefined || this.state.ObjectDesb == undefined ||
            this.state.ObjectDesb[event.target.value] ==
            undefined) {
            this.getObjectDescribe(event.target.value);
        }
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
                ContentReviewerActions.stateupdates(this.state);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        var rowsdv = [];
        var objdesb = {};
        this.columnnOptions();
        if (this.state && this.state.objectMapping != undefined) {
            rowsdv = Object.keys(this.state.objectMapping);
        }
        if (this.state && this.state.ObjectDesb != undefined) {
            objdesb = this.state.ObjectDesb
        }
        return (
            <div className="slds-card">
                <table>
                    <tr>
                        <th>
                            <label className="slds-text-body_large">SheetName</label>
                        </th>
                        <th>
                            <label className="slds-text-body_large">Object Name</label>
                        </th>
                        <th>
                            <label className="slds-text-body_large">
                                External Id From Sheet
                            </label>
                        </th>
                        <th>
                            <label className="slds-text-body_large">
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
                                <select
                                    className="slds-select"
                                    onChange={this.onchangeObjectSelection.bind(this, value)}
                                >
                                    <option value="none">Please Select</option>
                                    {this.state.objectList.map(valob => (
                                        <option value={valob.name}>{valob.label}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select className="slds-select">
                                    <option value="none">Please Select</option>
                                    {this.state.objectMapping[value].sheetHeaders.map(val => (
                                        <option value={val}>{val}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select className="slds-select">

                                    {( objdesb["Account"] != undefined && objdesb["Account"].fields != undefined )
                                     ? objdesb["Account"].fields.map(valfld => (
                                            <option value={valfld.name}>{valfld.label}</option>
                                        )) : <option>None</option>}
                                </select>

                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}
