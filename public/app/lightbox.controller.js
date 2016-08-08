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


function dimissLightBox (){
  if(utility.hasClass(body,'no-scroll')){
    utility.removeClass(body,'no-scroll');
  }
  lightBoxBg.style.display = 'none';
  lightBox.style.display ='none';
  }
function startLightBox(i,image){
  console.log(i);
  var source = image.target.src;
  lightBoxImage.src = source;
  if(!utility.hasClass(body,'no-scroll')){
    body.className += "no-scroll";
  }
  if(i === 0){
    prev.style.display = 'none';
  }
  else if (i === (totalImages-1)){
    next.style.display ='none';
  }
  else {
    prev.style.display = 'inline';
    next.style.display ='inline';
  }
    lightBoxBg.style.display = 'block';
    lightBox.style.display ='block';
  } 

  this.startListener = function startListener(){

    for (var i = 0; i < images.length; i++){
      images[i].addEventListener('click', startLightBox.bind(this,i));
    } 

    lightBoxBg.addEventListener('click',dimissLightBox);   
  };  
  



};

module.exports = LightBoxController;  