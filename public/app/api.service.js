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

    // var storedResponse = this.getFromHistory('art');
    // if(storedResponse){
    //   return callback(request, storedResponse);
    // }
    utility.get(request,this.storeArt.bind(this,callback));
    
  };
  this.storeArt = function (callback, request, response) {  
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