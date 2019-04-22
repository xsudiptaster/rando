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

  render() {
    return (
        <div>

        
      <article className="slds-card">
        <div className="slds-card__header slds-grid">
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <input type="checkbox" className="slds-checkbox" /> &nbsp;&nbsp;
              <a
                href="javascript:void(0);"
                className="slds-card__header-link slds-truncate"
                title="Accounts"
              >
                <span>Are the Sheets Related ?</span>
              </a>
            </h2>
          </div>
          <br/>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <input type="checkbox" className="slds-checkbox" /> &nbsp;&nbsp;
              <a
                href="javascript:void(0);"
                className="slds-card__header-link slds-truncate"
                title="Accounts"
              >
                <span>Are the Sheets Related Again ?</span>
              </a>
            </h2>
          </div>
        </div>
      </article>
      </div>
    );
  }
}
