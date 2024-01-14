const apiKey = "c994c1057892cc3d404995855fa8811a";
const currentUrl = window.location.href;
const urlParams = new URLSearchParams(new URL(currentUrl).search);
const movieId = urlParams.get("id");
const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;
const results = document.getElementById("results");

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((movieData) => {
    // Handle the movie data here
    console.log(movieData);
    // Movie Release Date
    const releaseDate = new Date(movieData.release_date);
    const formattedDate = `${releaseDate
      .getDate()
      .toString()
      .padStart(2, "0")}-${(releaseDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${releaseDate.getFullYear()}`;
    // Movie Runtime
    const hours = Math.floor(movieData.runtime / 60);
    const minutes = movieData.runtime % 60;
    // Movie Genres
    const genreNames = movieData.genres.map(genre => genre.name);
    const allGenres = genreNames.join(', ');
    // Movie Cast
    const actorNames = movieData.credits.cast.slice(0,6).map(actor => actor.name);
    const allActors = actorNames.join(', ');
    results.innerHTML = `
    <div class="poster col-lg-6 text-center mb-5">
        <img src="https://image.tmdb.org/t/p/original${movieData.poster_path}" class="img-fluid border border-dark-subtle shadow" alt="">
      </div>
      <div class="details col-lg-6 d-flex flex-column">
        <h1>${movieData.title} (${releaseDate.getFullYear()})</h1>
        <p class="fst-italic fs-4">${movieData.tagline}</p>
        <p class="fs-5">${allGenres} • ${formattedDate} • ${hours}h ${minutes}m</p>
        <p class="fw-bold fs-4">Overview:</p>
        <p class="fs-5">${movieData.overview}</p>
        <p class="fs-5"><span class="fw-bold fs-4">Starring:</span> ${allActors}</p>
        <p class="fs-5"><span class="fw-bold fs-4">User Score:</span> ${Math.floor((movieData.vote_average)*10)}% <span class="fw-light">(${movieData.vote_count} votes)</span></p>
        <a href="https://www.imdb.com/title/${movieData.imdb_id}/" target="_blank"><img src="./imdb.png" class="imdb"></a>
    </div>
    `;
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });
