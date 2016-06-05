
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var browserify = require('browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
var livereload = require('gulp-livereload');

var dest = 'dest/';
var cordova = false;

gulp.task('default', function() {

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    gulp.start('styles');
    gulp.start('scripts');
    gulp.start('images');
    gulp.start('resources');

    if(process.env.NODE_ENV === 'development') {
        gulp.start('html-dev');
    } else {
        gulp.start('html');
    }

});

gulp.task('production', function() {

    gulp.start('styles');
    gulp.start('scripts');
    gulp.start('html');
    gulp.start('images');
    gulp.start('resources');

});

gulp.task('cordova', function() {
    
    dest = 'Charades/www/';
    cordova = true;
    gulp.start('watch');
    
});

gulp.task('styles', function() {

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    gulp.src("./app/index.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS({
            compatibility: 'ie8',
            keepBreaks: process.env.NODE_ENV !== 'production'
        }))
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(livereload());

});

gulp.task('scripts', function() {

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var ret = browserify({
        entries: ['./app/index.js'],
        paths: ['./app/bower_components']
    }).bundle()
        .pipe(source('index.js'))
        .pipe(buffer());

    if(process.env.NODE_ENV === 'production') {
        ret.pipe(uglify());
    }

    ret.pipe(gulp.dest(dest + 'js/'))
        .pipe(livereload());

    return ret;

});

gulp.task('html', function() {

    gulp.src('./app/index.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(dest))
        .pipe(livereload());

    gulp.src('./app/views/**/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(dest))
        .pipe(livereload());

    gulp.src('./app/directives/**/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(dest))
        .pipe(livereload());

});

gulp.task('html-dev', function() {

    gulp.src('./app/index.html')
        .pipe(plumber())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(dest))
        .pipe(livereload());

    gulp.src('./app/views/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest(dest))
        .pipe(livereload());

    gulp.src('./app/directives/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest(dest))
        .pipe(livereload());

});

gulp.task('images', function() {

    gulp.src('app/img/*')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/img'));

});

gulp.task('resources', function() {

    gulp.src('app/resources/**/*')
        .pipe(gulp.dest(dest + 'resources'));

});

gulp.task('watch', function() {
    
    gulp.start('default');

    if(!cordova) {
        livereload.listen({
            start: true
        });
    }

    watch('app/**/*.js', function() {
        gulp.start('scripts');
    });

    watch('app/**/*.scss', function() {
        gulp.start('styles');
    });

    watch('app/**/*.html', function() {
        gulp.start('html');
    });

    watch('app/img', function() {
        gulp.start('images');
    });

    watch('app/resources/**/*.*', function() {
        gulp.start('resources');
    });

});
