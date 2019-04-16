import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { passwords: [], username : '', password : '' }

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
  handlelogin = () => {
      console.log('The username',this.state);
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
        <select >
          <option value="sandbox">
            Sandbox
          </option>
          <option value="production">
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
        <input type="text" value={this.state.username} onChange={this.handleUsernameChange(this)} ></input>
        </td>
    </tr>
    <tr>
      <td>
        Password : 
      </td>
      <td>
        <input type="text" value={this.state.password} onChange={this.handlePasswordChange(this)}></input>
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
