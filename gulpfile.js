const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const merge = require('merge-stream');
const path = require('path');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

gulp.task('fonts', () => {
  return gulp.src([
    'assets/fonts/**/*',
  ])
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('scripts', () => {
  return gulp.src('assets/scripts/common.js')
    .pipe(webpack({
      devtool: 'source-map',
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
    //.pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', () => {
  const fontAssets = gulp.src([
    './assets/styles/fonts.scss',
  ]);

  const staticAssets = gulp.src([
    './node_modules/sanitize.css/sanitize.css',
    './node_modules/leaflet/dist/leaflet.css',
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
    .pipe(autoprefixer())
    .pipe(cssnano({
      zindex: false,
    }))
    .pipe(concat('common.css'))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/scripts/**/*', ['scripts']);
  gulp.watch('./assets/styles/**/*', ['styles']);
});

gulp.task('default', [
  'fonts',
  'scripts',
  'styles',
]);
