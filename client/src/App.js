import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay from "./Headerdisplay.js"
import LoginSection from "./LoginSection.js"
class App extends Component {
  constructor(props) {
    super(props);
    
  }
  // Fetch passwords after first mount
  componentDidMount() {
    
  }
  render() {
    return (<div classclassName="slds-brand-band slds-brand-band_large slds-brand-band_group">
      <Headerdisplay/>
      <div>
      <br /><br />
      <br /><br />
      <LoginSection/>
      </div>
    
    </div>);
  }
}
export default App;
