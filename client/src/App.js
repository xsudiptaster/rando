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
    this.setState({hello : "asd" });
    console.log("The App State Initialized 1", this.state);
    
  }
  updatestatenow(event, firstdata) {
    console.log("The App State Initialized", firstdata);
    this.state = firstdata;
  }
  // Fetch passwords after first mount
  componentDidMount() {}
  render() {
    console.log("The App State", this.state);
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
