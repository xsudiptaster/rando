import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import OptionsHeaderColumnSelector from "./OptionsHeaderColumnSelector";
import XLSX from 'xlsx';
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class ObjectMapping extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ContentReviewStore;
    this.getobjectlist();   
  }

  columnnOptions() {
    if (this.state && this.state.objectMapping != undefined) {
        for (var i=0;i<Object.keys(this.state.objectMapping).length;i++)
        {
            var first_sheet_name = Object.keys(this.state.objectMapping)[i];
            var address_of_cell = 'A1';
            /* Get worksheet */
            var worksheet = XLSX.utils.sheet_to_json(this.state.workbook.Sheets[first_sheet_name]);
            this.state.objectMapping[Object.keys(this.state.objectMapping)[i]].sheetHeaders=Object.keys(worksheet[0]);
        }
    }
  }
  getobjectlist(){
    if (this.state && this.state.objectMapping != undefined) {
        
        axios
          .post("/api/objectList", {
            sessiontok: this.state.sessiontok,
            oUrl: this.state.instanceUrl
          })
          .then(response => {
            var ListObjects=[]
            var objectsList=response.data.sobjects;
            for (var i=0;i<objectsList.length;i++)
            {
                var obj={}
                if (objectsList[i].createable){
                    obj.name=objectsList[i].name;
                    obj.label=objectsList[i].label;    
                }
                ListObjects.push(obj);
            }
            console.log('Object Listed',ListObjects);
          })
          .catch(error => {
            alert(error);
          });
    }
        
      
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
              <label className="slds-text-body_small">{value}</label>
              </td>
              <td>
              <select className="slds-select">
                {this.state.objectMapping[value].sheetHeaders.map(val => (
                <option value={val}>
                     {val}   
                </option>    
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

