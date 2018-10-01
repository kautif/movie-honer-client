import React from "react";
import { connect } from "react-redux";
import { searchAsync } from "../../actions";
import "./index.css";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Musical" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movies" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: 1888,
      genre: 28,
      quality: "good"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name === "year" && value.length > 4) {
      return;
    }
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { genre, year, quality } = this.state;
    this.props.findMovies(genre, year, quality);
  }

  render() {
    const { working, error } = this.props;
    const { year, genre, quality } = this.state;
    const message =
      (working && <div>Attempting Search</div>) ||
      (error && <div>{error}</div>);
    return (
      <div className="search-page">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <fieldset disabled={working}>
            {message}
            <div className="form-group search-group">
              <label className="year" htmlFor="year">
                Year
              </label>
              <input
                id="year"
                onChange={this.handleChange}
                name="year"
                type="number"
                min="1888"
                max="2030"
                value={year || 1888}
                placeholder="Year"
              />
            </div>
            <div className="form-group search-group">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                onChange={this.handleChange}
                name="genre"
                value={genre}
              >
                {genres.map(genre => (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group search-group">
              <label htmlFor="quality">Quality</label>
              <select
                id="quality"
                onChange={this.handleChange}
                name="quality"
                value={quality}
              >
                <option value="bad">Bad</option>
                <option value="ok">OK</option>
                <option value="good">Good</option>
              </select>
            </div>
            <input className="submit-search" type="submit" value="Submit" />
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { working, error } = state.search;
  return {
    working,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    findMovies: (genre, year, quality) =>
      dispatch(searchAsync(genre, year, quality))
  };
}

const connectedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
export default connectedSearch;

// building search will be one component.
// Results will be another component
// Dashboard also. Anything user will use.

// 9/13/18
// mapDispatchToProps and dispatch appropriate action
// See previous components for examples
// Create property for search component
// handlesubmit method. Call with appropriate values
// Don't do anything with state
// Compare with Signup and NavBar

// 9/15/18
// Add image for movies
