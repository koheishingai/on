var gulp = require('gulp');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var server = require('gulp-express');

// gulp.task('default', ['jade', 'compile-coffee', 'compile-sass']);
gulp.task('default', ['compile-coffee', 'compile-sass', 'server']);

// gulp.watch(['./*.jade'], ['jade']);
gulp.watch(['./public/dev/scripts/*.coffee'], ['compile-coffee']);
gulp.watch(['./public/dev/styles/*.sass'], ['compile-sass']);

/* gulp.task('jade', function() {
    return gulp.src('./*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./'));
}); */

gulp.task('compile-coffee', function() {
  return gulp.src('./public/dev/scripts/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('compile-sass', function() {
  return gulp.src('./public/dev/styles/*.sass')
  .pipe(sass())
  .pipe(gulp.dest('./public/styles'));
});

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);
});