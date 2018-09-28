import React from "react";
import { connect } from "react-redux";
import { navigate, logout } from "../../actions";
import { navConstants } from "../../constants";
import "./index.css";

// props will have functions as properties.
// Will be used for navigation purposes.
// logout
// goToDiscover
// goToMyMovies
export function LoggedInNavBar(props) {
  return (
    <React.Fragment>
      <button id="logo" onClick={props.goToAbout}>
        Movie Honer
      </button>
      <button onClick={props.goToMyMovies}>My Movies</button>
      <button onClick={props.goToDiscover}>Discover</button>
      <button onClick={props.logout}>Logout</button>
    </React.Fragment>
  );
}

function mapDispatchToLoggedInProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    goToDiscover: () => dispatch(navigate(navConstants.SEARCH)),
    goToMyMovies: () => dispatch(navigate(navConstants.DASHBOARD))
  };
}

const ConnectedLoggedInNavBar = connect(
  null,
  mapDispatchToLoggedInProps
)(LoggedInNavBar);

// props
// goToAbout
// goToSignUp
// goToLogin
export function LoggedOutNavBar(props) {
  return (
    <React.Fragment>
      <button id="logo" onClick={props.goToAbout}>
        Movie Honer
      </button>
      <button onClick={props.goToSignUp}>Sign Up</button>
      <button onClick={props.goToLogin}>Log In</button>
    </React.Fragment>
  );
}

function mapDispatchToLoggedOutProps(dispatch) {
  return {
    goToAbout: () => dispatch(navigate(navConstants.ABOUT)),
    goToSignUp: () => dispatch(navigate(navConstants.SIGNUP)),
    goToLogin: () => dispatch(navigate(navConstants.LOGIN))
  };
}

const ConnectedLoggedOutNavBar = connect(
  null,
  mapDispatchToLoggedOutProps
)(LoggedOutNavBar);
// property of loggedIn

export function NavBar(props) {
  return (
    <nav className="navbar">
      {props.loggedIn ? (
        <ConnectedLoggedInNavBar />
      ) : (
        <ConnectedLoggedOutNavBar />
      )}
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: !!state.user
  };
}

export default connect(mapStateToProps)(NavBar);
