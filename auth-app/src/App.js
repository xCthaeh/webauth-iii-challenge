import React, { Component } from "react";
// import axios from "axios";
import Register from "./components/register";
// import Login from "./components/login";
import { withRouter, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
