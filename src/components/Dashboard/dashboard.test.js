import React from "react";
import Movie from "../Movie";

// import TestUtils from 'react-addons-test-utils';
import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import { Dashboard } from "./index";

describe("<Dashboard />", () => {
  it("Renders without crashing", () => {
    const wrapper = shallow(<Dashboard deleteMovie={() => {}} movies={[]} />);
  });

  it("Renders movie components", () => {
    const deleteMovie = jest.fn();
    const movies = [
      {
        id: "1",
        image: "1.jpg"
      },

      {
        id: "2",
        image: "2.jpg"
      },

      {
        id: "3",
        image: "3.jpg"
      }
    ];
    const wrapper = shallow(
      <Dashboard deleteMovie={deleteMovie} movies={movies} />
    );
    const movieComponents = wrapper.find(Movie);
    expect(movieComponents).toHaveLength(movies.length);
    movies.forEach((movie, index) => {
      const movieInstance = movieComponents.get(index);
      const props = movieInstance.props;
      // what is on the left. what is on the right. Where do we see them?
      // console.log("props.action: ", props.props.action);
      // console.log("movie: ", movie);
      expect(props.movie).toBe(movie);
      expect(movieInstance.key).toBe(movie.id);
      expect(props.btnText).toBe("Delete Movie");
      expect(typeof props.action).toBe("function");
      props.action();
      expect(deleteMovie).toHaveBeenLastCalledWith(movie.id);
    });
    expect(deleteMovie).toHaveBeenCalledTimes(movies.length);
    // console.log(movieComponents.get(0));
  });
});
