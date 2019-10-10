const postcss = require('gulp-postcss');
const gulp = require('gulp');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindCss = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('gulp-purgecss');

const css = () => {
  return gulp.src(['../src/homepage/home.css', '../src/imposter/imposter.css', '../src/survive/survive.css'])
    .pipe(postcss([
      tailwindCss,
      postcssPresetEnv,
      cssnano
    ]))
    .pipe(purgecss({
      content: [
        '../src/homepage/home.html',
        '../src/imposter/imposter.html',
        '../src/survive/survive.html',
        '../src/**/*.jsx',
        '../src/**/*.js',
      ],
      css: [
        '../src/homepage/home.css',
        '../src/imposter/imposter.css',
        '../src/survive/survive.css'
      ]
    }))
    .pipe(gulp.dest('../dist'));
};

exports.default = css;