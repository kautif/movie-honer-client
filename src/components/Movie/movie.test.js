import React from "react";

import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import Movie from "./index";

describe("<Movie/>", () => {
  const movie = {
    title: "Movie Title X",
    image: "https://spaceplace.nasa.gov/review/sunburn/sunburn1.en.png"
  };

  it("Renders without crashing", () => {
    const wrapper = shallow(<Movie movie={{}} />);
  });

  it("Renders with appropriate elements", () => {
    const wrapper = shallow(<Movie movie={movie} />);
  });

  it("Renders the component with expected props", () => {
    const wrapper = shallow(<Movie movie={movie} />);
  });

  describe("Action button", () => {
    it("Should display appropriate button text", () => {
      const disabled = false;
      const action = () => {};
      const btnText = "srhwrhwrh";
      const wrapper = shallow(
        <Movie
          movie={movie}
          disabled={disabled}
          action={action}
          btnText={btnText}
        />
      );
      const button = wrapper.find("button").get(0);
      expect(button.props.onClick).toBe(action);
      expect(button.props.disabled).toBe(disabled);
      expect(button.props.children).toBe(btnText);
    });

    it("Should display movie title text", () => {
      const wrapper = shallow(<Movie movie={movie} />);
      expect(wrapper.text()).toContain(movie.title);
    });

    it("Should display correct image", () => {
      const wrapper = shallow(<Movie movie={movie} />);
      const image = wrapper.find("img").get(0);
      expect(image.props.src).toBe(movie.image);
    });
  });
});
