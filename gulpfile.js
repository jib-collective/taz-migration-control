const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const merge = require('merge-stream');
const path = require('path');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const svgMin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

let API_HOST = 'http://localhost:8080';
let ENV = 'development';

if (process.env.ENV === 'production') {
  API_HOST = '';
  ENV = 'production';
}

gulp.task('fonts', () => {
  return gulp.src([
    'assets/fonts/**/*',
  ])
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('scripts', () => {
  return gulp.src('assets/scripts/common.js')
    .pipe(webpack({
      devtool: process.env.ENV === 'production' ? false : 'source-map',
      entry: './assets/scripts/common.js',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'babel',
            query: {
              presets: [
                'es2015',
              ],
              plugins: [
                'transform-runtime',
              ],
            },
          },
        ],
      },
      output: {
        filename: 'common.js',
      },
      resolveLoader: {
        root: path.resolve('./node_modules'),
      },
      resolve: {
        root: [
          path.resolve('./assets/scripts/'),
        ]
      }
    }))
    .pipe(replace('{{API_HOST}}', API_HOST))
    .pipe(replace('{{ENV}}', ENV))
    .pipe(gulpif(process.env.ENV === 'production', uglify()))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', () => {
  const fontAssets = gulp.src([
    './assets/styles/fonts.scss',
  ]);

  const staticAssets = gulp.src([
    './node_modules/sanitize.css/sanitize.css',
    './node_modules/leaflet/dist/leaflet.css',
    './node_modules/video.js/dist/video-js.css',
    './node_modules/c3/c3.css',
  ]);

  const sassAssets = gulp.src([
    './assets/styles/common.scss',
  ])
    .pipe(sass().on('error', sass.logError));

  fontAssets
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano({
      zindex: false,
      discardUnused: {
        fontFace: false,
      },
    }))
    .pipe(gulp.dest('./dist/styles/'));

  merge(staticAssets, sassAssets)
    .pipe(autoprefixer({
      browsers: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'Explorer >= 10',
        'last 1 Edge versions',
        'last 3 iOS versions',
        'last 2 Safari versions',
        'last 2 ChromeAndroid versions',
        'Android >= 4.1',
      ],
    }))
    .pipe(cssnano({
      zindex: false,
    }))
    .pipe(concat('common.css'))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('images', () => {
  return gulp.src('assets/images/*')
    .pipe(svgMin())
    .pipe(svgSprite({
      mode: {
        css: false,
        defs: {
          dest: '',
          sprite: './symbols.svg',
        },
        stack: false,
        symbol: false,
        view: false,
      }
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/scripts/**/*', ['scripts']);
  gulp.watch('./assets/styles/**/*', ['styles']);
  gulp.watch('./assets/images/**/*', ['images']);
});

gulp.task('default', [
  'fonts',
  'scripts',
  'styles',
  'images',
]);
