const _apiUrl = 'https://api.themoviedb.org/3/';
const _imagesUrl = 'https://image.tmdb.org/t/p/w185';
const _imagesUrl342 = 'https://image.tmdb.org/t/p/w342';
const _imagesUrl92 = 'https://image.tmdb.org/t/p/w92';
const _youtube = 'https://www.youtube.com/embed/';
const _key = '2c76f2934b9b26dd102cc7de830a7455';
const _endPoints = {
    discoverMovie: 'discover/movie',
    discoverTv: 'discover/tv',
    detailMovie: 'movie',
    detailTv: 'tv',
    searchMovies: 'search/movie',
    searchTv: 'search/tv',
    popular: 'movie/popular',
    genres: 'genre/movie/list'
};

export default {
    apiUrl: _apiUrl,
    imagesUrl: _imagesUrl,
    imagesUrl342: _imagesUrl342,
    imagesUrl92: _imagesUrl92,
    youtube: _youtube,
    getDiscoverMovie: (params) => {
        let paramsUrl = "";
        for (let key in params) {
            if (params[key]) {
                paramsUrl += "&" + key + "=" + params[key];
            }
        }
        console.log(`${_apiUrl + _endPoints.discoverMovie}?api_key=${_key}${paramsUrl}`);
        return fetch(`${_apiUrl + _endPoints.discoverMovie}?api_key=${_key}${paramsUrl}`, {
            method: 'get'
        });
    },
    getDiscoverTv: (params) => {
        let paramsUrl = "";
        for (let key in params) {
            if (params[key]) {
                paramsUrl += "&" + key + "=" + params[key];
            }
        }
        console.log(`${_apiUrl + _endPoints.discoverTv}?api_key=${_key}${paramsUrl}`);
        return fetch(`${_apiUrl + _endPoints.discoverTv}?api_key=${_key}${paramsUrl}`, {
            method: 'get'
        });
    },
    getGenres: () => {
        return fetch(`${_apiUrl + _endPoints.genres}?api_key=${_key}`, {
            method: 'get'
        });
    },
    getMovie: (id) => {
        return fetch(`${_apiUrl + _endPoints.detailMovie}/${id}?api_key=${_key}&append_to_response=keywords,credits,videos`, {
            method: 'get'
        });
    },
    getTv: (id) => {
        return fetch(`${_apiUrl + _endPoints.detailTv}/${id}?api_key=${_key}&append_to_response=keywords,credits,videos`, {
            method: 'get'
        });
    },
    searchMovies: (text) => {
        console.log(`${_apiUrl + _endPoints.searchMovies}?api_key=${_key}&query=${text}`);
        return fetch(`${_apiUrl + _endPoints.searchMovies}?api_key=${_key}&query=${text}`, {
            method: 'get'
        });
    },
    searchTv: (text) => {
        console.log(`${_apiUrl + _endPoints.searchTv}?api_key=${_key}&query=${text}`);
        return fetch(`${_apiUrl + _endPoints.searchTv}?api_key=${_key}&query=${text}`, {
            method: 'get'
        });
    },
    formatter: (number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            // the default value for minimumFractionDigits depends on the currency
            // and is usually already 2
        }).format(number);
    }
};