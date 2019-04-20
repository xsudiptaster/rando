import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.js");
var ContentReviewerActions = require("./ContentReviewerActions.js");

export default class LoginSection extends Component {
  constructor(props) {
    mixins: [Reflux.connect(ContentReviewStore, "ContentReviewStore")];
    super(props);
    // Initialize state
    this.state = {
      username: "",
      password: "",
      sessiontok: "",
      loginurl: ""
    };
    console.log("The First Data Again", ContentReviewStore.firstdata);
    this.handlelogin = this.handlelogin.bind(this);
  }
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
    console.log("Called on load", this.state);
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
            visibility: "show"
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
      <div className="slds-grid slds-gutters">
        <div className="slds-col">
          <span />
        </div>
        <div class="slds-col">
          <span>
            <div className="App">
              <table>
                <tr>
                  <td>
                    <div className="slds-text-heading_large">
                      Please Select the Org:
                    </div>
                  </td>
                  <td>
                    <div className="slds-form-element">
                      <label
                        className="slds-form-element__label"
                        htmlFor="select-01"
                      >
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
                    <div className="slds-text-heading_large">Username :</div>
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
                    <div className="slds-text-heading_large">Password :</div>
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
          </span>
        </div>
        <div class="slds-col" />
      </div>
    );
  }
  render() {
    return this.loginpagerender();
  }
}
