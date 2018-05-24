'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint   = require('stylelint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var sassSrc = './src/sass/**/*.scss';
var cssDst = './dist/css/';
var jsSrc = './src/js/**/*.js';
var imgSrc = './src/images/**/*';
var imgDst = './dist/images';
var jsDst = './dist/js';
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

//gulp sourcemap/autoprefix/minify/sass-to-css tasks
gulp.task('workflow', function () {
    gulp.src(sassSrc)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(cssDst));
});


//gulp stylelint task
gulp.task("scss-lint", function() {

    // Stylelint config rules
    var stylelintConfig = {
        "rules": {
            "block-no-empty": true,
            "color-no-invalid-hex": true,
            "function-comma-space-after": "always",
            "max-empty-lines": 2,
            "number-leading-zero": "never",
            "number-no-trailing-zeros": true,
            "property-no-vendor-prefix": true,
            "string-quotes": "single",
            "value-no-vendor-prefix": true
        }
    };

    var processors = [
        stylelint(stylelintConfig),
        reporter({
            clearMessages: true
        })
    ];

    return gulp.src(
        [sassSrc]
    )
        .pipe(postcss(processors, {syntax: syntax_scss}));
});


//not int the watcher. call with "gulp images"
gulp.task('images', function () {

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

//creating Browser compatible ES5 from ES6
gulp.task('babel', function () {
    return gulp.src(jsSrc)
        .pipe(gulp.dest(jsDst));
});


//gulp eslint task
gulp.task('eslint', function () {
    return gulp.src(jsSrc)
        .pipe(eslint({
            'rules': {
                'quotes' : [1, 'single'],
                'semi': [1, 'always']
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


//clean the dist folder
gulp.task('cleanDst', function () {
   return gulp.src('./dist', {read: false})
       .pipe(clean());
});

//build the dist folder
gulp.task('build', function (callback) {
    console.log('Build project...');
    runSequence('cleanDst', ['workflow', 'scss-lint', 'eslint', 'babel', 'images'],
        callback
    );
});


//watcher on save
gulp.task('default', function () {
    gulp.watch(sassSrc, ['workflow', 'scss-lint']);
    gulp.watch(jsSrc, ['eslint', 'babel']);
    gulp.watch(imgSrc, ['images']);
});
