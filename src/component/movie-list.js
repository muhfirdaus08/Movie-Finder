import axios from 'axios';
import { slice } from 'lodash';

class MovieList extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .header-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 10px;
          margin-top: 50px;
          margin-left: 20px;
          margin-right: 20px;
        }

        .header-container h3 {
          align-self: flex-start;
          margin-left: 125px;
          margin-bottom: 25px;
          background-color: #c79b00;
          padding: 10px;
          border-radius: 10px
        }

        @media screen and (max-width: 850px){
          .header-container h3{
            display: flex;
            align-self: center;
            justify-content: center; 
            margin-left: 0px;
          }
        }
        
        .container-movie-item-list {
          margin-top: 10px;
          width: 100%;
          gap: 40px; 
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .container-movie-item-list .movie-item-list {
          display: flex;
          flex-direction: column;
          color: #fff;
        }

        .container-movie-item-list .movie-item-list:hover{
          scale: 1.09;
          transition: 0.4s ease; 
        }

        .container-movie-item-list .movie-item-list .poster {
          display: flex;
          width: 225.474px;
          height: 300.632px;
          align-items: flex-start;
          gap: 7.516px;
          border-radius: 15.032px;
          background: #fff;
          font-size: 15px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          margin-bottom: 15px;
        }

        .container-movie-item-list .movie-item-list .movie-info {
          display: flex;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
        }

        .container-movie-item-list .movie-item-list .movie-info .movie-title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 19px;
          max-width: 225.474px;
        }

        .container-movie-item-list .movie-item-list .movie-info .year-rating {
          display: flex;
          gap: 4.509px;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          font-size: 15px;
        }

        .container-movie-item-list .movie-item-list .movie-info .year-rating .star {
          align-self: center;
        }

      </style>

      <div class="header-container">
        <h3></h3>
        <div class="container-movie-item-list"></div>
      </div>
    `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.headingElement = shadowRoot.querySelector('h3');
    this.containerElement = shadowRoot.querySelector('.container-movie-item-list');
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    this.headingElement.textContent = title;

    const category = this.getAttribute('category');
    this.getMoviesByCategory(category);
  }

  getMoviesByCategory = async (category) => {
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = process.env.API_KEY_THEMOVIEDB;

    try {
      const response = await axios.get(`${BASE_URL}/${category}?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      });

      const data = response.data;
      const limitedData = slice(data.results, 0, 12);

      this.renderMovies(limitedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  renderMovies = (data) => {
    this.containerElement.innerHTML = '';

    data.forEach((movie) => {
      const movieItemHTML = `
        <div class="movie-item-list">
          <div class="movie-item">
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster">
            <div class="movie-info">
              <h2 class="movie-title">${movie.title}</h2>
              <div class="year-rating">
                <p class="year">${movie.release_date.substring(0, 4)}</p>
                <img class="star" src="https://i.ibb.co/Brzq3ZQ/Star.png" alt="rate" height="19px">
                <p class="rating">${movie.vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      this.containerElement.innerHTML += movieItemHTML;
    });
  };
}

export default MovieList;
