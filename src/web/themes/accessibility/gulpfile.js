const gulp = require("gulp");
const livereload = require("gulp-livereload");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const pngquant = require("imagemin-pngquant");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const sass = require('gulp-sass')(require('sass'));

// https://github.com/imagemin/imagemin/issues/392#issuecomment-916160758
gulp.task("imagemin", async function () {
  const imagemin = (await import("gulp-imagemin")).default;
  return gulp
    .src("./src/images/*")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
      })
    )
    .pipe(gulp.dest("./images"));
});

gulp.task("sass", function () {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 version"))
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("./css"));
});

gulp.task("js", function () {
  return gulp
    .src(["node_modules/babel-polyfill/dist/polyfill.js", "./src/js/*.js"])
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./js/"));
});

gulp.task("watch", function () {
  livereload.listen();

  gulp.watch("./src/sass/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch(["./css/style.css", "./**/*.html.twig", "./js/*.js"], function (
    files
  ) {
    livereload.changed(files);
  });
});
