import React from "react";

import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import { Signup } from "./index";

describe("<Signup />", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(<Signup />);
  });

  it("Renders email input", () => {
    expect(shallow(<Signup />).find(".email").length).toEqual(1);
  });

  it("Renders password input", () => {
    expect(shallow(<Signup />).find(".password").length).toEqual(1);
  });

  describe("Signup input changes", () => {
    it("Should listen to change event and change state of email input", () => {
      const wrapper = shallow(<Signup />);
      wrapper.find(".email").simulate("change", {
        target: { name: "email", value: "someguy@gmail.com" }
      });
      expect(wrapper.state("email")).toEqual("someguy@gmail.com");
    });

    it("Should listen to change event and change state of password input", () => {
      const wrapper = shallow(<Signup />);
      wrapper.find(".password").simulate("change", {
        target: { name: "password", value: "secret" }
      });
      expect(wrapper.state("password")).toEqual("secret");
    });
  });
});
