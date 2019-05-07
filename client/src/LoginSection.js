import React from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class LoginSection extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
        // Initialize state
        this.state = {
            username  : "sudipta@tsystemtest.com",
            password  : "rockcity_1234567",
            sessiontok: "",
            loginurl  : ""
        };
        ContentReviewerActions.stateupdates(this.state);
    }
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
        ContentReviewerActions.setvalparam('username', event.target.value);
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
        ContentReviewerActions.setvalparam('password', event.target.value);
    }

    handleSelectChange(event) {
        this.setState({loginurl: event.target.value});
        ContentReviewerActions.setvalparam('loginurl', event.target.value);
    }

    handlelogin() {

        if (this.state.loginurl == "") {
            this.state.errorMessage = "Please Select the Org";
            this.state.errorModal = {height: '14rem', display: 'block'};
            ContentReviewerActions.stateupdates(this.state);
        }
        else {
            ContentReviewerActions.setvalparam('showProgress', true);
            // Get the session and store them in state
            axios
                .post("/api/logintosalesforce", {
                    username: this.state.username,
                    password: this.state.password,
                    loginUrl: this.state.loginurl
                })
                .then(response => {
                    this.setState({
                                      sessiontok : response.data.sesionTkn,
                                      instanceUrl: response.data.loginUrl
                                  });

                    this.setState({
                                      logindisplay: {
                                          display: "none"
                                      }
                                  });
                    this.setState({
                                      uploadfiledisplay: {
                                          display: "block"
                                      }
                                  });
                    this.getobjectlist();
                })
                .catch(error => {
                    this.state.errorMessage = error;
                    this.state.errorModal = {height: '14rem', display: 'block'};
                    ContentReviewerActions.setvalparam('showProgress', false);
                    ContentReviewerActions.stateupdates(this.state);
                });
        }

    }

    getobjectlist() {
        if (this.state) {
            axios
                .post("/api/objectList", {
                    sessiontok: this.state.sessiontok,
                    oUrl      : this.state.instanceUrl
                })
                .then(response => {
                    var ListObjects = [];
                    var objectsList = response.data.sobjects;
                    for (var i = 0; i < objectsList.length; i++) {
                        if (objectsList[i].createable) {
                            var obj = {};
                            obj.value = objectsList[i].name;
                            obj.label = objectsList[i].label;
                            ListObjects.push(obj);
                        }
                    }
                    this.setState({objectList: ListObjects});
                    ContentReviewerActions.stateupdates(this.state);
                    ContentReviewerActions.setvalparam('showProgress', false);

                })
                .catch(error => {
                    this.state.errorMessage = error;
                    this.state.errorModal = {height: '14rem', display: 'block'};
                    ContentReviewerActions.setvalparam('showProgress', false);
                    ContentReviewerActions.stateupdates(this.state);
                });
        }
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
                        <td/>
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
