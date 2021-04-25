const gulp    = require('gulp'),
      uglify  = require('gulp-uglify'),
      concat  = require('gulp-concat'),
      sass    = require('gulp-sass'),
      htmlmin = require('gulp-htmlmin'),
      rename  = require('gulp-rename'),
      babel   = require('gulp-babel');
    //   watch   = require('gulp-watch');


gulp.task('js', function () {
    gulp.src(['./src/js/servises.js', './src/js/data.js', 
              './src/js/ThemeLoader.js', './src/js/UserInterface.js', './src/js/game.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({dirname: ''}))
        .pipe(concat("./main.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src(['./src/scss/*.scss'])
      .pipe(rename({dirname: ''}))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./build'));
});

gulp.task('themes', function(){
    return gulp.src('./src/theme/**/*.scss')
               .pipe(rename({dirname: ''}))
               .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
               .pipe(gulp.dest('./build/themes/'));
});

gulp.task('themesJs', function() {
    gulp.src('./src/theme/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({dirname: ''}))
        .pipe(uglify())
        .pipe(gulp.dest('./build/themes/'));
});

gulp.task("html", function() {
    gulp.src('./src/index.html')
        .pipe(rename({dirname: ''}))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
});

gulp.task("ft", function() {
    gulp.src(['src/theme/**/fonts/*.otf', 'src/theme/**/fonts/*.ttf'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task("img", function() {
    gulp.src('src/theme/**/img/*.png', 'src/theme/**/img/*.jpg')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./build/img'));

});

// gulp.task("watch", function() {
//     gulp.watch('')
// });