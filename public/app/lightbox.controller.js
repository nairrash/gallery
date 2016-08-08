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