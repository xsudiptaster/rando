import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay from "./Headerdisplay.js"
import LoginSection from "./LoginSection.js"
import FileuploadSection from "./FileuploadSection.js"
var Reflux = require('reflux');
var ContentReviewStore = require('./ContentReviewStore.js');
var ContentReviewerActions = require('./ContentReviewerActions.js');

class App extends Component {
  constructor(props) {
    mixins: [Reflux.connect(ContentReviewStore, 'ContentReviewStore'), Reflux.listenTo(ContentReviewStore,"updatestatenow"),],
    super(props);
    this.state= ContentReviewStore.firstdata;
  }
  updatestatenow()
  {
    this.state= ContentReviewStore.firstdata;
  }
  // Fetch passwords after first mount
  componentDidMount() {
    
  }
  render() {
    return (<div classclassName="slds-brand-band slds-brand-band_large slds-brand-band_group">
      <Headerdisplay/>
      <div>
        {this.state.sessiontok}
      <br /><br />
      <br /><br />
      <div  style= {this.state.logindisplay} >
      <LoginSection  />
      </div>
      <div style={this.state.uploadfiledisplay} >
      <FileuploadSection />
      </div>
      </div>
    
    </div>);
  }
}
export default App;
