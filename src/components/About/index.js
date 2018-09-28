import React from "react";
import "./index.css";
export default function About() {
  return (
    <div>
      <div className="about">
        <h3>Too many movies to choose from?</h3>
        <h3>We'll help you narrow it down.</h3>
        <p className="filter-intro">Filter by:</p>
        <div className="filter-flex">
          <div className="filter-item">
            <p>Year</p>
            <i className="fas fa-calendar-alt fontawesome-icon" />
          </div>

          <div className="filter-item">
            <p>Genre</p>
            <i className="fas fa-book fontawesome-icon" />
          </div>

          <div className="filter-item">
            <p>Quality</p>
            <i className="fas fa-star fontawesome-icon" />
          </div>
        </div>
        <p className="about-action">
          Whether you want to see the greatest action hits of 1999 or its
          greatest flops, we'll help you hone in on them.
        </p>
      </div>
    </div>
  );
}
