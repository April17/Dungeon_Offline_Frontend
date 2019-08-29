import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Pages from './pages'
import NavBar from './components/NavBar'
import './App.css';



class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/game"     component={Pages.GamePage} />
          <Route exact path="/signup"   component={Pages.Signup} />
          <Route exact path="/profile"  component={Pages.ProfilePage} />
          <Route exact path="/"         component={Pages.FrontPage} />
          <Route                        component={Pages.FourOFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
