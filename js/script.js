const global = {
  currentPage: window.location.pathname,
};
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
async function displayPopularMovies() {
  const { results } = await fetchPopularMovies("movie/popular");
  console.log(results);

  results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
    <a href="movie-details.html?${movie.id}">
      ${
        movie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">`
          : `<img src='../images/no-image.png' class="card-img-top" alt="${movie.title}">'`
      }
       
    
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">${movie.release_date}</small>
      </p>
    </div>
    `;
    document.querySelector("#popular-movies").appendChild(movieEl);
  });
}
async function fetchPopularMovies(endpoint) {
  const API_KEY = "09c52f4a18a497e85e3c925b2d330612";
  const BASE_URL = "https://api.themoviedb.org/3/";

  showSpinner();
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

async function displayPopularShows() {
  const { results } = await fetchPopularShows("tv/popular");
  console.log(results);

  results.forEach((show) => {
    const showEl = document.createElement("div");
    showEl.classList.add("card");
    showEl.innerHTML = `
    <a href="tv-details.html?${show.id}">
      ${
        show.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">`
          : `<img src='../images/no-image.png' class="card-img-top" alt="${show.name}">'`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air date: ${show.first_air_date}</small>
      </p>
    </div>
    `;
    document.querySelector("#popular-shows").appendChild(showEl);
  });
}
async function fetchPopularShows(endpoint) {
  const API_KEY = "09c52f4a18a497e85e3c925b2d330612";
  const BASE_URL = "https://api.themoviedb.org/3/";

  showSpinner();
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("home");
      highlightActiveLink();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      highlightActiveLink();
      break;
    case "/search.html":
      console.log("search");
      break;
    case "/tv-details.html":
      console.log("tv");
      break;
    case "/movie-details.html":
      console.log("movies");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
