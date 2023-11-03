"use strict";

// Modules
var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    pug = require("gulp-pug"),
    sass = require("gulp-sass");

var app = "app/",
    dist = "dist";
var config = {
  app: {
    html: app + "pug/index.pug",
    style: app + "css/style.scss",
    js: app + "js/main.js",
    img: app + "img/**/*.*",
    fonts: app + "fonts/*.*"
  },
  dist: {
    html: dist,
    style: dist + "css/",
    js: dist + "js/",
    img: dist + "img/",
    fonts: dist + "fonts"
  },
  watch: {
    html: app + "pug/**/*.pug",
    style: app + "css/**/*.scss",
    js: app + "js/**/*.js",
    img: app + "img/**/*.*",
    fonts: app + "fonts/*.*"
  }
};

var webServer = function webServer() {
  browserSync.init({
    server: {
      baseDir: dist
    },
    port: 9000,
    host: "localhost",
    notify: false
  });
};

var pugTask = function pugTask() {
  return gulp.src(config.app.html).pipe(pug()).pipe(pug({
    pretty: false
  })).pipe(gulp.dest(config.dist.html)).pipe(browserSync.reload({
    stream: true
  }));
};

var scssTask = function scssTask() {
  return gulp.src(config.app.style).pipe(sass().on("error", sass.logError)).pipe(gulp.dest(config.dist.style)).pipe(browserSync.reload({
    stream: true
  }));
};

var watchFiles = function watchFiles() {
  gulp.watch([config.watch.html], gulp.series(pugTask));
  gulp.watch([config.watch.style], gulp.series(scssTask));
};

var start = gulp.series(pugTask, scssTask);
exports["default"] = gulp.parallel(start, watchFiles, webServer);