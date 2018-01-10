// Define some plugins!
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
var sasslint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var render = require('gulp-nunjucks-render');

var paths = {
    css: ['./*.css', '!*.min.css'],
    sass: './styles/**/*.scss',
    njk: ['*.+(njk)', './partials/**/*.+(njk)']
};
// Compile nunjucks
gulp.task('nunjucks', function () {
    return gulp.src('*.+(njk)')
        .pipe(render({
            path: ['./']
        }))
        .pipe(gulp.dest('./'))
});
// Transform SCSS to CSS
gulp.task('sass', function () {
    return gulp.src('./styles/*.scss') // Create a stream in the directory where our Sass files are located.
        .pipe(sass())                    // Compile Sass into style.css.
        .pipe(gulp.dest('./styles/'));
});
// Minify CSS
gulp.task('cssnano', ['sass'], function () {
    return gulp.src('./styles/index.css')  // Grab style.css and add it to the stream.
    .pipe(cssnano())               // Minify and optimize style.css
    .pipe(gulp.dest('./styles/'));        // Write style.css to the project's root directory.
});
// Lint SCSS
gulp.task('sass:lint', ['cssnano'], function () {
    gulp.src([
        'styles/**/*.scss',
        '!styles/base/_normalize.scss',
        '!styles/utilities/animate/**/*.*',
        '!styles/base/_sprites.scss'
    ])
        .pipe(sasslint())
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError());
});
// Simply watch the SCSS
gulp.task('watch', function () {
    gulp.watch('./styles/*/*.scss', ['sass:lint']);
});
// Reload Browser
gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: true,
        server: {
            baseDir: './'
        }
    });
});
// Watch the SCSS and reload the browser
gulp.task('watchReload', ['browser-sync'], function () {
    gulp.watch(paths.sass, ['sass:lint', browserSync.reload]);
    gulp.watch(paths.njk, ['nunjucks', browserSync.reload]);
});
