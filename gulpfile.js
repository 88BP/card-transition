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
var htmlReplace = require('gulp-html-replace'); 
var gulpif = require('gulp-if');
var wiredep = require('wiredep').stream;
var mainBowerFiles = require('main-bower-files');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./src"
    }
  });
});


/*
Takes the output of the bowerfiles and injetcs them into vendor.js
 */
gulp.task('bower-files', function(){
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
   .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        console.log(error)
        this.emit('end');
    }}))
    .pipe(concat('plugins/vendor.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js/'));

});


gulp.task('bower', function () {
  gulp.src('./src/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here',
      exclude: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js']
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src'))

});


gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
    }))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('styles', function(){
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
            'js-footer' : ['js/plugins/vendor.min.js', 'js/main.min.js'],
            'css' : ['css/main.min.css']
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('production', function(){
  //gulp.src(['src/**/*.html'])

  //.gulp.src(['src/js/plugins/**/*.js'])
    //.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    //.pipe(gulp.dest('dist/js/plugins'))

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
  gulp.watch("./src/sass/**/*.scss", ['styles']);
  gulp.watch("./src/js/**/*.js", ['scripts']);
  gulp.watch("./src/*.html", ['bs-reload']);
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

gulp.task('prod', ['production', 'html-replace', 'bower-files', 'images']);