import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";
import OptionsHeaderColumnSelector from "./OptionsHeaderColumnSelector";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class ObjectMapping extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ContentReviewStore;
    this.columnnOptions();
  }

  columnnOptions(shtname) {
    if (this.state && this.state.objectMapping != undefined) {
        for (var i=0;i<Object.keys(this.state.objectMapping).length;i++)
        {
            var first_sheet_name = Object.keys(this.state.objectMapping)[i];
            var address_of_cell = 'A1';
            /* Get worksheet */
            var worksheet = this.state.workbook.Sheets[first_sheet_name];
            console.log('The Sheets ',worksheet);
        }
    }
  }
  render() {
    var rowsdv = [];
    if (this.state && this.state.objectMapping != undefined) {
      rowsdv = Object.keys(this.state.objectMapping);
    }
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
              <label className="slds-text-body_medium">
                External Id From Sheet
              </label>
            </th>
            <th>
              <label className="slds-text-body_medium">
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
                <OptionsHeaderColumnSelector shtname={value} fileblb={this.state.fileBlob}/>
              </td>
              <td>
                <label className="slds-text-body_small">{value}</label>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

