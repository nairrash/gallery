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