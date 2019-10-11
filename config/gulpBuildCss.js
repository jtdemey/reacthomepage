const fs = require('fs');
const path = require('path');
const postcss = require('gulp-postcss');
const gulp = require('gulp');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindCss = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

let hash = null;

const strCopy = str => {
  const sp = str.split('');
  return sp.join('');
};

const getHash = cb => {
  const text = fs.readFileSync(path.join(process.cwd(), '..', 'dist', 'public', 'home.html'), 'utf8');
  const i = text.indexOf('src="/homeBundle');
  hash = text.substring(i + 17, i + 25);
  console.log('setting hash as ' + hash);
  cb();
};

const buildCss = () => {
  const h = strCopy(hash);
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
        `../src/homepage/home.${hash}.css`,
        `../src/imposter/imposter.${hash}.css`,
        `../src/survive/survive.${hash}.css`
      ]
    }))
    .pipe(rename(p => {
      p.basename = p.basename + '.' + h;
    }))
    .pipe(gulp.dest(path.join('..', 'dist', 'public')));
};

const replaceHrefs = () => {
  return gulp.src(['../dist/public/home.html', '../dist/public/imposter.html', '../dist/public/survive.html'])
    .pipe(replace('/homepage/home.css', `home.${hash}.css`))
    .pipe(replace('/imposter/imposter.css', `imposter.${hash}.css`))
    .pipe(replace('/survive/survive.css', `survive.${hash}.css`))
    .pipe(gulp.dest(path.join('..', 'dist', 'public')));
};

exports.default = gulp.series(getHash, buildCss, replaceHrefs);