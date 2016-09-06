'use strict';

var path = require('path');
var fs = require('fs');
var gulp = require('gulp-help')(require('gulp'), { hideDepsMessage: true });
var args = require('yargs').argv;
var through = require('through2');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')({
    pattern: [
        'gulp-*', 'gulp.*',
        'main-bower-files',
        'uglify-save-license',
        'del',
        'merge-stream', 
        'run-sequence'
    ]
});

//////////////////////////////////////////////////////////
// Configuration

var isVerbose = args.verbose;    // Enable extra verbose logging
var isProduction = args.prod;   // Run extra steps (minification) with production flag --prod
var applicationModule = 'app';  // name of your appmodule
var paths = {
    clientSrc: 'app/',
    clientBuild: 'public/',
    tmp: '.tmp'
};
var jsLoadOrder = [
    '**/app.module.js',
    '**/*.module.js',
    '**/*Base*.js',
    '**/*.js'
];

var tsLintPaths = [
    path.join(paths.clientSrc, '/**/*.ts')
];

//////////////////////////////////////////////////////////
// Tuning

process.setMaxListeners(0);      // Disable max listeners for gulp

// Workaround for nodemon exit issue:
// https://github.com/JacksonGariety/gulp-nodemon/issues/33
function exitHandler() {
    process.exit(0);
}
process.once('SIGINT', exitHandler);


/////////////////////////////////////////////////////////
// Gulp Tasks

/**
 * Clean temporary folders and files
 */
gulp.task('clean', false, function (next) {
    $.del([paths.tmp, paths.clientBuild + '**/*.*'])
        .then(function () {
            next();
        });
});

/**
 * Create $templateCache from the html templates
 */
gulp.task('partials', false, function () {
    return gulp
        .src(path.join(paths.clientSrc, '/**/*.html'))
        .pipe($.cached('partials'))
        .pipe(verbosePrintFiles('partials'))
        .pipe($.if(isProduction, $.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        })))
        .pipe($.remember('partials'))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: applicationModule,
            root: paths.clientSrc,
            standalone: false
        }))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/js/')));
});


/**
 * JS Bundles (vendor and app)
 */
gulp.task('vendor-scripts', false, function () {
    var stream = gulp
        .src($.mainBowerFiles())
        .pipe($.filter('**/*.js'))
        .pipe(verbosePrintFiles('vendor-scripts'));

    return scriptProcessing(stream, 'vendor.js');
});

gulp.task('app-scripts', false, function () {
    var tsProject = $.typescript.createProject('tsconfig.json');
    var stream = gulp
        .src([path.join(paths.clientSrc, '/**/*.ts'), 'typings/index.d.ts', 'typings_custom/custom.d.ts'])
        .pipe($.typescript(tsProject))
        .pipe($.cached('app-scripts'))
        .pipe($.ngAnnotate({ add: true, single_quotes: true }))
        .pipe($.remember('app-scripts'))
        .pipe($.order(jsLoadOrder)) // *Important*: Must come after $.remember to preserve order
        .pipe(verbosePrintFiles('app-scripts'));

    return scriptProcessing(stream, 'app.js');
});

function scriptProcessing(stream, bundleFile) {
    return stream
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.concat(bundleFile))
        .pipe($.if(isProduction, $.uglify({ preserveComments: $.uglifySaveLicense })))
        .on('error', errorHandler('uglify'))
        .pipe($.if(!isProduction, $.sourcemaps.write('maps')))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/js/')));
}


gulp.task('tslint', false, function () {
    return gulp
        .src(tsLintPaths)
        .pipe(verbosePrintFiles('lint'))
        .pipe($.tslint({formatter: 'verbose'}));
});


gulp.task('analyze', 'Static TypeScript code analysis (linting)', function (next) {
    $.runSequence('tslint', next);
});

/**
 * CSS bundles (vendor and app)
 */
gulp.task('vendor-styles', false, function () {
    return gulp
        .src($.mainBowerFiles())
        .pipe($.filter('**/*.css'))
        .pipe($.importCss())
        .pipe(verbosePrintFiles('vendor-styles'))
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/css/')));
});

gulp.task('app-styles', false, function () {
    return gulp
        .src(path.join(paths.clientSrc, '/**/*.scss'))
        .pipe(verbosePrintFiles('app-styles'))
        .pipe($.sass({ includePaths: [path.join(paths.clientSrc, '_global'), './node_modules/minx/'] }).on('error', $.sass.logError))
        .pipe($.cached('app-styles'))
        .pipe($.remember('app-styles'))
        .pipe($.concat('app.css'))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/css/')));
});

/**
 * Vendor fonts
 */
gulp.task('vendor-fonts', false, function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
        .pipe(verbosePrintFiles('vendor-fonts'))
        .pipe($.flatten({ includeParents: 2 }))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/fonts/')));
});

/**
 * Static files copy
 */
