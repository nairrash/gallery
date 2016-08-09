var AppState = function (utility,lightbox) {
  'use strict';
  var views= require('../assets/partials/templates');
  var api = utility.api;
  this.start = function () { 
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  };
  
  this.route = function () {
    var locationHash = location.hash;
    switch(locationHash) {
      case ('#art')   : this.initializeView('art');
                      break;
      case('#nature') : this.initializeView('nature');
                      break;
      case('#cars') : this.initializeView('cars');
                      break;
      default         : location.hash = '#nature';
                          break;  
    }  
};

this.initializeView = function (route) {
    var controller;
    switch(route) {
      case 'art':  api.getArt(this.initializePage.bind(this));
                  break;
      case 'nature': api.getNature(this.initializePage.bind(this));
                  break;
      case 'cars' : api.getCars(this.initializePage.bind(this));
                  break;
      default : api.getNature(this.initializePage.bind(this));
     
    }

  };  

  this.initializePage = function(request,response){
    var data = JSON.parse(response);
    var gridTemplate = views['art-partial'];

     document.getElementById("pictureGrid").innerHTML = gridTemplate(data);
     lightbox.startListener();
 }; 

 
  

};
  
module.exports = AppState;