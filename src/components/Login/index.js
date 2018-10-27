import React from "react";
import { connect } from "react-redux";

import { loginAsync, navigate } from "../../actions";
import { navConstants } from "../../constants";
import "./index.css";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  }

  render() {
    const { working, error } = this.props;
    const message =
      (working && <div>Attempting Sign Up</div>) ||
      (error && <div>{error}</div>);
    const { email, password, submitted } = this.state;
    return (
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={working}>
            {message}
            <div className="form-group">
              <label className="form-input" htmlFor="email">
                Email
              </label>
              <input
                className="email"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {submitted &&
                !email && <div className="help-block">Email is required</div>}
            </div>
            <div className="form-group">
              <label className="form-input" htmlFor="password">
                Password
              </label>
              <input
                className="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted &&
                !password && (
                  <div className="help-block">Password is required</div>
                )}
            </div>
            <div className="button-group">
              <button type="submit">Login</button>
              <button type="button" onClick={this.props.goToSignup}>
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { working, error } = state;
  return {
    working,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(loginAsync(email, password)),
    goToSignup: () => dispatch(navigate(navConstants.SIGNUP))
  };
}

const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
export default connectedLogin;
