const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";

export function findMovies(genre, year, quality) {
  genre = encodeURIComponent(genre);
  year = encodeURIComponent(year);
  quality = encodeURIComponent(quality);
  const searchParams = `genre=${genre}&year=${year}&quality=${quality}`;
  const url = `${host}/search?${searchParams}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("An error occurred");
  });
}

export function getUser() {
  const url = `${host}/auth/user`;
  return fetch(url, { credentials: "include", mode: "cors" }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Not logged in");
  });
}

export function signup(email, password) {
  const url = `${host}/auth/signup`;
  return fetch(url, {
    credentials: "include",
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ username: email, password }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        return response.json().then(info => {
          const error = new Error(info.message);
          error.name = "ResponseError";
          throw error;
        });
      }
      const error = new Error(
        "Enter a valid email address and 8 character password"
      );
      error.name = "ResponseError";
      throw error;
    })
    .catch(error => {
      if (error.name === "ResponseError") {
        throw error;
      }
      throw new Error("Enter a valid email address and 8 character password");
    });
}

export function login(email, password) {
  console.log("logging in");
  const url = `${host}/auth/login`;
  return fetch(url, {
    credentials: "include",
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ username: email, password }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        return response.json().then(info => {
          const error = new Error(info.message);
          error.name = "ResponseError";
          throw error;
        });
      }
      const error = new Error("An error occurred");
      error.name = "ResponseError";
      throw error;
    })
    .catch(error => {
      if (error.name === "ResponseError") {
        throw error;
      }
      throw new Error("An error occured");
    });
}

export function logout() {
  const url = `${host}/auth/logout`;
  return fetch(url, { credentials: "include", mode: "cors" });
}

export function getMovies() {
  return Promise.resolve([]);
}

export function deleteMovie(id) {
  console.log("deleting movie");
  const url = `${host}/profile/movies/${id}`;
  return fetch(url, {
    credentials: "include",
    mode: "cors",
    method: "DELETE"
  }).then(response => {
    if (response.ok) {
      return;
    }
    if (response.status === 401) {
      throw new Error("Not logged in");
    }
    throw new Error("An error occurred");
  });
}

export function addMovie(title, genre, year, quality, image, tmdbID) {
  console.log("adding movie");
  const url = `${host}/profile/movies`;
  return fetch(url, {
    credentials: "include",
    mode: "cors",
    method: "PUT",
    body: JSON.stringify({ title, genre, year, quality, image, tmdbID }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    if (response.status === 401) {
      throw new Error("Not logged in");
    }
    throw new Error("An error occurred");
  });
}
