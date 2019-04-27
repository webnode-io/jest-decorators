const Gulp = require('gulp')                     
const Typescript = require('gulp-typescript')    
const Sourcemaps = require('gulp-sourcemaps')    
const Rimraf = require('rimraf')                 
const Path = require('path')                    
const tsconfig = require('./tsconfig.json')      
                 
const SOURCE_DIR = Path.join(__dirname, 'src')    
const DIST_DIR = Path.join(__dirname, 'dist')     

Gulp.task('clear', function (cb) {
  Rimraf.sync(DIST_DIR)
  cb()
})

Gulp.task('ts', function () {
  return Gulp
           .src(Path.join(SOURCE_DIR, './**/*.ts'), {
             base: SOURCE_DIR
           })
           .pipe(Sourcemaps.init())
           .pipe(Typescript(tsconfig.compilerOptions))
           .pipe(Sourcemaps.write('.'))
           .pipe(Gulp.dest(DIST_DIR))
})

Gulp.task('build', Gulp.series('clear', 'ts'))