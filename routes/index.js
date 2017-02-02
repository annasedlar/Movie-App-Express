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

router.get('/search', function(req, res, next) {
	res.render('search', {})
});

router.get('/searchMovie', function(req, res, next){
	res.send("haha I'm a get route.");
});
	
router.post('/searchMovie', function(req, res, next) {
	var movieSearchString = req.body.movieSearch;
	var actorSearchString =req.body.actorSearch;
	var querymovieURL = config.baseUrl+'search/movie?'+config.api_key+'&query='+movieSearchString;
	var queryactorURL = config.baseUrl+'search/movie?'+config.api_key+'&query='+actorSearchString;
	// res.send(queryURL);
	console.log(movieSearchString);
	request.get(querymovieURL, (error, response, searchData)=>{
		searchData = JSON.parse(searchData); 
		res.render('index', {
			movieData: searchData,
			imageUrl: config.imageBase
		});
	})
// 	request.get(queryactorURL, (error, response, searchData)=>{
// 		searchData = JSON.parse(searchData); 
// 		res.render('index', {
// 			movieData: searchData,
// 			imageUrl: config.imageBase
// 		})
// 	})
});


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
