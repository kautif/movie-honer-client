import React from "react";

import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import { Login } from "./index";

describe("<Login />", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(
      <Login working={false} login={() => {}} goToSignup={() => {}} />
    );
  });

  it("Renders email input", () => {
    expect(
      shallow(<Login />).find("input[type='email'][name='email']").length
    ).toEqual(1);
  });

  it("Renders password input", () => {
    expect(
      shallow(<Login />).find("input[type='password'][name='password']").length
    ).toEqual(1);
  });

  it("Renders a submit button", () => {
    expect(shallow(<Login />).find("button[type='submit']").length).toEqual(1);
  });

  describe("Login input changes", () => {
    it("Should listen to change event and change state of email input", () => {
      const wrapper = shallow(<Login />);
      const input = wrapper.find("input[type='email']");
      input.simulate("change", {
        target: { name: "email", value: "someguy@gmail.com" }
      });
      expect(wrapper.find("input[type='email']").get(0).props.value).toEqual(
        "someguy@gmail.com"
      );
    });

    it("Should listen to change event and change state of password input", () => {
      const wrapper = shallow(<Login />);
      const input = wrapper.find("input[type='password']");
      input.simulate("change", {
        target: { name: "password", value: "secret" }
      });
      expect(wrapper.find("input[type='password']").get(0).props.value).toEqual(
        "secret"
      );
    });
  });

  it("Should fire login function", () => {
    const login = jest.fn();
    const fakeEvent = { preventDefault: jest.fn() };
    const user = {
      email: "test@gmail.com",
      password: "testpassword"
    };
    const wrapper = shallow(<Login login={login} />);
    let input = wrapper.find("input[type='email']");
    input.simulate("change", {
      target: { name: "email", value: user.email }
    });

    input = wrapper.find("input[type='password']");
    input.simulate("change", {
      target: { name: "password", value: user.password }
    });
    wrapper.find("form").simulate("submit", fakeEvent);
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith(user.email, user.password);
    expect(login).toHaveBeenCalledTimes(1);
  });

  describe("Should not fire login function if login info is invalid", () => {
    it("Should not login if username is invalid", () => {
      const login = jest.fn();
      const fakeEvent = { preventDefault: jest.fn() };
      const user = {
        email: "",
        password: "testpassword"
      };

      const wrapper = shallow(<Login onSubmit={login} />);
      wrapper.find("input[type='email']").simulate("change", {
        target: { name: "email", value: user.email }
      });

      wrapper.find("input[type='password']").simulate("change", {
        target: { name: "password", value: user.password }
      });

      wrapper.find("form").simulate("submit", fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(login).not.toHaveBeenCalled();
    });

    it("Should not login if password is invalid", () => {
      const login = jest.fn();
      const fakeEvent = { preventDefault: jest.fn() };
      const user = {
        email: "test@gmail.com",
        password: ""
      };

      const wrapper = shallow(<Login onSubmit={login} />);
      wrapper.find("input[type='email']").simulate("change", {
        target: { name: "email", value: user.email }
      });

      wrapper.find("input[type='password']").simulate("change", {
        target: { name: "password", value: user.password }
      });
      wrapper.find("form").simulate("submit", fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(login).not.toHaveBeenCalled();
    });
  });

  it("Button should have onClick props of goToSignup function", () => {
    const goToSignup = () => {};
    const wrapper = shallow(<Login goToSignup={goToSignup} />);
    const loginButton = wrapper.find("button[type='button']").get(0);
    expect(loginButton.props.onClick).toBe(goToSignup);
  });
});
