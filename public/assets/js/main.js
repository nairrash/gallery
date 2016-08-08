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
var LightBoxController = function(utility){
  'use strict';
  var lightBoxBg = document.getElementById('lgbg');
  var lightBox = document.getElementById('lg');
  var lightBoxImage = document.getElementById('lgImage');
  var body = document.body;
  var images = document.getElementsByClassName('thumbnail');
  var totalImages = images.length;
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var currentImageId = 0;


function dimissLightBox (){
  if(utility.hasClass(body,'no-scroll')){
    utility.removeClass(body,'no-scroll');
  }
  lightBoxBg.style.display = 'none';
  lightBox.style.display ='none';
  }
function startLightBox(id,image){
  var source = image.target.src;

  currentImageId = id;
  lightBoxImage.src = source;
  if(!utility.hasClass(body,'no-scroll')){
    body.className += "no-scroll";
  }
  if(id === 0){
    prev.style.display = 'none';
  }  
  else if (id === (totalImages-1)){
    next.style.display ='none';
  }  
  else {  
    prev.style.display = 'inline';
    next.style.display ='inline';    
  }
    lightBoxBg.style.display = 'block';
    lightBox.style.display ='block';
  }


function changeLightBoxElement(id){
  currentImageId = id;
  var image = images[id].getElementsByTagName('img')[0];
  //console.log(image);
  lightBoxImage.src = image.src;
   if(id === 0){
    prev.style.display = 'none';
  }  
  else if (id === (totalImages-1)){
    next.style.display ='none';
  }  
  else {  
    prev.style.display = 'inline';
    next.style.display ='inline';    
  }

} 


  this.startListener = function startListener(){

    for (var i = 0; i < images.length; i++){
      images[i].addEventListener('click', startLightBox.bind(this,i));
    } 

    lightBoxBg.addEventListener('click',dimissLightBox);
     prev.addEventListener('click',function(){
       if(currentImageId > 0){
         changeLightBoxElement((currentImageId-1));
       }
     });
     next.addEventListener('click',function(){
       if(currentImageId < totalImages){
         changeLightBoxElement((currentImageId+1));
       }
     });
  };    
  



};

module.exports = LightBoxController;  
},{}],3:[function(require,module,exports){
var Utility = function(){
  'use strict';

this.hasClass = function hasClass(element,cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

this.removeClass =function(element,cls){
  element.classList.remove(cls);
};
};

module.exports = Utility;
},{}]},{},[1]);
