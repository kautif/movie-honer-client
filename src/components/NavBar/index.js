import React from "react";
import { connect } from "react-redux";
import { navigate, logout } from "../../actions";
import { navConstants } from "../../constants";
import "./index.css";

export function LoggedInNavBar(props) {
  return (
    <React.Fragment>
      <button id="logo" onClick={props.goToAbout}>
        Movie Honer
      </button>
      <button id="myMovies" onClick={props.goToMyMovies}>
        My Movies
      </button>
      <button id="discover" onClick={props.goToDiscover}>
        Discover
      </button>
      <button id="logout" onClick={props.logout}>
        Logout
      </button>
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

export const ConnectedLoggedInNavBar = connect(
  null,
  mapDispatchToLoggedInProps
)(LoggedInNavBar);

export function LoggedOutNavBar(props) {
  return (
    <React.Fragment>
      <button id="logo" onClick={props.goToAbout}>
        Movie Honer
      </button>
      <button id="login" onClick={props.goToLogin}>
        Log In
      </button>
      <button id="signup" onClick={props.goToSignUp}>
        Sign Up
      </button>
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

export const ConnectedLoggedOutNavBar = connect(
  null,
  mapDispatchToLoggedOutProps
)(LoggedOutNavBar);

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
