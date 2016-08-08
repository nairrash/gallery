var superagent = require('superagent');
// var consolidate = require('consolidate');

var user = 'nairrashmi1406';
var story_slug = 'nature';
var story_slug2 = 'san_diego'

//Paste your values
var api_key = "57a6d5cd8d05fbea7a65bf7c";
var username = "nairrashmi1406";
var _token = "";

module.exports = function(app) {

// 	app.get('/story',function(req, res){
//   //Fetch elements from Storify API
//   superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
//     .query({api_key: api_key,
//       username: username,
//       _token: _token})
//     .set({  Accept: 'application/json' })
//     .end(function(e, storifyResponse){
//       if (e) next(e);
//       //Render template with story object in response body     
//       return res.render('pages/home',storifyResponse.body.content);      
//     })

// });


app.get('/',function(req, res){
  //Fetch elements from Storify API
  superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
    .query({api_key: api_key,
      username: username,
      _token: _token})
    .set({  Accept: 'application/json' })
    .end(function(e, storifyResponse){
      if (e) next(e);
      //sending back json response     
      //return res.json(storifyResponse.body.content);  
			return res.render('pages/home',storifyResponse.body.content);      
    
    });

});


// app.get('/art',function(req, res){
//   //Fetch elements from Storify API
//   superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
//     .query({api_key: api_key,
//       username: username,
//       _token: _token})
//     .set({  Accept: 'application/json' })
//     .end(function(e, storifyResponse){
//       if (e) next(e);
//       //sending back json response     
//       return res.json(storifyResponse.body.content);  
// 			//return res.render('pages/home',storifyResponse.body.content);      
    
//     });

// });

// app.get('/art',function(req, res){
//   //Fetch elements from Storify API
//   superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug2)
//     .query({api_key: api_key,
//       username: username,
//       _token: _token})
//     .set({  Accept: 'application/json' })
//     .end(function(e, storifyResponse){
//       if (e) next(e);
//       //sending back json response     
//       return res.json(storifyResponse.body.content);  
// 			//return res.render('pages/home',storifyResponse.body.content);      
    
//     });

// });

	app.get('/api/person/:id', function(req, res) {
	// get that data from database
		res.json({ firstname: 'John', lastname: 'Doe' });
	});
	
	app.post('/api/person', function(req, res) {
		// save to the database
	});
	
	app.delete('/api/person/:id', function(req, res) {
		// delete from the database
	});
	
}