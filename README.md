
<snippet>
  <content>
## Gallery app
This project is meant to be a technical excercise.
It is a web page that shows a grid of photo thumbnails; when a  thumbnail is clicked, the photo is displayed n a lightbox view, with the ability to move to the next / previous photos and display the photo title

## Installation
`git@github.com:nairrash/gallery.git`

run `npm install`
run `gulp`

if you run into environmental variable settings issue try 

`export NODE_ENV=development`

some errors you might run into --for global installs :
`npm install --global gulp-cli`   -for gulp
`gem install sass`  -for sass

## usage
http://{SERVER_URI}:3001
eg : http://localhost:3001


## Description
> Access a public API and successfully retrieve data from it;    
I am using Storify's API to access instagram feeds of me and my family

>Display that data on a page:    
I have used node backend(with express)

>Update the UI of a page without refreshing     
I have intrepreted this as making this a single page application. 
So if you click on the top navigation elements , the page will not refresh

>Do all of the above using only native JavaScript (no libraries such as jQuery, although CSS preprocessors are fine).    
I have not used any javascript libraries. I have used SASS for css    


## common errors
some errors you might run into --for global installs :
`npm install --global gulp-cli`   -for gulp

`gem install sass`  -for sass


if you get a environemnt related error :

`export NODE_ENV=development`
