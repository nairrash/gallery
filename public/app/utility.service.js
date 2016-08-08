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

};

module.exports = Utility;