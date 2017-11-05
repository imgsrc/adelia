var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),

    postcss = require('gulp-postcss'),
    fonts = require('postcss-font-magician'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    pxtorem = require('postcss-pxtorem'),
    mqpacker = require('css-mqpacker'),
    focus = require('postcss-focus'),
    sortCSSmq = require('sort-css-media-queries'),

    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    ftp = require('vinyl-ftp'),
    fs = require('fs'),
    notify = require("gulp-notify");


gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js'
  ])
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest('app/js'))
      .pipe(uglify())
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('postcss', function () {
  const processor = ([
    autoprefixer({browsers: ['last 7 version']}),
    fonts(),
    focus(),
    pxtorem({
      rootValue: 13,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'padding', 'margin'],
      selectorBlackList: ['body', 'html'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 6
    }),
    mqpacker({
      sort: sortCSSmq.desktopFirst
    }),
    cssnano({
      "zindex": false
    })
  ]);
  return gulp.src('app/sass/*.sass')
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", notify.onError()))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(postcss(processor))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('watch', ['postcss', 'scripts', 'browser-sync'], function () {
  gulp.watch('app/sass/**/*.sass', ['postcss']);
  gulp.watch('app/js/*.js', ['scripts']);
  gulp.watch('app/*.html', browserSync.reload);
});


gulp.task('imagemin', function () {
  return gulp.src('app/img/**/*')
      .pipe(cache(imagemin()))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'postcss', 'scripts'], function () {

  var buildFiles = gulp.src([
    'app/*.html',
    'app/.htaccess',
    'app/mail.php'
  ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'app/css/main.min.css'
  ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/scripts.min.js'
  ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
    'app/fonts/**/*']
  ).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function () {

  var conn = ftp.create({
    host: '',
    user: '',
    password: '',
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'dist/**',
    'dist/.htaccess'
  ];
  return gulp.src(globs, {buffer: false})
      .pipe(conn.dest('./avia'));

});

gulp.task('removedist', function () {
  return del.sync('dist');
});
gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);