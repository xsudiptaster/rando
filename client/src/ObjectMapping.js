import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import axios from "axios";
import XLSX  from "xlsx";
import $     from "jquery";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class ObjectMapping extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
    }

    componentDidMount() {
        if (this.state && this.state.objectList != undefined) {
            $('[name="objectSelection"]').each(function (ele) {
                console.log('Mounted and called ', ele);
                for (var i = 0; i < this.state.objectList.length; i++) {
                    console.log('This inside for each', this.state.objectList.length);
                }
                ele.append('<option value="Hello">Hello</option>');
            });
        }
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

    onchangeObjectSelection(event) {
        alert('Hello');
        console.log("This is ", this);
        //if (this.state.ObjectDesb[val] == undefined) {
        //this.getObjectDescribe(val);
        //}
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
                                    headername={value}
                                    onChange={this.onchangeObjectSelection.bind(this)}
                                >
                                    <option value="none">Please Select</option>
                                    {this.state.objectList.map(valob => (
                                        <option value={valob.name}>{valob.label}</option>
                                    ))}
                                </select>
                                <select name="objectSelection">

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

                                    {objdesb["Account"] != undefined && objdesb["Account"].fields != undefined
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
