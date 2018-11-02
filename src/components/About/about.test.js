import React from "react";
import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import About from "./index";

describe("<About />", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(<About />);
  });
});
