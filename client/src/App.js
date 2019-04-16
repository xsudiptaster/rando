import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  // Initialize state
  state = { passwords: [],
          username : '',
          password : '',
          sessiontok :'',
          loginurl:'' }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value})
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }
  handleSelectChange(event) {
    this.setState({loginurl: event.target.value})
  }
  handlelogin = () => {
    console.log('Called on load');
    // Get the session and store them in state
    axios.post('/api/logintosalesforce', 
        this.state
    )
    .then(function (response) {
        console.log("success!");
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  loginpagerender(){
    const { passwords } = this.state;
    return (
    <div className="App">
    <table>
    <tr>
      <td>
        Please Select the Org.
      </td>
      <td>
        <select selectedvalue={this.state.loginurl} onChange={this.handleSelectChange.bind(this)} >
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
        Username: 
      </td>
      <td>
        <input type="text" value={this.state.username} onChange={this.handleUsernameChange.bind(this)} ></input>
        </td>
    </tr>
    <tr>
      <td>
        Password : 
      </td>
      <td>
        <input type="text" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}></input>
        </td>
    </tr>
    <tr>
      <td>

      </td>
      <td>
        <input type="button" value="Login" onClick={this.handlelogin()}></input>
      </td>
    </tr>
    </table>    
    </div>
    );
  }
  render() {
    return (
      this.loginpagerender()
      );
  }  
}
export default App;
