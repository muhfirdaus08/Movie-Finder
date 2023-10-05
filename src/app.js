// Import komponen-komponen yang Anda buat
import MovieList from './component/movie-list.js';
import MovieHeader from './component/movie-header.js';
import './view/index.js';

const main = () => {
  customElements.define('movie-header', MovieHeader);
  customElements.define('movie-list', MovieList);
};

window.addEventListener('load', main);
