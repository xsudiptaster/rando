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
        Hello I am here
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
