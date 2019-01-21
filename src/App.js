import React from "react";
import { connect } from "react-redux";
import {
  Dashboard,
  Login,
  NavBar,
  Results,
  Search,
  Signup,
  About
} from "./components";
import { navConstants } from "./constants";

export function App(props) {
  let page = undefined;

  switch (props.page) {
    case navConstants.LOGIN:
      page = <Login />;
      break;

    case navConstants.DASHBOARD:
      page = <Dashboard />;
      break;

    case navConstants.SIGNUP:
      page = <Signup />;
      break;

    case navConstants.RESULTS:
      page = <Results />;
      break;

    case navConstants.SEARCH:
      page = <Search />;
      break;

    case navConstants.ABOUT:
      page = <About />;
      break;

    default:
      page = "You should never see this";
  }

  return (
    <div>
      <NavBar />
      {page}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    page: state.page
  };
}

export default connect(mapStateToProps)(App);

// Page property on redux state is used to determine which component should be rendered 
// below the nav bar
