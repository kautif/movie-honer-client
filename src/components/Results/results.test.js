// Verify that certain number of movie components exist
// -- Given correct props
// Provide two arrays of movie objects
// -- Provide array of movies from results [X]
// -- Provide array of movies from user's library/list [X]
// saveMovie function [X]
import React from "react";

import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import { Results } from "./index";
import Movie from "../Movie/index";

const results = [
  {
    tmdbID: "1",
    image: "1.jpg"
  },

  {
    tmdbID: "2",
    image: "2.jpg"
  },

  {
    tmdbID: "3",
    image: "3.jpg"
  }
];

const myMovies = [
  {
    tmdbID: "4",
    title: "Movie Y"
  },
  {
    tmdbID: "3",
    title: "Movie Z"
  }
];

describe("<Results", () => {
  it("Renders Results component without crashing", () => {
    const wrapper = shallow(
      <Results saveMovie={jest.fn()} movies={results} myMovies={myMovies} />
    );
  });

  it("Renders movie components in results", () => {
    const saveMovie = jest.fn();

    const wrapper = shallow(
      <Results saveMovie={saveMovie} movies={results} myMovies={myMovies} />
    );
    const movieComponents = wrapper.find(Movie);
    expect(movieComponents).toHaveLength(results.length);
    results.forEach((movie, index) => {
      const movieInstance = movieComponents.get(index);
      const props = movieInstance.props;
      // what is on the left. what is on the right. Where do we see them?
      // console.log("props.action: ", props.props.action);
      // console.log("movie: ", movie);
      // console.log("PROPS: ", props);
      expect(props.movie).toBe(movie);
      expect(movieInstance.key).toBe(movie.tmdbID);
      expect(props.btnText).toBe(
        movie.tmdbID === "3" ? "Movie Saved" : "Save Movie"
      );
      expect(props.disabled).toBe(movie.tmdbID === "3");
      expect(typeof props.action).toBe("function");
      props.action();
      expect(saveMovie).toHaveBeenLastCalledWith(movie);
    });
    expect(saveMovie).toHaveBeenCalledTimes(results.length);
  });
});
