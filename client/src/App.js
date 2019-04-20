import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay from "./Headerdisplay.js";
import LoginSection from "./LoginSection.js";
import FileuploadSection from "./FileuploadSection.js";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

class App extends Component {
  constructor(props) {
    mixins: [Reflux.listenTo(ContentReviewStore, "updatestatenow")],
      super(props);
  }
  updatestatenow(event, firstdata) {
    this.state = firstdata;
  }
  // Fetch passwords after first mount
  componentDidMount() {
    this.state.logindisplay = {
      visibility: "show"
    };
    this.state.uploadfiledisplay = {
      visibility: "hidden"
    };
  }
  render() {
    return (
      <div classclassName="slds-brand-band slds-brand-band_large slds-brand-band_group">
        <Headerdisplay />
        <div>
          <br />
          <br />
          <br />
          <br />
          <div style={this.state.logindisplay}>
            <LoginSection />
          </div>
          <div style={this.state.uploadfiledisplay}>
            <FileuploadSection />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
