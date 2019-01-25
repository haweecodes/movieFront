import React, { Component } from 'react';
import LandingPage from'./Pages/LandingPage'

const body = {
  backgroundColor: "currentColor",
    height: '100%'
}

class App extends Component {
  render() {
    return (
      <div className="App" style={body}>
        <LandingPage/>
      </div>
    );
  }
}

export default App;