gulp.task('static', false, function () {
    return gulp.src(path.join(paths.clientSrc, '/static/**/*.*'))
        .pipe(verbosePrintFiles('static'))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/')));
});


gulp.task('index.html', false, function(){
    return gulp.src(path.join(paths.clientSrc, 'index.html'))
        .pipe(verbosePrintFiles('index.html'))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/')));
})
/**
 * config files copy
 */
gulp.task('config', false, function () {
    return gulp.src(path.join(paths.clientSrc, '**/*.xml'))
        .pipe(verbosePrintFiles('config'))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/')));
});

/**
 * HTML processing
 */
gulp.task('html', false, function () {
    return gulp.src(path.join(paths.clientSrc, '/*.html'))
        .pipe(verbosePrintFiles('html'))
        .pipe($.if(isProduction, $.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        })))
        .pipe(gulp.dest(path.join(paths.clientBuild, '/')));
});


/**
 * Cache-bust asset files
 */
gulp.task('cachebust', false, [
    'index.html', 'partials', 'vendor-scripts', 'app-scripts',
    'vendor-styles', 'app-styles',
    'vendor-fonts', 'static', 'html', 'config'
], function () {
    if (!isProduction) {
        return;
    }

    // Files to rename and cache bust
    var revFilter = $.filter([
        '**', '!**/*.html', '!**/favicon.ico', '!**/browserconfig.xml', '!**/*.map'
    ], { restore: true });

    return gulp
        .src(path.join(paths.clientBuild, '/**'))
        .pipe(revFilter)
        .pipe($.rev())
        .pipe(revFilter.restore)
        .pipe($.revReplace({ replaceInExtensions: ['.js', '.css', '.html', '.xml'] }))
        .pipe(gulp.dest(paths.clientBuild))
        .pipe(cleanupRevedFiles())
        .pipe($.rev.manifest())
        .pipe(gulp.dest(paths.clientBuild));
});

gulp.task('build', false, function (next) {
    $.runSequence('clean', 'cachebust', next);
});


function startBrowserSync(serverPort, next) {
    if (browserSync.active) {
        browserSync.reload();
        return next();
    }

    var browserSyncPort = 3000;
    $.util.log('Starting browser-sync on port', browserSyncPort);

    var options = {
        files: [path.join(paths.clientBuild, '/**')],
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'BrowserSync',
        notify: true,
        minify: false,
        reloadDelay: 1000,
        browser: [process.env['BROWSERSYNC_BROWSER'] || 'google chrome'],
        open: false
    };
    browserSync.init(options, next);
}

/**
 * Watch for file changes and rebuild
 */
gulp.task('watch', false, ['build'], function () {
    gulp.watch(tsLintPaths.concat('tslint.json'), ['tslint'])
        .on('change', onWatchChange);
    gulp.watch(path.join(paths.clientSrc, '**/*.ts'), ['app-scripts'])
        .on('change', onWatchChange);
    gulp.watch(path.join(paths.clientSrc, '**/*.scss'), ['app-styles'])
        .on('change', onWatchChange);
    gulp.watch(path.join(paths.clientSrc, '**/*.html'), ['partials'])
        .on('change', onWatchChange);
    gulp.watch(path.join(paths.clientSrc, '*.html'), ['html'])
        .on('change', onWatchChange);
    gulp.watch(path.join(paths.clientSrc, '*.xml'), ['config'])
        .on('change', onWatchChange);
});

gulp.task('electron-files', false, function () {
    gulp.src('electron/**/*.*')
        .pipe(gulp.dest(paths.clientBuild));
});

gulp.task('cordova-files', false, function () {
    gulp.src('cordova/**/*.*')
        .pipe(gulp.dest(paths.clientBuild));
});
/**
 * Development watch and serve
 */
gulp.task('dev', 'Development mode: watch for changes, rebuild', function (next) {
    startBrowserSync();
    $.runSequence('watch', next);
});

/**
 * Default task: clean temporary directories
 * and launch the main build task
 */
gulp.task('default', 'Performs a clean production build for deployment', function (next) {
    $.runSequence('build', next);
}, {
    options: {
        'verbose': 'Verbose debug logging'
    }
});

//////////////////////////////////////////////////////////
// Utility functions

function errorHandler(taskName, options) {
    options = options || {};
    return function (err) {
        $.util.log($.util.colors.red('[' + taskName + ']'), err.toString());
        if (options.exit) {
            process.exit(1);
        } else {
            this.emit('end');
        }
    };
}

function verbosePrintFiles(taskName) {
    return $.if(isVerbose, $.print(function (filepath) {
        return '[' + taskName + '] ' + filepath;
    }));
}

function cleanupRevedFiles() {
    return through.obj(function (file, enc, next) {
        this.push(file);
        if (!file.revOrigPath) {
            return next();
        }
        fs.unlink(file.revOrigPath, function (err) {
            next();
        });
    });
}

function onWatchChange(event) {
    isVerbose && $.util.log('Watch', event.type, path.relative(process.cwd(), event.path));
}