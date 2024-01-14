const apiKey = "c994c1057892cc3d404995855fa8811a";
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const resultLine = document.getElementById("result-line");
const dayTabPane = document.getElementById("day-tab-pane");
const weekTabPane = document.getElementById("week-tab-pane");

function hideDayTab() {
  dayTabPane.classList.add("d-none");
  weekTabPane.classList.remove("d-none");
}
function hideWeekTab() {
  // Show day-tab-pane and hide week-tab-pane
  dayTabPane.classList.remove("d-none");
  weekTabPane.classList.add("d-none");
}
// Trending Content Show

function getTrending() {
  const apiUrl1 = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  const apiUrl2 = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  fetch(apiUrl1)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        let posterPath;

        if (movie.poster_path) {
          posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        } else {
          posterPath =
            "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg";
        }

        dayTabPane.innerHTML += `
        <a href="./details.html?id=${movie.id}">
        <div class="card p-0" style="width: 18rem;">
            <img src="${posterPath}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">${movie.release_date}</p>
            </div>
          </div>
        </a>
        `;
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  //////////////////////////////////////////////////////////////////////////////////////
  fetch(apiUrl2)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        let posterPath;

        if (movie.poster_path) {
          posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        } else {
          posterPath =
            "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg";
        }

        weekTabPane.innerHTML += `
        <a href="./details.html?id=${movie.id}">
        <div class="card p-0" style="width: 18rem;">
            <img src="${posterPath}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">${movie.release_date}</p>
            </div>
          </div>
        </a>
        `;
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the function to get trending movies when the page loads
document.addEventListener("DOMContentLoaded", getTrending);

// Movie Search Code
function searchMovies() {
  const searchInput = document.getElementById("search-input").value;

  if (!searchInput) {
    alert("Please enter a movie title");
    return;
  }
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;
  resultLine.innerText = `Search results for '${searchInput}'`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length === 0) {
        results.innerHTML = `<h1>\u2620 No results found.</h1>`;
      }
      data.results.forEach((movie) => {
        let posterPath;

        if (movie.poster_path) {
          posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        } else {
          posterPath =
            "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg";
        }

        results.innerHTML += `
        <a href="./details.html?id=${movie.id}">
          <div class="card p-0" style="width: 18rem;">
            <img src="${posterPath}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">${movie.release_date}</p>
            </div>
          </div>
        </a>
        `;
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  results.innerHTML = ``;
  searchMovies();
});