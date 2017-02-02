var express = require('express');
var router = express.Router();
var request = require('request'); 


var config = {
    baseUrl: 'http://api.themoviedb.org/3/',
    imageBase: 'http://image.tmdb.org/t/p/w300',
    imageBaseFull: 'http://image.tmdb.org/t/p/original',
    nowPlayingEP: 'movie/now_playing?',
    api_key: '&api_key=fec8b5ab27b292a68294261bb21b04a5'
};

/* GET home page. */
router.get('/', function(req, res, next) {
	request.get(config.baseUrl+config.nowPlayingEP+config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData); 
		// console.log("movie data", typeof(movieData));  
		//--will show up in terminal, not console! because its node
		res.render('index', {movieData: movieData,
			imageUrl: config.imageBase})
	});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
