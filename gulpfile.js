var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-angular-htmlify': 'htmlify',
            'gulp-minify-html': 'minifyHTML',
            'gulp-strip-debug': 'stripDebug',
            'gulp-ng-annotate': 'ngAnnotate'
        }
    }),
    gulpBowerFiles = require('gulp-bower-files');

var scriptsGlob = ['app/app.js', 'app/*/*.js', '!app/*/*.min.js'],
    scriptsMinGlob = 'app/feed/*.min.js',
    cssGlob = ['theme/*.css', '!theme/*.min.css'],
    cssMinGlob = 'theme/*.min.css',
    htmlGlob = ['app/*/*.html', '!app/*/*.min.html'],
    htmlMinGlob = 'app/*/*.min.html';

var siteUrl = 'http://thepiggery.net/feedulator';

gulp.task('opt-images', function() {
    gulp.src(imgGlob)
        .pipe(plugins.plumber())
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/img/'))
        .pipe(plugins.webp())
        .pipe(gulp.dest('dist/img/webp'))
        .on('error', plugins.util.log)
});

gulp.task('clean-html', function() {
    gulp.src(htmlMinGlob, {
            read: false
        })
        .pipe(plugins.plumber())
        .pipe(plugins.rimraf())
        .on('error', plugins.util.log)
});

gulp.task('build-html', function() {
    gulp.src(htmlGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.cleanhtml())
        .pipe(plugins.prettify())
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
        .pipe(plugins.rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(plugins.htmlify())
        .pipe(plugins.minifyHTML())
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
        .on('error', plugins.util.log)
});

gulp.task('clean-css', function() {
    gulp.src(cssMinGlob, {
            read: false
        })
        .pipe(plugins.plumber())
        .pipe(plugins.rimraf())
        .on('error', plugins.util.log)
});

gulp.task('build-css', function() {
    gulp.src(cssGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.changed('dist/css/'))
        .pipe(plugins.concat('style.css'))
        .on('error', plugins.util.log)
});

gulp.task('post-process-styles', function() {
    gulp.src(cssGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.uncss({
            html: htmlGlob
        }))
        .pipe(plugins.colorguard())
        .pipe(plugins.prefix({
            cascade: true
        }))
        .pipe(plugins.cmq())
        .pipe(plugins.recess())
        .pipe(gulp.dest('dist/css/'))
        .pipe(plugins.csso())
        .pipe(plugins.rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(plugins.bless())
        .pipe(gulp.dest('dist/css/ie/'))
        .on('error', plugins.util.log)
});

gulp.task('clean-scripts', function() {
    gulp.src(scriptsMinGlob, {
            read: false
        })
        .pipe(plugins.plumber())
        .pipe(plugins.rimraf())
        .on('error', plugins.util.log)
})

gulp.task('build-scripts', function() {
    gulp.src(scriptsGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.jshint())
        // .pipe(plugins.sourcemaps.init())
        .pipe(plugins.stripDebug())
        .pipe(plugins.uglify())
        // .pipe(plugins.sourcemaps.write())
        .pipe(plugins.rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
        .on('error', plugins.util.log)
});

gulp.task('build-manifest', function() {
    gulp.src(['app/*', 'app/*/*', 'index.html'])
        .pipe(plugins.plumber())
        .pipe(plugins.manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest('.'))
        .on('error', plugins.util.log)
});

// gulp.task('test', function() {
//     gulp.src(testGlob)
//         .pipe(plugins.plumber())
//         .pipe(plugins.qunit())
//         .on('error', plugins.util.log)
// });

gulp.task('clean-docs', function() {
    gulp.src('docs/', {
            read: false
        })
        .pipe(plugins.plumber())
        .pipe(plugins.rimraf())
        .on('error', plugins.util.log)
});

gulp.task('build-docs', function() {
    gulp.src(scriptsGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.ngdocs.process({
            html5Mode: false,
            title: 'The Feedulator',
            titleLink: '/'
        }))
        .pipe(gulp.dest('docs/'))
        .on('error', plugins.util.log)
});
