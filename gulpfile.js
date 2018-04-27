const gulp = require('gulp');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const pump = require('pump');

/*  -----------------------  */

/* BABEL TASKS  */


/*  These compily the server controllers from ES6 to ES5 and puts the relevant
    files in the lib/server-controllers/ */
gulp.task('babelify-server-controllers', () => {
  return gulp.src('src/server-controllers/**/*.js').pipe(babel({
    presets: ['es2015'],
  })).pipe(gulp.dest('lib/server-controllers/'));
});

/*  These compily the routes from ES6 to ES5 and puts the relevant
    files in the lib/routes/ */
gulp.task('babelify-routes', () => {
  return gulp.src('src/routes/**/*.js').pipe(babel({
    presets: ['es2015'],
  })).pipe(gulp.dest('lib/routes/'));
});


/*  -----------------------  */

/* IMAGE COMPRESSION TASKS  */

/*  This taks compresses all images from the src directory into the lib directory.
    If no compression is possible it simply copies the file from src to lib.*/
gulp.task('compress-image', () => {
  return gulp.src('./src/public/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('lib/public/images/'));
});

/*  -----------------------  */

/* Minify Tasks TASK */

/*  The purpose of this task is to minify any vendor JavaScript code that the
    project uses. */
gulp.task('minify-js-vendor', () => {
  pump([
    gulp.src('src/public/vendor/**/*.js'),
    uglify(),
    gulp.dest('lib/public/vendor'),
  ]);
});

/*  The purpose of this task is to minify CSS code that the project uses. */
gulp.task('minify-css-vendor', () => {
  return gulp.src('src/public/vendor/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(gulp.dest('lib/public/vendor'));
});

/*  The purpose of this task is to minify any user-built JavaScript code that the
    project uses. */
gulp.task('babelify-js', () => {
  return gulp.src('src/public/javascripts/*.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('lib/public/javascripts'));
});

/*  The purpose of this task is to minify any user-built Stylesheets that the
    project uses. */
gulp.task('minify-css', () => {
  return gulp.src('src/public/stylesheets/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(gulp.dest('lib/public/stylesheets'));
});

/*  The purpose of this task is to copy any user-built templates that the
project uses. */
gulp.task('copy-html', () => {
  return gulp.src('src/public/templates/*.html')
    .pipe(gulp.dest('lib/public/templates'));
});

/* DEFAULT TASK */

/*  This is the default task and watches any folder / file which changes.
    The structure goes: ([Folders / Files to Watch], [Gulp Task]) */
gulp.task('watch', () => {
  gulp.watch(['./src/server-controllers/**/*.js'], ['babelify-server-controllers']);
  gulp.watch(['./src/routes/**/*.js'], ['babelify-routes']);
  gulp.watch(['./src/public/images/**/*'], ['compress-image']);
  gulp.watch(['./src/public/vendor/**/*.js'], ['minify-js-vendor']);
  gulp.watch(['./src/public/vendor/**/*.css'], ['minify-css-vendor']);
  gulp.watch(['./src/public/javascripts/*.js'], ['babelify-js']);
  gulp.watch(['./src/public/stylesheets/*.css'], ['minify-css']);
  gulp.watch(['./src/public/templates/*.html'], ['copy-html']);
});

/*  -----------------------  */

/* START TASK */

// Make my default task to watch both folders
gulp.task('default', ['watch', 'babelify-server-controllers', 'babelify-routes', 'compress-image', 'minify-js-vendor', 'minify-css-vendor', 'babelify-js', 'minify-css', 'copy-html']);

/*  -----------------------  */
