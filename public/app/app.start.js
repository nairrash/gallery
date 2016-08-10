(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', documentReady);

  function documentReady () {
 
    var Utility, AppState, LightBoxController;
     
  
    AppState = require('./app.state'); 
  
  
    Utility = require('./utility.service');
    LightBoxController = require('./lightbox.controller');

    var utility = new Utility();
    utility.navButtonResponse();
   var lightbox = new LightBoxController(utility);
    var appstate = new AppState(utility,lightbox);  
        

    //lightbox.startListener();
    appstate.start();       

  
  }  
}());     