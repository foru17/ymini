var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var filesize = require('filesize');

gulp.task('scripts', function(cb) {
    console.log('执行js压缩');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    var _progressJsPash;
    // 如果是目录
    if ((_progressPash).lastIndexOf('.js') > -1) {
        _progressJsPash = _progressPash;
    } else {
        _progressJsPash = _progressPash + '/**/*.js';
    }
    pump([
            gulp.src(_progressJsPash),
            uglify({
                mangle: {
                    except: ['define', 'require', 'module', 'exports'],
                },
                output:{
                    keep_quoted_props:true
                }

            }).on('error',function(e){
                console.log('出错了')
                console.log('[JS文件异常]' + e)
            }),
            gulp.dest(function(file) {
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
    if ((_progressPash).lastIndexOf('.css') > -1) {
        _progressJsPash = _progressPash;
    } else {
        _progressJsPash = _progressPash + '/**/*.css';
    }
    pump([
            gulp.src(_progressJsPash),
            cleanCSS({
                debug:true,
                compatibility: 'ie8',
                processImport: false,
                inline:'none'
            }, function(file) {
                console.log('[压缩CSS]' + file.name + ': [' + filesize(file.stats.originalSize) + ' >> ' + filesize(file.stats.minifiedSize) + ']');
            }),
            gulp.dest(function(file) {
                return file.base
            })

        ],
        cb
    );
});