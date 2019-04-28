import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");


export default class OptionsHeaderColumnSelector extends Reflux.Component {
    constructor(props) {
      super(props);
      console.log("The props is ", this.props.shtname);
      this.store = ContentReviewStore;
    }
    updateHeaders() {
      if (this.state && this.state.objectMapping != undefined) {
        for (var i = 0; i < Object.keys(this.state.objectMapping).length; i++) {
          readXlsxFile(this.state.fileBlob, {
            sheet: Object.keys(this.state.objectMapping)[i]
          }).then(data => {
            console.log("the options are", this.options.sheet);
            var optns = [];
            for (var j = 0; j < data[0].length; j++) {
              optns.push(data[0][i]);
            }
            this.state.objectMapping[this.props.shtname].sheetHeaders = optns;
            ContentReviewerActions.stateupdates(this.state);
          });
        }
      }
    }
    render() {
      this.updateHeaders();
      var optns = [];
      if (this.state && this.state.objectMapping != undefined) {
        optns = this.state.objectMapping[this.props.shtname].sheetHeaders;
        console.log("The Sheets", optns);
      }
      return (
        <select>
          {optns.map(val => (
            <option value={val}>{val}</option>
          ))}
        </select>
      );
    }
  }
  