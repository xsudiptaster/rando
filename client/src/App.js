import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

class HeaderComp extends Component {
  render() {
    const greeting = 'Welcome to React';

    return <h1>{greeting}</h1>;
  }
}
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
    <div><HeaderComp/></div>
    );
  }
  render() {
    return this.loginpagerender();
  }
}

export default App;
