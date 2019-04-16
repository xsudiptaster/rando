import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { passwords: [] }

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
  passwordrender(){
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
        <input type="text" ></input>
        </td>
    </tr>
    <tr>
      <td>
        Password : 
      </td>
      <td>
        <input type="text" ></input>
        </td>
    </tr>
    <tr>
      <td>

      </td>
      <td>
        <input type="button" >Login</input>
      </td>
    </tr>
    </table>    
    </div>
    );
  }
  render() {
    return (
      this.passwordrender()
      );
  }  
}
export default App;
