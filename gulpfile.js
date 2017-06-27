/*!
 * gulp
 * $ npm install gulp gulp-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del jshint gulp-jshint concise.css gulp-gh-pages --save-dev
 */

 'use strict';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    pug = require('gulp-pug'),
    flatten = require('gulp-flatten'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    ghPages = require('gulp-gh-pages'),
    del = require('del');

// Styles
gulp.task('styles', function () {
  return gulp.src('src/styles/*.css')
    .pipe(sass({
      outputStyle: 'expanded' // CSS non minifiée plus lisible ('}' à la ligne)
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    //.pipe(sourcemaps.init())
    .pipe(cssnano())
    //.pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(gulp.dest('dist/styles'))
    // .pipe(sass().on('error', sass.logError))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Pages
gulp.task('pages', function buildHTML() {
  return gulp.src('src/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/pages'))
    .pipe(notify({ message: 'Pages task complete' }));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src('src/fonts/*.{eot,svg,ttf,woff,woff2}')
    // .pipe(filter('src/fonts/*.{eot,svg,ttf,woff}'))
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'))
    // .pipe(notify({ message: 'Fonts task complete' }));
});

// MISC
gulp.task('misc', function () {
  return gulp.src(['src/**/*.{ico,txt,png}', 'src/CNAME'])
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'MISC task complete' }));
});

// jsonfile
gulp.task('json', function () {
  return gulp.src(['src/json/*.json'])
    .pipe(gulp.dest('dist/json'))
    .pipe(notify({ message: 'Json task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/pages', 'dist/fonts', 'dist/json']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'pages', 'misc', 'fonts', 'json');
});

// Build task
gulp.task('build', ['styles', 'scripts', 'images', 'pages', 'misc', 'fonts', 'json']);

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.css', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch pages files
  gulp.watch('src/pages/**/*', ['pages']);

  // Watch fonts files
  gulp.watch('src/fonts/**/*', ['fonts']);

  // Watch json files
  gulp.watch('src/json/**/*', ['json']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('start-server', function() {
    connect.server({ root: 'dist', livereload: true });
});

gulp.task('serve', ['watch', 'start-server']);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: "gogs@debile.ddns.net:cyp/carte_expat.git"
    }));
});
