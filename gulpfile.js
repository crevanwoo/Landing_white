'use strict';

var gulp = require('gulp');
var minify = require('gulp-minifier');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('all:watch', function () {
	gulp.watch('stylesheets/css/*.css', ['autoprefix']);
	gulp.watch('js/script.js', ['compress:js']);
	gulp.watch('views/**/*.pug', ['compile:pug']);
	gulp.watch('images_big/**/*', ['img:min']);
});


gulp.task('compress:js', function () {
	return gulp.src('*.js')
		.pipe(minify({
			minify: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			minifyJS: true,
		}))
		.pipe(gulp.dest('js/min'))
});

gulp.task('compile:pug', function buildHTML() {
	return gulp.src('views/templates/*.pug')
		.pipe(pug({
			pretty: true,
		})).pipe(gulp.dest(''))

});

gulp.task('img:min', function () {
	return gulp.src('images_big/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('images'))
});

gulp.task('autoprefix', function () {
	gulp.src('css/*.css')
		.pipe(autoprefixer({}))
		.pipe(gulp.dest('css/'))
});


gulp.task('default', []);
