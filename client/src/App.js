import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay from "./Headerdisplay.js";
import LoginSection from "./LoginSection.js";
import FileuploadSection from "./FileuploadSection.js";
var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewStore = require("./ContentReviewStore.jsx");

class App extends Component {
  constructor(props) {
    super();
    mixins: [Reflux.listenTo(ContentReviewStore, "updatestatenow")],
    this.state = {
      username: "",
      password: "",
      sessiontok: "",
      loginurl: "",
      logindisplay:{
        visibility: "show"
      },
      fileuploaddisplay :{
        visibility : "hidden"
      }
    };
  }
  updatestatenow(event, firstdata) {
    console.log('Store Update',firstdata);
    this.state = firstdata;
  }
  // Fetch passwords after first mount
  componentDidMount() {
    
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
          <div style={this.state.logindisplay} >
            <LoginSection  />
          </div>
          <div style={this.state.fileuploaddisplay} >
            <FileuploadSection  />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
