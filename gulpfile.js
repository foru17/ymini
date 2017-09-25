'use strict';

var path = require('path');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var filesize = require('filesize');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var count = require('gulp-count');


var YMINI_TASK = function() {
    console.log('[YMINI]执行智能压缩');
    var progressPath = gutil.env.path ? gutil.env.path : '';
    var progressFilePath = path.join((typeof(progressPath) == 'object' ? progressPath[0] : progressPath));

    if ((progressPath).lastIndexOf('.js') > -1 || (progressPath).lastIndexOf('.css') > -1) {
        progressFilePath = progressPath;
    } else {
        progressFilePath = path.join(progressFilePath, '**/*');
    }

    var cssFilter = filter(['**/*.css'], {
        restore: true
    });
    var jsFilter = filter(['**/*.js'], {
        restore: true
    });

    return gulp.src(progressFilePath)
        .pipe(plumber())
        .pipe(jsFilter)
        .pipe(uglify({
            mangle: {
                reserved: ['define', 'require', 'module', 'exports'],
            },
            output: {
                keep_quoted_props: true
            },
            ie8: true
        }))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(cleanCSS({
            debug: true,
            compatibility: 'ie8',
            processImport: false,
            inline: 'none'
        }, function(file) {
            console.log('[压缩CSS]' + file.name + ': [' + filesize(file.stats.originalSize) + ' >> ' + filesize(file.stats.minifiedSize) + ']');
        }))
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(function(file) {
            return file.base
        }))
        .pipe(count('[YMINI]此次共压缩 ## 个文件'));

}

gulp.task('default', YMINI_TASK);
gulp.task('smart', YMINI_TASK);
gulp.task('css', YMINI_TASK);
gulp.task('scripts', YMINI_TASK);