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
    mixins: [Reflux.connect(ContentReviewStore, "ContentReviewStore")];
    super(props);
    this.store = ContentReviewStore;
  }
  readthefile(ele) {
      
      readXlsxFile(ele.target.files[0], { sheet: 2 }).then((data) => {
         console.log("the element",data );
       })
  }

  render() {
    return (
      <div className="slds-form-element">
        <span
          className="slds-form-element__label"
          id="file-selector-primary-label"
        >
          Attachment
        </span>
        <div className="slds-form-element__control">
          <div className="slds-file-selector slds-file-selector_files">
            <div className="slds-file-selector__dropzone">
              <input
                className="slds-file-selector__input slds-assistive-text"
                accept="xls/xlsx"
                type="file"
                id="file-upload-input-01"
                onChange={this.readthefile.bind(this)}
                aria-labelledby="file-selector-primary-label file-selector-secondary-label"
              />
              <label
                className="slds-file-selector__body"
                htmlFor="file-upload-input-01"
                id="file-selector-secondary-label"
              >
                <span className="slds-file-selector__button slds-button slds-button_neutral">
                  <svg
                    className="slds-button__icon slds-button__icon_left"
                    aria-hidden="true"
                  >
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#upload"
                    />
                  </svg>
                  Upload Files
                </span>
                <span className="slds-file-selector__text slds-medium-show">
                  or Drop Files
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
