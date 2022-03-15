const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")




const htmlmin=require('gulp-htmlmin')
const concat=require('gulp-concat')
const terser=require('gulp-terser')
const cleanCss=require('gulp-clean-css')
const imagemin=require('gulp-imagemin')


const globe ={
  html:"project/*.html",
  js:"project/js/**/*.js",
  css:"project/css/**/*.css",
  img:"project/pics/*"
}
function htmlTask()
{ 
 
  return src(globe.html,{sourcemaps:true})
  .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
  .pipe(dest("dist"))
}
function jsTask()
{
  return src(globe.js,{sourcemaps:true})
  .pipe(concat("all.min.js"))
  .pipe(terser())
  .pipe(dest("dist/assets/js"))
}
function cssTask()
{
  return src(globe.css,{sourcemaps:true})
  .pipe(concat("style.min.css"))
  .pipe(cleanCss())
  .pipe(dest("dist/assets/css"))
}
function imgTask()
{
  return src(globe.img)
  .pipe(concat("style.min.css"))
  .pipe(imagemin())
  .pipe(dest("dist/images"))
}
var browserSync = require('browser-sync');
function serve (done){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  done()
}

function reload(cb) {
  browserSync.reload()
  cb()
}
function watchTask() {
  watch(globe.html,series(htmlTask, reload))
  watch(globe.css,series(cssTask, reload))
  watch(globe.js, series(jsTask,reload));

}
exports.default = series( parallel(htmlTask, jsTask, cssTask, imgTask), serve,watchTask)

