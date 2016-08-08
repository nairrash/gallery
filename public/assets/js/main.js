(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', documentReady);

  function documentReady () {
    var Utility, AppState, LightBoxController;
    

    // AppState = require('./app.state'); 

    Utility = require('./utility.service');
    LightBoxController = require('./lightbox.controller');

    var utility = new Utility();
    var lightbox = new LightBoxController(utility);
    lightbox.startListener();


  }
}());
},{"./lightbox.controller":2,"./utility.service":3}],2:[function(require,module,exports){
var LightBoxController = function(){
  'use strict';
  var lightBoxBg = document.getElementById('lgbg');
  var lightBox = document.getElementById('lg');
  var lightBoxImage = document.getElementById('lgImage');

function dimissLightBox (){
    lightBoxBg.style.display = 'none';
    lightBox.style.display ='none';  
}
function startLightBox(image){

    console.log(lightBox);
    var source = image.target.src;
    console.log(source);
    lightBoxImage.src = source;  
    lightBoxBg.style.display = 'block';
    lightBox.style.display ='block';
  } 

  this.startListener = function startListener(){
    var images = document.getElementsByClassName('thumbnail');
    //  console.log(images);
    for (var i = 0; i < images.length; i++){
      images[i].addEventListener('click', startLightBox.bind(this));
    } 
//to be removed
    lightBoxBg.addEventListener('click',dimissLightBox);   
  };  
  



};

module.exports = LightBoxController;  
},{}],3:[function(require,module,exports){
var Utility = function(){
  'use strict';

};

module.exports = Utility;
},{}]},{},[1]);
