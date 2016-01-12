var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
//var modernizr = require('gulp-modernizr');
var htmlReplace = require('gulp-html-replace'); 
var gulpif = require('gulp-if');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./src"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('modernizr', function() {
  gulp.src('src/js/*.js')
    .pipe(modernizr())
    .pipe(gulp.dest('src/js/plugins/'))
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('styles', function(test){
  console.log(test);
  gulp.src(['src/sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('src/css/'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(minifycss())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('html-replace', function(){
  gulp.src('src/index.html')
        .pipe(htmlReplace({
            'js-head' : ['js/plugins/modernizr.min.js'],
            'js-footer' : ['js/main.min.js', 'js/plugins/jquery.min.js'],
            'css' : ['css/main.min.css']
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('production', function(){
  gulp.src(['src/**/*.html'])

  gulp.src(['src/js/plugins/**/*.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/plugins'))

    gulp.src(['src/js/**/*.js'])
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'))

      gulp.src(['src/sass/**/*.scss'])
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))

});

gulp.task('dev', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.scss", ['styles']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});

gulp.task('default', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('src/js/plugins/'))
});

gulp.task('prod', ['production', 'html-replace']);