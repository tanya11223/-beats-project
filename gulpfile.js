const { src, dest, task, series, watch, parallel} = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-dart-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH} = require('./gulp.config'); 

sass.compiler = require('node-sass');

task( 'clean', () => {
  return src( `${DIST_PATH}/**/*`, { read: false })
    .pipe( rm() );
});

task ("copy:html",  () => {
  return src(`${SRC_PATH}/*.html`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task ("copy:img",  () => {
  return src(`${SRC_PATH}/img/**/*.*`)
  .pipe(dest(`${DIST_PATH}/img`));
});

task ("copy:sprite",  () => {
  return src(`${SRC_PATH}/sprite.svg`)
  .pipe(dest(`${DIST_PATH}`));
});

task ("copy:video",  () => {
  return src(`${SRC_PATH}/video/**/*.*`).pipe(dest(`${DIST_PATH}/video`));
});

task ("sass", () => {
  return src(`${SRC_PATH}/styles/main.scss`)
  .pipe(sass().on("error", sass.logError))
  .pipe(dest(SRC_PATH));
});

task('styles', () => {
  return src([
    "node_modules/normalize.css/normalize.css",
    `${SRC_PATH}/main.css`,
  ])
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(concat("main.min.css")) 
    .pipe(sassGlob())  
    .pipe(sass().on("error", sass.logError))
    //.pipe(px2rem())
    .pipe(gulpif(env== 'dev', autoprefixer({
			cascade: false
		}))
      )
    .pipe(gulpif(env == 'prod', gcmq()))
    .pipe(gulpif(env == 'prod', cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(env == 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({stream:true}));
    
});

task('scripts', () => {
   return src(`${SRC_PATH}/js/*.js`)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(gulpif(env == 'prod',babel({
      presets: ['@babel/env']
  })))
    .pipe(gulpif(env == 'dev',uglify()))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream:true}));
});

task("icons", () => {
  return src(`${SRC_PATH}/img/SVG/*.svg`)
  .pipe(svgo({
    plugins: [
      {
       removeAttrs: {
        attrc: "(fill|stroke|style|width|height|data.*)"
       }
    }
  ]
  })
  )
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: "./sprite.svg"
      }
    }
  }))
  .pipe(dest(`${DIST_PATH}/images/svg`));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: `${DIST_PATH}`
      },
      open: false 
  });
});


task('watch', () => {
  watch(`${SRC_PATH}/styles/**/*.scss`, series("sass", "styles"));
  watch(`${SRC_PATH}/*.html`,series("copy:html"));
  watch(`${SRC_PATH}/js/*.js`,series("scripts"));
  watch(`${SRC_PATH}/img/SVG/*.svg`,series("icons"));
});



task("default", 
series("clean", "sass", parallel( "copy:html", "copy:img", "copy:sprite", "copy:video", "styles", "scripts", "icons"), 
parallel("watch", "server"))
);

task("build", 
series("clean", "sass", parallel( "copy:html", "copy:img", "copy:sprite", "copy:video", "styles", "scripts", "icons"))
);

