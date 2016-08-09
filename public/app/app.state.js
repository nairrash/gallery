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
    this.state.current = '#/' + route;
    switch(route) {
      case 'art':  api.getArt(this.initializePage.bind(this));
                  break;
      case 'nature': api.getNature(this.initializePage.bind(this));
                  break;
      case 'cars' : api.getCars(this.initializePage.bind(this));
                  break;
      default : api.getArt(this.initializePage.bind(this));
     
    }

  };  

  this.initializePage = function(request,response){
    var data = JSON.parse(response);
    var gridTemplate = views['art-partial'];

     document.getElementById("pictureGrid").innerHTML = gridTemplate(data);
 }; 

//  this.initializeNaturePage = function(request,response){
//     var natureData = JSON.parse(response);
//     var natureTemplate = views['art-partial'];    

//      document.getElementById("pictureGrid").innerHTML = natureTemplate(natureData);
//  };  
  

};
  
module.exports = AppState;