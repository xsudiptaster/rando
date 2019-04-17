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
        <div class="slds-col" />
      </div>
    );
  }
  pageheader() {
    return (
      <div class="slds-page-header">
        <div class="slds-page-header__row">
          <div class="slds-page-header__col-title">
            <div class="slds-media">
              <div class="slds-media__figure">
                <span
                  class="slds-icon_container slds-icon-standard-opportunity"
                  title="opportunity"
                >
                  <svg
                    class="slds-icon slds-page-header__icon"
                    aria-hidden="true"
                  >
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#opportunity"
                    />
                  </svg>
                  <span class="slds-assistive-text">opportunity</span>
                </span>
              </div>
              <div class="slds-media__body">
                <div class="slds-page-header__name">
                  <div class="slds-page-header__name-title">
                    <h1>
                      <span
                        class="slds-page-header__title slds-truncate"
                        title="Rohde Corp - 80,000 Widgets"
                      >
                        Rohde Corp - 80,000 Widgets
                      </span>
                    </h1>
                  </div>
                </div>
                <p class="slds-page-header__name-meta">
                  Mark Jaeckal • Unlimited Customer • 11/13/15
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      this.pageheader(),
      this.loginpagerender()
      );
  }
}
export default App;
