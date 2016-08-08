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