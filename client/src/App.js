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
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.jhguyg</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
            hello
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
  loginpagescreen(){
    return(
    <div className="App">
      <table>
        <tr>
          <td>
            Please Select the Org
          </td>
          <td>
            <select>
              <option value="sandbox">Sandbox</option>
              <option value="production">Production</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            Username
          </td>
          <td>
            <input type="text" ></input>
          </td>
        </tr>
        <tr>
          <td>
            Password
          </td>
          <td>
            <input type="text" ></input>
          </td>
        </tr>
        <tr>
          <td>

          </td>
          <td>
            <input type="button">Login</input>
          </td>
        </tr>
      </table>
    </div>);
  }
  render() {
    return (
      this.passwordrender()
      );
  }

  
}
export default App;
