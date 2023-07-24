const API_KEY = "72a8fd33e35bac218a0e8b7f41fddd20";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieDetails = document.getElementById("movieDetails");
const popularMovies = document.getElementById("popularMovies");

// Function to fetch movie details based on search query
function fetchMovieDetails(query) {
    fetch(SEARCH_URL + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            movieDetails.innerHTML = ""; // Clear previous search results
            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const movieElement = createMovieElement(movie);
                    movieDetails.appendChild(movieElement);
                });
            } else {
                movieDetails.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
}

// Function to fetch popular movies
function fetchPopularMovies() {
    fetch(POPULAR_URL)
        .then(response => response.json())
        .then(data => {
            popularMovies.innerHTML = ""; // Clear previous popular movies
            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const movieElement = createMovieElement(movie);
                    popularMovies.appendChild(movieElement);
                });
            } else {
                popularMovies.innerHTML = "<p>No popular movies found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching popular movies:", error);
        });
}

// Helper function to create a movie element
function createMovieElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "no-poster.jpg";

    movieElement.innerHTML = `
        <img class="poster" src="${posterPath}" alt="${movie.title}">
        <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-overview">${movie.overview}</div>
            <ul class="cast-list">
                <li class="cast-list-item">Release Date: ${movie.release_date}</li>
                <li class="cast-list-item">Rating: ${movie.vote_average}</li>
            </ul>
        </div>
    `;

    return movieElement;
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        fetchMovieDetails(searchTerm);
    }
});

// Fetch popular movies on page load
fetchPopularMovies();
