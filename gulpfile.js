var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function(cb) {
    console.log('执行js压缩');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    var _progressJsPash = _progressPash + '/**/*.js'
    console.log(_progressPash);
    pump([
            gulp.src(_progressJsPash),
            uglify(),
            gulp.dest(_progressPash)
        ],
        cb
    );
});


gulp.task('css', function(cb) {
    console.log('执行css压缩');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    var _progressCssPash = _progressPash + '/**/*.css'
    return gulp.src(_progressCssPash)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(_progressPash));
});
