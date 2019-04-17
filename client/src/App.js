import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

class App extends Component {
  // Initialize state
  state = {
    passwords: [],
    username: "",
    password: "",
    sessiontok: "",
    loginurl: ""
  };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch("/api/passwords")
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  };
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSelectChange(event) {
    this.setState({ loginurl: event.target.value });
  }
  handlelogin = () => {
    console.log("Called on load", this.state);
    // Get the session and store them in state
    axios
      .post("/api/logintosalesforce", {
        username: this.state.username,
        password: this.state.password,
        loginUrl: this.state.loginurl
      })
      .then(function(response) {
        console.log("success!");
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  loginpagerender() {
    const { passwords } = this.state;
    return (
      <div class="slds-grid slds-gutters">
        <div class="slds-col">
          <span />
        </div>
        <div class="slds-col">
          <span>
            <div className="App">
              <table>
                <tr>
                  <td>
                    <div className="slds-text-heading_large">
                      Please Select the Org.
                    </div>
                  </td>
                  <td>
                    <select
                      selectedvalue={this.state.loginurl}
                      onChange={this.handleSelectChange.bind(this)}
                    >
                      <option value="https://test.salesforce.com">
                        Sandbox
                      </option>
                      <option value="https://login.salesforce.com">
                        Production
                      </option>
                    </select>
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
                      onClick={() => this.handlelogin()}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </span>
        </div>
        <div class="slds-col">
          <span>Bye</span>
        </div>
      </div>
    );
  }
  render() {
    return this.loginpagerender();
  }
}
export default App;
