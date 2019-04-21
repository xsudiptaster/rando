import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay from "./Headerdisplay.js";
import LoginSection from "./LoginSection.js";
import FileuploadSection from "./FileuploadSection.js";
var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewerStore = require("./ContentReviewStore.jsx");

class App extends Reflux.Component {
  constructor(props) {
    super();
    mixins: [Reflux.listenTo(ContentReviewerStore, "onChange")],
      (this.state = {
        username: "",
        password: "",
        sessiontok: "",
        loginurl: "",
        logindisplay: {
          visibility: "visible"
        },
        uploadfiledisplay: {
          visibility: "hidden"
        }
      });
    this.store = ContentReviewerStore;
  }
  onChange(firstdata) {
    console.log("Hello Data");
    console.log("Store Update", firstdata);
    this.state = firstdata;
  }
  // Fetch passwords after first mount
  componentDidMount() {}
  render() {
    console.log("The State Data", this.state);
    return (
      <div className="slds-grid slds-wrap">
        <div className="slds-col slds-size_12-of-12">
          <Headerdisplay />
        </div>
        <div className="slds-col slds-grid slds-size_1-of-2">
          <div className="slds-col slds-size_1-of-2">
            <span>Nested: 1</span>
          </div>
          <div className="slds-col slds-size_1-of-2">
            <div style={this.state.logindisplay}>
              <LoginSection />
            </div>
            <div style={this.state.uploadfiledisplay}>
              <FileuploadSection />
            </div>
          </div>
          <div className="slds-col slds-size_1-of-2">
            <span>Nested: 2</span>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
