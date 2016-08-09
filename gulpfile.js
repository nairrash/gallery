var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename =require('gulp-rename');
var browserify = require('browserify');
 var sass   = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var filename = 'app.start.js';


gulp.task('compile-templates', function() {
  gulp.src('./public/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./public/assets/partials'));
});

gulp.task('jshint', function() {
  return gulp.src('./public/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  return browserify('./public/app/app.start.js')
    .bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) // now gulp-uglify works 
    .pipe(gulp.dest('./public/assets/js'));
});
  


gulp.task('sass', function() {  
    return sass('./public/sass/index.scss', {style: 'compressed'})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/assets/stylesheets'));
});
   
gulp.task('watch:js', function() {
  gulp.watch('./public/app/**/*.js', ['jshint','browserify'])  
});

gulp.task('watch:css', function() {
  gulp.watch('./public/sass/**/*.scss', ['sass'])     
});

gulp.task('watch:templates', function() {
  gulp.watch('./public/templates/**/*.hbs', ['compile-templates'])
});

// gulp.task('default', ['minify', 'fix-template']);
gulp.task('default', ['sass','browserify','compile-templates']);
gulp.task('watch',['watch:js','watch:css','watch:templates']);