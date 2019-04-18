import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay from "./Headerdisplay.js"

class App extends Component {
  constructor(props) {
    super(props);
    
  }
  // Fetch passwords after first mount
  componentDidMount() {
    
  }
  render() {
    return (<div className="slds-brand-band slds-brand-band_medium" />);
  }
}
export default App;
