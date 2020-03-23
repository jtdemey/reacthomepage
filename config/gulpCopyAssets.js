const gulp = require('gulp');
const path = require('path');

const copyLib = () => {
  return gulp.src(path.join(process.cwd(), '..', 'src', 'lib', '**'))
    .pipe(gulp.dest(path.join('..', 'dist', 'public', 'lib')));
};

const copyMedia = () => {
  return gulp.src(path.join(process.cwd(), '..', 'src', 'media', '**'))
    .pipe(gulp.dest(path.join('..', 'dist', 'public', 'media')));
};

const copyErrPages = () => {
  return gulp.src(path.join(process.cwd(), '..', 'src', 'errors', '**'))
    .pipe(gulp.dest(path.join('..', 'dist', 'public')));
};

exports.default = gulp.series(copyMedia, copyLib, copyErrPages);