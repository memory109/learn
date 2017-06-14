# gulp API以及常用插件
一、重要API
	1.gulp.src(path, {options})
		1.1 src方法是指定需要处理的源文件的路径，gulp.src返回当前文件流至可用插件
		1.2 path：需要处理的源文件路径，必填
			通配符路径匹配：
				"src/main.js"：指定具体文件
				"*"：匹配所有文件夹（src/*.js src下的所有js文件）
				"**"：匹配0个或者多个子文件夹 （src/**/*.js 包含src的0个或多个子文件夹下的js文件）
				"{}"：匹配多个属性（src/{x,y}*.js 包含s.js和y.js；src/*.{jpg,png,gif} src下的所有jpg/png/gif文件）
				"!"：排除文件（！src/main.js 不包括src下的a.js文件）
		1.3 options：类型（可选），有3个属性buffer、read、base
				buffer：类型Boolean，默认true，设置为false将返回file.content的流并且不缓冲文件，处理大文件时非常重要
				read：类型Boolean，默认true，设置为false将不执行读取文件操作，返回null
				base：类型String，设置输出路径以某个路径的某个组成部分为基础向后拼接
	2.gulp.dest(path,[options])
		2.1 指定处理完后文件输出的路径
		2.2 path：指定文件输出路径或者定义函数返回文件输出路径亦可，必填
		2.3 options：；类型（可选），有2个属性cwd、mode
				cwd：类型String，默认process.cwd()前脚本的工作目录的路径 （当文件输出路径为相对路径将会用到）
				mode：类型String，默认0777 指定被创建文件夹的权限
	3.gulp.task(name,[deps],fn)
		3.1 task定义一个gulp任务
		3.2 name 指定任务的名称 必填
		3.2 deps 该任务依赖的任务（被依赖的任务需要返回当前任务的事件流） 可选
		3.3 fn 该任务调用的插件操作 必填
	4.gulp.watch(path,opts,tasks/fn)
		4.1 watch方法是用于监听文件变化，文件一修改就会执行指定的任务
		4.2 path 需要处理的源文件匹配符路径 必填
		4.3 opts 为一个可选的配置对象 通常不需要用到
		4.4 tasks 需要执行的任务的名称数组 必填
		4.5 fn 每个文件变化执行的回调函数 可选
二、常用插件
	1.gulp-uglify（JS压缩）
		1.1 安装 npm install gulp-uglify --save-dev
		1.2 配置gulpfile.js
			var gulp = require('gulp'),
				uglify = require('gulp-uglify');
			gulp.task('pressJS', function () {
			    gulp.src('src/js/test.js')
				gulp.src(['src/js/test.js','src/js/index.js']) //多个文件
				gulp.src(['src/js/*.js','！src/lib/index.js']) //通配符匹配文件
				gulp.src(['src/js/*.js','！src/lib/index.js']) //通配符匹配文件
			        .pipe(uglify())
			        .pipe(uglify({
			        	mangle:{
			        	expect:['require','exports',;$]/排除混淆关键字

			        }
			        }))
			        .pipe(uglify({
			        	mangle: true,//类型：Boolean 默认：true 是否修改变量名
            			compress: true,//类型：Boolean 默认：true 是否完全压缩
            			preserveComments: 'all' //保留所有注释
			        }
			        }))
			        .pipe(gulp.dest('build/js'));
				});
	2.gulp-clean-css(CSS压缩)
		2.1 安装 npm install gulp-clean-css --save-dev
		2.2 配置gulpfile.js
			var gulp = require('gulp'),
				cleanCss = require('gulp-clean-css');
    			rev = require('gulp-rev')
			gulp.task('pressCSS', function () {
			    gulp.src('src/css/test.css')
				gulp.src(['src/css/test.css','src/css/index.css']) //多个文件
				gulp.src(['src/css/*.css','！src/lib/index.css']) //通配符匹配文件
				gulp.src(['src/css/*.css','！src/lib/index.css']) //通配符匹配文件
			        .pipe(cssmin())
			        .pipe(cssmin({
			        	advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            			compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            			keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            			keepSpecialComments: '*' //保留所有特殊前缀当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
			        }))
			        .pipe(cssmin({
			        	mangle: true,//类型：Boolean 默认：true 是否修改变量名
            			compress: true,//类型：Boolean 默认：true 是否完全压缩
            			preserveComments: 'all' //保留所有注释
			        }
			        }))
			        .pipe(rev()) //给css文件里引用文件加版本号（文件MD5）
			        .pipe(gulp.dest('build/css'));
				});