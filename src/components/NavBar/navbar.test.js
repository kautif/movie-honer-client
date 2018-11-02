import React from "react";

import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import {
  NavBar,
  ConnectedLoggedOutNavBar,
  ConnectedLoggedInNavBar,
  LoggedInNavBar,
  LoggedOutNavBar
} from "./index";

describe("<NavBar/>", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(<NavBar />);
  });

  it("Renders LoggedOutNavBar when not logged in", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(ConnectedLoggedOutNavBar)).toHaveLength(1);
    expect(wrapper.find(ConnectedLoggedInNavBar)).toHaveLength(0);
  });

  it("Renders LoggedInNavBar when logged in", () => {
    const wrapper = shallow(<NavBar loggedIn={true} />);
    expect(wrapper.find(ConnectedLoggedOutNavBar)).toHaveLength(0);
    expect(wrapper.find(ConnectedLoggedInNavBar)).toHaveLength(1);
  });

  // Test buttons for loggedIn vs loggedOut?
});

describe("<LoggedInNavBar", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(<LoggedInNavBar />);
  });

  it("Adds click listeners to buttons", () => {
    const goToAbout = jest.fn();
    const goToMyMovies = jest.fn();
    const goToDiscover = jest.fn();
    const logout = jest.fn();

    const wrapper = shallow(
      <LoggedInNavBar
        goToAbout={goToAbout}
        goToMyMovies={goToMyMovies}
        goToDiscover={goToDiscover}
        logout={logout}
      />
    );
    wrapper.find("#logo").simulate("click");
    expect(goToAbout).toHaveBeenCalled();
    wrapper.find("#myMovies").simulate("click");
    expect(goToMyMovies).toHaveBeenCalled();
    wrapper.find("#discover").simulate("click");
    expect(goToDiscover).toHaveBeenCalled();
    wrapper.find("#logout").simulate("click");
    expect(logout).toHaveBeenCalled();
  });
});

describe("<LoggedOutNavBar", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(<LoggedOutNavBar />);
  });

  it("Adds click listeners to buttons", () => {
    const goToAbout = jest.fn();
    const goToSignUp = jest.fn();
    const goToLogin = jest.fn();

    const wrapper = shallow(
      <LoggedOutNavBar
        goToAbout={goToAbout}
        goToSignUp={goToSignUp}
        goToLogin={goToLogin}
      />
    );
    wrapper.find("#logo").simulate("click");
    expect(goToAbout).toHaveBeenCalled();
    wrapper.find("#signup").simulate("click");
    expect(goToSignUp).toHaveBeenCalled();
    wrapper.find("#login").simulate("click");
    expect(goToLogin).toHaveBeenCalled();
  });
});
