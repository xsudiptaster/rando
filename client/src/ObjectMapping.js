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

                </table>
            </div>
        );
    }
}
