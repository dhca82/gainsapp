var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

//Source folders.
var src = {
    scripts: '../app/scripts/',
    scriptsWatch: '../app/scripts/app.js',
    styles: '../app/styles/*.scss',
    stylesWatch: '../app/styles/**/*.scss',
    images: '../app/images/**/*.{png,jpg,gif}',
    views: '../app/views/**/*.html'
};

//Destination folders.
var	dest = {
    root: '../dist/**',
    scripts: '../dist/scripts/',
    styles: '../dist/styles/',
    images: '../dist/images/',
};

/*
gulp.task('scripts', function() {
    return gulp.src(src.scripts)
        .pipe(gulp.dest(dest.scripts));
});
*/

gulp.task('scripts', function() {

var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  
  return gulp.src(['../app/scripts/app.js'])
    .pipe(browserified)
    //.pipe(uglify())
    .pipe(gulp.dest('../dist/scripts'));

});

gulp.task('styles', function () {
    return gulp.src(src.styles)
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest(dest.styles));
});

gulp.task('images', function () {
    return gulp.src(src.images)
        .pipe(gulp.dest(dest.images));
});

gulp.task('views', function() {
    return gulp.src(src.views)
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('build',function() {
    runSequence('styles', 'scripts', 'images');
});

gulp.task('watch', ['build'], function() {
    gulp.watch(src.scriptsWatch, ['scripts']);
    gulp.watch(src.stylesWatch, ['styles']);
    gulp.watch(src.images, ['images']);
});

gulp.task('default', ['build']);
