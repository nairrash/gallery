(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ApiService = function ApiService(utility){
  'use strict';  
  
  var HISTORY_LIMIT = 25;    

  this.history = {    
    art :[],  
    nature : [],  
    cars : [] 
  };  
  
  this.getArt = function getArt(callback) {
    var request = {
      url : '/art',
      parameters : {}
    };
    
    utility.get(request,this.storeArt.bind(this,callback));
    
  };

  this.getNature = function getNature(callback) {
    var request = {
      url : '/nature',
      parameters : {}
    };
    
    utility.get(request,this.storeNature.bind(this,callback));
    
  };

  this.getCars = function getCars(callback) {
    var request = {
      url : '/cars',
      parameters : {}
    };
    
    utility.get(request,this.storeCars.bind(this,callback));
    
  };
  
  this.storeArt = function (callback, request, response) {  
    //this.updateHistory('details', state.source.name, response);
    callback(request, response);    
  };
  
  this.storeNature = function (callback, request, response) {  
    //this.updateHistory('details', state.source.name, response);
    callback(request, response);
  };    

  this.storeCars = function (callback, request, response) {  
    //this.updateHistory('details', state.source.name, response);
    callback(request, response);
  };


  this.updateHistory = function (view, source, response) {
    if (response.status !== 200) {    // dont cache errors
      return;
    }
    for(var i = 0; i < this.history[view].length; i++) {
      if(this.history[view][i].source === source) {
        this.history[view].splice(i, 1);  
        break;
      }
    }

    this.history[view].push({    
      source: source,
      response: response
    });

    if(this.history[view].length > HISTORY_LIMIT) {
      this.history[view].shift(); 
    }  
  };
};




  module.exports = ApiService;
},{}],2:[function(require,module,exports){
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
},{"./app.state":3,"./lightbox.controller":4,"./utility.service":5}],3:[function(require,module,exports){
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
},{"../assets/partials/templates":6}],4:[function(require,module,exports){
var LightBoxController = function(utility){
  'use strict';
  var lightBoxBg = document.getElementById('lgbg');
  var lightBox = document.getElementById('lg');
  var lightBoxImage = document.getElementById('lgImage');
  var imageTitle = document.getElementById("imageTitle");
  var body = document.body;
  var totalImages = 0;
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var currentImageId = 0;
  var images= '';
//console.log(images);

function dimissLightBox (){
  if(utility.hasClass(body,'no-scroll')){
    utility.removeClass(body,'no-scroll');
  }
  lightBoxBg.style.display = 'none';
  lightBox.style.display ='none';
  }
function startLightBox(id,image){
  var source = image.target.src;
 
  var title = image.target.title;
  currentImageId = id;
  lightBoxImage.src = source;
  imageTitle.innerHTML = title;
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
  var title = image.title;
  lightBoxImage.src = image.src;
    imageTitle.innerHTML = title;

  
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
    images =  document.getElementsByClassName('thumbnail');
    totalImages = images.length;


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
},{}],5:[function(require,module,exports){
var Utility = function(){
  'use strict';

    var Api = require('./api.service');


this.hasClass = function hasClass(element,cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

  this.api = new Api(this);


this.removeClass =function(element,cls){
  element.classList.remove(cls);  
};

this.get = function (o, callback) {
  var url = o.url,
  parameters = this.setGetParameters(o),
  failedResponse = this.failedResponse,
  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = function () {
    if(xmlHttpRequest.readyState === 4) {
      if (200 === xmlHttpRequest.status) {
        if(callback !== undefined){
          callback(o, xmlHttpRequest.responseText);
        }
        } 
        else {
          failedResponse();
        }
      }
    };
    xmlHttpRequest.open('GET', url + parameters, true);
    xmlHttpRequest.send();
  };

  this.failedResponse = function(txt) {
    // default messaging
    txt = typeof txt !== 'undefined' ? txt : [
      'An internal error has occurred. We have noted the problem and are working to',
      'fix the issue.'
    ].join(' ');

    if(txt) {
     alert(txt);
    }
};

this.setGetParameters = function (o) {
    var parameters = '';
    var i = 0;
    for(var key in o.parameters) {
      if(o.parameters.hasOwnProperty(key)) {
        if(i === 0) {
          parameters = '?' + key + '=' + o.parameters[key];
        } else {
          parameters += '&' + key + '=' + o.parameters[key];
        }

        i++;
      }
    }  

    return parameters;
  };

  this.navButtonResponse = function navButtonResponse() {
    var navController = document.getElementById('navClicker');
    navController.addEventListener('click',switchNavClass.bind(this));
  
};

function switchNavClass(){
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }  
}  

};

module.exports = Utility;
},{"./api.service":1}],6:[function(require,module,exports){
this["art-partial"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<li class=\"thumbnail\">\n\n<img src = \""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1)) != null ? stack1.src : stack1), depth0))
    + "\" title=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1)) != null ? stack1.caption : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1)) != null ? stack1.caption : stack1), depth0))
    + "\"\n  \n</li> \n   \n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n<div>\n <ul style=\"padding-left:1em\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul> \n     \n\n</div>        ";
},"useData":true});
},{}]},{},[2]);
