import '../style/style.css';
import axios from 'axios';

const renderMovieItem = (data) => {
  const movieItem = document.querySelector('.item-movie-hero');
  movieItem.classList.remove('hidden');
  movieItem.innerHTML = `
    <style>
      .item-movie-hero {
        margin-top: 70px;
        margin-bottom: 50px; 
      }
    </style>

    <img class="poster" src="${data.Poster !== 'N/A' ? data.Poster : 'https://i.ibb.co/NTTHtTV/timthumb.png'}" alt = "${data.Title}"" alt="poster">
    <div class="movie-info">
      <h2 class="movie-title">${data.Title}</h2>
      <div class="year-rating">
        <p class="year"><span>Year: </span>${data.Year}</p>
        <img class="star" src="https://i.ibb.co/Brzq3ZQ/Star.png" alt="rate" width="25px">
        <p class="rating">${data.imdbRating}</p>
      </div>
      <div class="movie-detail">
        <p class="genre"><span>Genre: </span>${data.Genre}</p>
        <p class="release-date"><span>Released date: </span>${data.Released}</p>
        <p class="actors"><span>Actors: </span>${data.Actors}</p>
        <p class="writes"><span>Writer: </span>${data.Writer}</p>
      </div>
    </div>  
  `;
};

const getMovies = async (keyword) => {
  const URL = `http://www.omdbapi.com/?t=${keyword}&apikey=${process.env.API_KEY_OMDB}`;

  try {
    const response = await axios.get(URL);
    const data = response.data;

    if (data != null) {
      renderMovieItem(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const searchElement = document.getElementById('searchElement');

searchElement.addEventListener('input', () => {
  const inputValue = searchElement.value;
  const movieItem = document.querySelector('.item-movie-hero');
  
  if (inputValue === '') {
    movieItem.classList.add('hidden');
    movieItem.innerHTML = '';
  }
});

document.getElementById('searchButtonElement').addEventListener('click', () => {
  const inputValue = searchElement.value;
  if (inputValue.trim() !== '') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getMovies(inputValue);
  }
});





