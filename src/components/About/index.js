import React from "react";
import "./index.css";
import filmPin from "./film-pin-trans.png";

export default function About() {
  return (
    <div>
      <div className="about">
        <h3>Movie Honer</h3>
        <div className="logo">
          <img src={filmPin} alt="Film Pin" />
        </div>
        <p className="filter-intro">Sign Up to Filter by:</p>
        <div className="filter-flex">
          <div className="filter-item">
            <p>Year</p>
          </div>

          <div className="filter-item">
            <p>Genre</p>
          </div>

          <div className="filter-item">
            <p>Quality</p>
          </div>
        </div>
        <div className="about-action">
          <p>
            Whether you want to see the greatest action hits of 1999 or its
            greatest flops, we'll help you hone in on them.
          </p>
        </div>
      </div>
    </div>
  );
}
