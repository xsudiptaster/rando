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

    updateHeaders() {
        if (this.state && this.state.objectMapping != undefined) {
            for (var i = 0; i < this.state.objectMapping.length; i++) {
                readXlsxFile(this.state.fileBlob, {sheet: this.state.objectMapping[i].SheetName}).then(data => {
                    var optns = []
                    for (var j = 0; j < data[0].length; j++) {
                        optns.push(data[0][i]);
                    }
                    this.state.objectMapping[i].sheetHeaders = optns;
                    console.log('The Headers', this.state.objectMapping[i].sheetHeaders);
                });
            }

        }

    }
    columnnOptions(shtname) {
        readXlsxFile(this.state.fileBlob, {sheet: shtname}).then(data => {
            var optns = []
            for (var i = 0; i < data[0].length; i++) {
                console.log('The Dtata', data[0][i]);
                optns.push(data[0][i]);
            }
            return optns;
        });
    }

    render() {
        this.updateHeaders();
        var rowsdv = [];
        return (
            <div className="slds-card">
                <table>
                    <tr>
                        <th>
                            <label className="slds-text-body_medium">SheetName</label>
                        </th>
                        <th>
                            <label className="slds-text-body_medium">Object Name</label>
                        </th>
                        <th>
                            <label className="slds-text-body_medium">External Id From Sheet</label>
                        </th>
                        <th>
                            <label className="slds-text-body_medium">External Id in Object</label>
                        </th>
                    </tr>
                    {rowsdv.map(value =>
                        <tr>
                            <td>
                                <label className="slds-text-body_small">{value.SheetName}</label>
                            </td>
                            <td>

                            </td>
                            <td>
                                <label className="slds-text-body_small">{value.ExtFromSheet}</label>
                            </td>
                        </tr>
                    )}

                </table>
            </div>
        );
    }
}

class OptionsColumnSelector extends Reflux.Component {
    constructor(props) {
        super(props);
        console.log('The props is ', this.props.shtname);
        this.store = ContentReviewStore;


    }

    render() {
        var optns = [];

        return (
            <select>
                {optns.map(val => <option value={val}>{val}</option>)}
            </select>
        )
    }


}