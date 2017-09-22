var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var filesize = require('filesize');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');

gulp.task('smart', function() {
    console.log('[Ymini]执行智能压缩');
    var progressPash = gutil.env.path ? gutil.env.path : '';
    var progressFilePash = path.join(progressPash);

    if ((progressPash).lastIndexOf('.js') > -1 || (progressPash).lastIndexOf('.css') > -1) {
        progressFilePash = progressPash;
    } else {
        progressFilePash = path.join(progressFilePash,'**/*');
    }
    console.log(progressFilePash)
    var cssFilter = filter(['**/*.css'], {restore: true});
    var jsFilter = filter(['**/*.js'], {restore: true});

    return gulp.src(progressFilePash)
        .pipe(plumber())
        .pipe(jsFilter)
        .pipe(uglify({
                mangle: {
                    reserved: ['define', 'require', 'module', 'exports'],
                },
                output:{
                    keep_quoted_props:true
                },
                ie8: true
            }))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(cleanCSS({
                debug:true,
                compatibility: 'ie8',
                processImport: false,
                inline:'none'
            }, function(file) {
                console.log('[压缩CSS]' + file.name + ': [' + filesize(file.stats.originalSize) + ' >> ' + filesize(file.stats.minifiedSize) + ']');
        }))
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(function(file){
            return file.base
        }));

});
gulp.task('default', ['smart']);
gulp.task('css', ['smart']);
gulp.task('scripts', ['smart']);