import React from "react";
import "./index.css";
import missing_image from "./img-unavailable.png";

export default function Movie(props) {
  return (
    <article className="Movie" title={props.movie.title}>
      <div className="Movie-title">{props.movie.title}</div>
      <img
        alt={props.movie.title + " poster"}
        src={props.movie.image || missing_image}
      />
      <button
        disabled={props.disabled}
        className="Movie-button"
        onClick={props.action}
      >
        {props.btnText}
      </button>
    </article>
  );
}
