const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

gulp.task('sass', () => {
  return gulp.src("./src/**/*.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'));
});

gulp.task('start', () => {
  nodemon({
    script: 'server.js',
    ext: 'js html',
  })
});
