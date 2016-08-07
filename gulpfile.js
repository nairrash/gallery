var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var browserify = require('browserify');
 sass   = require('gulp-sass');
var source = require('vinyl-source-stream');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');



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

gulp.task('build-css', function() {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/assets/stylesheets'));
});

gulp.task('browserify', function() {
  // Grabs the app.js file
  return browserify('./public/app/app.start.js')
  // bundles it and creates a file called main.js
    .bundle()
    .pipe(source('main.js'))
    // saves it the public/js/ directory
    .pipe(gulp.dest('./public/assets/js'));
});



gulp.task('watch:js', function() {
  gulp.watch('./public/app/**/*.js', ['jshint','browserify'])
});

gulp.task('watch:css', function() {
  gulp.watch('./public/sass/**/*.scss', ['build-css'])
});

gulp.task('watch:templates', function() {
  gulp.watch('./public/templates/**/*.hbs', ['compile-templates'])
});

// gulp.task('default', ['minify', 'fix-template']);
gulp.task('default', ['watch:js','watch:css','watch:templates']);
