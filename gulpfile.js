var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function(cb) {
    console.log('执行js压缩');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    var _progressJsPash;
    // 如果是目录
    if((_progressPash).lastIndexOf('.js') > -1){
    	 _progressJsPash = _progressPash;
    }else{
    	_progressJsPash = _progressPash+ '/**/*.js';
    }
    pump([
            gulp.src(_progressJsPash),
            uglify(),
            gulp.dest(function(file){
            	return file.base
            })
        ],
        cb
    );
});


gulp.task('css', function(cb) {
    console.log('执行css压缩');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    var _progressCssPash = _progressPash + '/**/*.css';
    var _progressJsPash;

    // 如果是目录
    if((_progressPash).lastIndexOf('.css') > -1){
    	 _progressJsPash = _progressPash;
    }else{
    	_progressJsPash = _progressPash+ '/**/*.css';
    }
    pump([
            gulp.src(_progressJsPash),
            cleanCSS({ compatibility: 'ie8' }),
            gulp.dest(function(file){
            	return file.base
            })
        ],
        cb
    );
});