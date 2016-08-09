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