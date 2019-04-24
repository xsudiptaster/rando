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
            for (var i = 0; i < Object.keys(this.state.objectMapping).length; i++) {
                rowsdv.push(this.state.objectMapping[Object.keys(this.state.sheetNames)[i]])
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
                    {rowsdv.map(value => <tr>
                        <td>
                            <label className="slds-text-body_small">{value.SheetName}</label></td>
                        <td>

                        </td>
                    </tr>)}

                </table>
            </div>
        );
    }
}

class OptionsSelector extends Reflux.Component {

}