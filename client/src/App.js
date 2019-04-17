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
   
    return (
      <div>
  <div classname="slds-page-header">
    <div classname="slds-page-header__row">
      <div classname="slds-page-header__col-title">
        <div classname="slds-media">
          <div classname="slds-media__figure">
            <span classname="slds-icon_container slds-icon-standard-opportunity" title="opportunity">
              <svg classname="slds-icon slds-page-header__icon" aria-hidden="true">
                <use xmlnsxlink="http://www.w3.org/1999/xlink" xlinkhref="/assets/icons/standard-sprite/svg/symbols.svg#opportunity" />
              </svg>
              <span classname="slds-assistive-text">opportunity</span>
            </span>
          </div>
          <div classname="slds-media__body">
            <div classname="slds-page-header__name">
              <div classname="slds-page-header__name-title">
                <h1>
                  <span classname="slds-page-header__title slds-truncate" title="Rohde Corp - 80,000 Widgets">Rohde Corp - 80,000 Widgets</span>
                </h1>
              </div>
            </div>
            <p classname="slds-page-header__name-meta">Mark Jaeckal • Unlimited Customer • 11/13/15</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div classname="slds-grid slds-gutters">
    <div classname="slds-col">
      <span>
      </span></div>
    <div classname="slds-col">
      <span>
        <div classname="App">
          <table>
            <tbody><tr>
                <td>
                  <div classname="slds-text-heading_large">
                    Please Select the Org:
                  </div>
                </td>
                <td>
                  <select selectedvalue="{this.state.loginurl}" onchange="{this.handleSelectChange.bind(this)}">
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
                  <div classname="slds-text-heading_large">Username :</div>
                </td>
                <td>
                  <input type="text" defaultvalue="{this.state.username}" onchange="{this.handleUsernameChange.bind(this)}" />
                </td>
              </tr>
              <tr>
                <td>
                  <div classname="slds-text-heading_large">Password :</div>
                </td>
                <td>
                  <input type="text" defaultvalue="{this.state.password}" onchange="{this.handlePasswordChange.bind(this)}" />
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                  <input type="button" defaultvalue="Login" onclick="{() = /> this.handlelogin()}" />
                </td>
              </tr>
            </tbody></table>
        </div>
      </span>
    </div>
    <div classname="slds-col">
      <span>asd</span>
    </div>
  </div>
</div>

      
    );
  }

  render() {
    return this.loginpagerender();
  }
}
export default App;
