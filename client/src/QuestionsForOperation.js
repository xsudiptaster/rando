import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class FileuploadSection extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ContentReviewStore;
    this.setState({
      isRelated: false
    });
  }
  readthefile(event) {
    this.setState({
      fileBlob: event.target.files[0]
    });
    readXlsxFile(event.target.files[0], { getSheets: true }).then(data => {
      this.setState({
        sheetNames: data
      });
    });
  }
  isRealtedCheck(event) {
    this.state.isRelated = event.target.value;
  }
  render() {
    return (<div />);
  }
}
