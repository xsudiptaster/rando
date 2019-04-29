import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import OptionsHeaderColumnSelector from "./OptionsHeaderColumnSelector";
import XLSX from "xlsx";
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
        var address_of_cell = "A1";
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
  getObjectDescribe(objName) {
    console.log("Called With obj", objName);
    if (this.state && this.state.ObjectDesb != undefined) {
      if (this.state.ObjectDesb[objName].fields != undefined) {
        return this.state.ObjectDesb[objName].fields;
      } else {
        axios
          .post("/api/objectDescribe", {
            sessiontok: this.state.sessiontok,
            oUrl: this.state.instanceUrl,
            objName: objName
          })
          .then(response => {
            console.log("The Response", response);
            if (this.state.ObjectDesb == undefined) {
              this.state.ObjectDesb = {};
            }
            this.state.ObjectDesb[response.data.name] = response.data;
            ContentReviewerActions.stateupdates(this.state);
          })
          .catch(error => {
            alert(error);
          });
        return [];
      }
    }
    return [];
  }
  render() {
    var rowsdv = [];
    this.columnnOptions();

    if (this.state && this.state.objectMapping != undefined) {
      rowsdv = Object.keys(this.state.objectMapping);
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
                <select className="slds-select">
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
                  {this.state.ObjectDesb["Account"].fields.map(valfld => (
                    <option value={valfld.name}>{valfld.label}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
