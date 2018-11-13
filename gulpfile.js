var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var inject = require('gulp-inject');
var args = minimist(process.argv.slice(2));

gulp.task('pack-js', function() {
  return gulp.src(['vendor/js/*.js', 'js/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(minify({ ext: { min: '.js' }, noSource: true }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('pack-css', function() {
  return gulp.src(['vendor/css/*.css', 'css/*.css'])
    .pipe(concat('stylesheet.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('pack-imgs', function() {
  return gulp.src(['images/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('pack-html', ['pack-js', 'pack-css'], function() {
  injectOptions = { addRootSlash: false, ignorePath: 'dist' };

  return gulp.src(['index.html'])
    .pipe(inject(gulp.src(['dist/css/*.css', 'dist/js/*.js'], { read: false }), injectOptions))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['pack-js', 'pack-css', 'pack-imgs', 'pack-html']);

gulp.task('deploy', ['build'], function() {
  var remotePath = '/public_html/it/';
  var conn = ftp.create({
    host: 'c0310458.ferozo.com',
    user: args.user,
    password: args.password,
    log: gutil.log
  });

  gulp.src(['**'], { base: './dist', cwd: './dist', buffer: false })
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});
