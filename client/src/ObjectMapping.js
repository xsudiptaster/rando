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
  }

  columnnOptions(shtname) {
    readXlsxFile(this.state.fileBlob, { sheet: shtname }).then(data => {
      var optns = [];
      for (var i = 0; i < data[0].length; i++) {
        optns.push(data[0][i]);
      }
      return optns;
    });
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
                <OptionsHeaderColumnSelector shtname={value} />
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

