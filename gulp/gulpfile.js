//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    map = require("map-stream"),
    pathModule = require('path'),
    colors = require('colors');

//定义一个compressJs任务（自定义任务名称）
gulp.task('compressJs', function() {   
    var js = 'build';
    return gulp.src('src/js/*.js') 
        .pipe(concat('app.debug.js'))
        // 压缩js
        .pipe(uglify())
        // 重命名：文件名加MD5后缀
        .pipe(rev())
        .pipe(gulp.dest(js))
        // 将原文件与重命名后的新文件的对应关系记录下来
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
}); 
gulp.task('compressCss', function() {
    var css = 'build';
    return gulp.src('src/css/*.css')
        .pipe(concat('index.min.css'))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(css))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});
//将lib目录下的第三方文件拷贝到build目录
gulp.task('copyLib', function() {
    return gulp.src(['src/lib/*.js'])
        .pipe(gulp.dest('build/lib'))
});

gulp.task('copyOther', ['copyLib'], function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('clear', function() {
    return gulp.src('build')
        .pipe(clean());
});

//定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
gulp.task('default', ['clear'], function() {
    // runSequence保证任务顺序执行
    runSequence(['compressJs', 'compressCss', 'copyOther']);
});
