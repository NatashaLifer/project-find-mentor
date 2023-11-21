import gulp from 'gulp'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin'
import cleanCSS from 'gulp-clean-css';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';
// import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';
import browserify from 'browserify';



const sass = gulpSass(dartSass);

const configPath = {
    src: {
      html: "./src/index.html",
      scss: "./src/scss/main.scss",
      js: "./src/scripts/main.js",
      images: "./src/img/**/*",
    },
    prod: {
      self: "./prod",
      html: "./prod",
      scss: "./prod/style",
      js: "./prod/js",
      images: "./prod/img",
    },
    setEnv() {
        this.isProd = process.argv.includes('--prod')
        this.isDev = !this.isProd
    }
  };

const htmlBuild = () => (
    gulp.src(configPath.src.html)
    .pipe(gulp.dest(configPath.prod.html))
    .pipe(browserSync.stream())
)

const imagesBuild = () => (
    gulp.src(configPath.src.images)
    .pipe(gulp.dest(configPath.prod.images))
    .pipe(browserSync.stream())
)

const scssBuild = () => (
    gulp.src(configPath.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(configPath.isProd,autoprefixer({
        cascade: false
    })))
    .pipe(gulpif(configPath.isProd, cleanCSS({compatibility: 'ie8'})))
    .pipe(gulp.dest(configPath.prod.scss))
    .pipe(browserSync.stream())
)

const jsBuild = () => (
    browserify(configPath.src.js, {debug: true})
    .transform('babelify', { presets: ['@babel/preset-env'] })
        .bundle()
        .on('error', function browserifyError(error) {
            console.log(error.stack)
            this.emit('end')
        })
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(gulpif(configPath.isProd, uglify()))
    .pipe(gulp.dest(configPath.prod.js))
    .pipe(browserSync.stream())
)

const server = browserSync.create()

const watcher = callback => {
    server.init({
        server: {
            baseDir: configPath.prod.self
        }
    })
    gulp.watch(configPath.src.html, htmlBuild).on('change', server.reload)
    gulp.watch('./src/scss/**/*.scss', scssBuild).on('change', server.reload)
    gulp.watch('./src/scripts/**/*.js', jsBuild).on('change', server.reload)
    gulp.watch(configPath.src.images, imagesBuild).on('change', server.reload)

    callback()
}

const imgMinTask = () =>
    gulp.src(configPath.src.images)
    .pipe(gulpif(configPath.isProd, imagemin()))
    .pipe(gulp.dest(configPath.prod.images))

const cleanTask = () => 
    gulp.src('prod', {allowEmpty: true})
    .pipe(clean())

configPath.setEnv()

gulp.task('dev', 
    gulp.series(
        cleanTask,
        imgMinTask, 
        htmlBuild, 
        scssBuild, 
        jsBuild,
        imagesBuild,
        watcher,
    )
)
gulp.task('build', 
    gulp.series(
        cleanTask,
        imgMinTask, 
        htmlBuild, 
        scssBuild, 
        jsBuild,
        imagesBuild,
    )
)