import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class ObjectMapping extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
    }
    render() {
        var rowsdv = [];

        if (this.state && this.state.objectMapping != undefined) {
            console.log('The State', this.state);
            for (var i = 0; i < this.state.objectMapping.length; i++) {
                rowsdv.push(this.state.objectMapping[i]);
            }
        }
        console.log('Rows', rowsdv);
        return (
            <div className="slds-card">
                <table>
                    <tr>
                        <th>
                            <label>SheetName</label>
                        </th>
                        <th>
                            <label>Object Name</label>
                        </th>
                        <th>
                            <label>External Id From Sheet</label>
                        </th>
                        <th>
                            <label>External Id in Object</label>
                        </th>
                    </tr>
                    {rowsdv.map(function (value, indx) {
                        <tr>
                        <td>
                            <label className="slds-text-body_small">{value.SheetName}</label>
                        </td>
                        <td>
                            <label className="slds-text-body_small">{value.ObjectName}</label>
                        </td>
                            <td>
                                <label className="slds-text-body_small">{value.ExtFromSheet}</label>
                            </td>
                        </tr>
                    })}

                </table>
            </div>
        );
    }
}

class OptionsSelector extends Reflux.Component {

}