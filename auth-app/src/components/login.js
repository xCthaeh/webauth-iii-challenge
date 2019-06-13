import React, { Component } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: "",
  password: ""
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: ""
    };
  }

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  submitHandler = event => {
    event.preventDefault();
    axios
      .post(`${url}/api/login`, this.state.user)
      .then(res => {
        if (res.status === 200 && res.data) {
          localStorage.setItem("secret_bitcoin_token", res.data);
          this.props.history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: "Authentication failed",
          user: { ...initialUser }
        });
      });
  };

  render() {
    return (
      <div className= "loginContainer">
        <form onSubmit={this.submitHandler}>
          <label className="userName" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.inputHandler}
          />
          <label className="pw" htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.user.password}
            onChange={this.inputHandler}
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.message ? <h4>{this.state.message}</h4> : undefined}
      </div>
    );
  }
}
