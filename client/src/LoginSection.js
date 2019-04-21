import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class LoginSection extends Reflux.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      username: "",
      password: "",
      sessiontok: "",
      loginurl: ""
    };
    this.handlelogin = this.handlelogin.bind(this);
  }
  /*updatestate(event, firstdata) {
    this.state = firstdata;
  }*/
  // Fetch passwords after first mount
  componentDidMount() {
    this.state.loginurl = "https://test.salesforce.com";
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSelectChange(event) {
    this.setState({ loginurl: event.target.value });
  }
  handlelogin() {
    // Get the session and store them in state
    axios
      .post("/api/logintosalesforce", {
        username: this.state.username,
        password: this.state.password,
        loginUrl: this.state.loginurl
      })
      .then(response => {
        this.setState({ sessiontok: response.data });
        this.setState({
          logindisplay: {
            visibility: "hidden"
          }
        });
        this.setState({
          uploadfiledisplay: {
            visibility: "visible"
          }
        });
        ContentReviewerActions.stateupdates(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }
  loginpagerender() {
    return (
      <div className="App">
        <table>
          <tr>
            <td>
              <div className="slds-text-heading_medium">
                Please Select the Org:
              </div>
            </td>
            <td>
              <div className="slds-form-element">
                <label className="slds-form-element__label" htmlFor="select-01">
                  Select the org
                </label>
                <div className="slds-form-element__control">
                  <div className="slds-select_container">
                    <select
                      className="slds-select"
                      id="select-01"
                      onChange={this.handleSelectChange.bind(this)}
                    >
                      <option value="">Please select</option>
                      <option value="https://test.salesforce.com">
                        Sandbox
                      </option>
                      <option value="https://login.salesforce.com">
                        Production
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="slds-text-heading_medium">Username :</div>
            </td>
            <td>
              <input
                type="text"
                value={this.state.username}
                className="slds-input"
                onChange={this.handleUsernameChange.bind(this)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="slds-text-heading_medium">Password :</div>
            </td>
            <td>
              <input
                type="text"
                value={this.state.password}
                className="slds-input"
                onChange={this.handlePasswordChange.bind(this)}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <input
                type="button"
                value="Login"
                className="slds-button slds-button_neutral"
                onClick={() => this.handlelogin()}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
  render() {
    return this.loginpagerender();
  }
}
