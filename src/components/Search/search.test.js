import React from "react";

import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import { Search } from "./index";

describe("<Search />", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(
      <Search findMovies={jest.fn()} working={false} error="error" />
    );
  });

  it("Should render a form", () => {
    const wrapper = shallow(
      <Search findMovies={jest.fn()} working={false} error="error" />
    );
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("Should render two selects and a number input in form", () => {
    const wrapper = shallow(
      <Search findMovies={jest.fn()} working={false} error="error" />
    );
    expect(wrapper.find("input[name='year']")).toHaveLength(1);
    expect(wrapper.find("select[name='quality']")).toHaveLength(1);
    expect(wrapper.find("select[name='genre']")).toHaveLength(1);
  });

  describe("Search input changes", () => {
    it("Should listen to change event and change state of year input", () => {
      const wrapper = shallow(
        <Search findMovies={jest.fn()} working={false} error="error" />
      );
      const input = wrapper.find("input[name='year']");
      input.simulate("change", {
        target: { name: "year", value: "1999" }
      });
      expect(wrapper.find("input[name='year']").get(0).props.value).toEqual(
        "1999"
      );
    });

    it("Should listen to change event and change state of genre select", () => {
      const wrapper = shallow(
        <Search findMovies={jest.fn()} working={false} error="error" />
      );
      const input = wrapper.find("select[name='genre']");
      input.simulate("change", {
        target: { name: "genre", value: "Horror" }
      });
      expect(wrapper.find("select[name='genre']").get(0).props.value).toEqual(
        "Horror"
      );
    });

    it("Should listen to change event and change state of quality select", () => {
      const wrapper = shallow(
        <Search findMovies={jest.fn()} working={false} error="error" />
      );
      const input = wrapper.find("select[name='quality']");
      input.simulate("change", {
        target: { name: "quality", value: "Bad" }
      });
      expect(wrapper.find("select[name='quality']").get(0).props.value).toEqual(
        "Bad"
      );
    });

    it("Simulate form submission", () => {
      const fakeEvent = { preventDefault: jest.fn() };
      const findMovies = jest.fn();
      const wrapper = shallow(
        <Search findMovies={findMovies} working={false} error="error" />
      );
      wrapper.find("select[name='genre']").simulate("change", {
        target: { name: "genre", value: "Horror" }
      });

      wrapper.find("input[name='year']").simulate("change", {
        target: { name: "year", value: "1999" }
      });

      wrapper.find("select[name='quality']").simulate("change", {
        target: { name: "quality", value: "Bad" }
      });
      expect(wrapper.find("form").simulate("submit", fakeEvent));
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(findMovies).toHaveBeenCalledWith("Horror", "1999", "Bad");
    });
  });
});
