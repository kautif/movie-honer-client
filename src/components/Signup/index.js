import React from "react";
import { connect } from "react-redux";

import { navConstants } from "../../constants";

import { signupAsync, navigate } from "../../actions";
import "./index.css";

class Signup extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.signup(email, password);
    }
  }

  render() {
    const { working, error } = this.props;
    const message =
      (working && <div>Attempting Sign Up</div>) ||
      (error && <div>{error}</div>);
    const { email, password, submitted } = this.state;
    return (
      <div className="signup-page">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={working}>
            {message}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="email"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {submitted &&
                !email && <div className="help-block">Email is required</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
              <button>Sign Up</button>
              <button type="button" onClick={this.props.goToLogin}>
                Login
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
    signup: (email, password) => dispatch(signupAsync(email, password)),
    goToLogin: () => dispatch(navigate(navConstants.LOGIN))
  };
}

const connectedSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
export default connectedSignup;
