import gulp from 'gulp';
import webp from 'gulp-webp';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';

gulp.task('html',()=>{
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('webp',()=>{
    return gulp.src('src/img/*.jpg')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('webpPng',()=>{
    return gulp.src('src/img/*.png')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('Svg', function () {
    return gulp.src('src/img/*.svg')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('js',()=>{
    console.log("✌️ Running js with config of : ",webpackConfig);
    return gulp.src('src/js/*.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/img/*.jpg', gulp.series('webp'));
    gulp.watch('src/img/*.png', gulp.series('webpPng'));
    gulp.watch('src/img/*.svg', gulp.series('Svg'));
});

// Default task running all the above tasks
gulp.task('default', gulp.parallel('html', 'css', 'js', 'watch'));