var AppState = function (utility) {

  'use strict';

  this.state = {
    current : ''
  };
  var views= require('../assets/partials/templates');

  var api = utility.api;
  this.start = function () { 
    // this.watchLocation();

    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  };

  // this.watchLocation = function () {
  //   console.log("hash changed!");
  //   window.addEventListener('hashchange', this.route.bind(this));
  // };

  this.route = function () {
    //console.log(location.hash);
    // we use current to track the actual page, then this function watches for hash change
    var current = this.state.current;
    var locationHash = location.hash;
    switch(locationHash) {
      case ('#art')   : this.initializeView('art');
                      break;
      case('#nature') : this.initializeView('nature');
                      break;
      case('#cars') : this.initializeView('cars');
                      break;
      default         : location.hash = '#art';
                          break;
    }  
};  

  this.initializeView = function (route) {
    var controller;

    //this.state.title = this.setTitleFromRoute(route);
    //this.state.previous = this.state.current;
    this.state.current = '#/' + route;

    

    switch(route) {
      case 'art':  
      api.getArt(this.processActors.bind(this));
        //controller = require('./explore.controller');
        //this.state.view = views.explore;
        //this.state.controller = new controller(this.state, utility);
        break;
      case 'explorer':    
        // controller = require('./deepField.controller');
        // this.state.view = views['deep-field'];
        // this.state.controller = new controller(this.state, $, d3, utility);
        break;
      case 'details':
          // controller = require('./detail.controller');
        // this.state.view = this.assignDetailViewByActorType(this.state.source.type);
        // this.state.controller = new controller(this.state, $, d3, utility);
        break;
      // case 'connections':
   //   controller = require('./drillDown.controller');
      //   this.state.view = views.drilldown;
      //   this.state.controller = new controller(this.state, $, d3, utility);
      //   break;  
    }

    // this.state.controller.initialize();
  };  

  this.processActors = function(request,response){
    // var artData = {
    //   sid : response.sid,
    //   title: response.title,    
    //   // author : response.author.name,
    //   desc : response.description
    // };
    var artData = JSON.parse(response);
   console.log(JSON.parse(response));
   // console.log(views);    
    var artTemplate = views['art-partial'];
    // console.log(artTemplate);
    //document.getElementById("pictureGrid").innerHTML = "rash";
     document.getElementById("pictureGrid").innerHTML = artTemplate(artData);
 };  
  

};
  
module.exports = AppState;