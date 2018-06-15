'use strict';

//////////////// Переменные

// Основа
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var fs           = require('fs');
var watch        = require('gulp-watch');

// Файлы
var concat       = require('gulp-concat');
var data         = require('gulp-data');
var del          = require('del');
var file         = require('gulp-file');
var rename       = require('gulp-rename');

// Разметка
var pug          = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify')

// Стили
var combineMq    = require('gulp-combine-mq');
var cssbeautify  = require('gulp-cssbeautify');
var cssclean     = require('gulp-clean-css');
var csscomb      = require('gulp-csscomb');
var rupture      = require('rupture');
var stylus       = require('gulp-stylus');

// Скрипты
var include      = require('gulp-include');
var jsbeautify   = require('gulp-jsbeautifier');
var uglify       = require('gulp-uglify');

// Изображения
var imagemin     = require('gulp-imagemin');



//////////////// Исходники для компиляции

var options = {
    minifyStyles: true,
    minifyScripts: true
};



//////////////// Исходники для компиляции

// Разметка
gulp.task('markup', function() {
    return gulp.src('source/static/markup/*.pug')
        // Передаём в каждую .pug страницу вёрстки её имя в переменной fileName (для миксина auto-title)
        .pipe(data(function (file) {
            return {
                fileName: file.history[0].replace(file.base, '').replace('.pug', '')
            };
        }))
        .pipe(pug({
            // Настройки проекта
            data: JSON.parse(fs.readFileSync('source/static/markup/_config.json', 'utf8')),
            basedir: 'source/static/markup/components'
        })).on('error', swallowError)
        .pipe(htmlbeautify({
            'indent_size': 4,
            'indent_char': ' ',
            'unformatted': 'html',
            'extra_liners': ''
        }))
        .pipe(gulp.dest('dest'))
        .pipe(browserSync.stream());
});

// Стили
gulp.task('styles', ['styles-compile'], function() {
    if (options.minifyStyles) {
        return gulp.src([
                'dest/css/reset.css',
                'dest/css/main.css',
                'dest/css/content.css'
            ])
            .pipe(cssclean())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dest/css'))
            .pipe(browserSync.stream());
    }
});

gulp.task('styles-compile', function() {
    return gulp.src('source/static/styles/*.styl')
        .pipe(stylus({
            use: [
                rupture()
            ],
            'include css': true
        })).on('error', swallowError)
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(cssbeautify())
        .pipe(csscomb())
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.stream());
});

// Скрипты
gulp.task('scripts', ['scripts-compile'], function() {
    if (options.minifyScripts) {
        return gulp.src([
            'dest/js/main.js'
        ])
        .pipe(uglify().on('error', function(e) {
            showBeautifulJsError(e, 'JS syntax error');
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.stream());
    }
});

gulp.task('scripts-compile', function() {
    return gulp.src('source/static/scripts/*.js')
        .pipe(include()).on('error', console.log)
        .pipe(jsbeautify())
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.stream());
});

//////////////// Обычные файлы

// Стили
gulp.task('assets-styles', function() {
    return gulp.src('source/assets/css/**/*.css')
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.stream());
});

// Скрипты
gulp.task('assets-scripts', function() {
    return gulp.src('source/assets/js/**/*.js')
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.stream());
});

// Изображения элементов дизайна
gulp.task('assets-images', function() {
    return gulp.src('source/assets/img/**/*.{jpg,gif,png,svg}')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest('dest/img'))
        .pipe(browserSync.stream());
});

// Изображения для примера
gulp.task('assets-upload', function() {
    return gulp.src('source/assets/upload/**/*')
        .pipe(gulp.dest('dest/upload'))
        .pipe(browserSync.stream());
});

// Шрифты
gulp.task('assets-fonts', function() {
    return gulp.src('source/assets/fonts/**/*')
        .pipe(gulp.dest('dest/fonts'))
        .pipe(browserSync.stream());
});

// Фавиконки
gulp.task('assets-favicons', function() {
    return gulp.src('source/assets/favicons/**/*')
        .pipe(gulp.dest('dest/favicons'))
        .pipe(browserSync.stream());
});



//////////////// Плагины

// Стили плагинов
gulp.task('vendor-styles', ['vendor-styles-combine'], function() {
    if (options.minifyStyles) {
        return gulp.src([
                'dest/css/plugins.css'
            ])
            .pipe(cssclean())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dest/css'))
            .pipe(browserSync.stream());
    }
});

gulp.task('vendor-styles-combine', function() {
    return gulp.src('source/vendor/**/*.css')
        .pipe(concat('plugins.css'))
        .pipe(file('plugins.css', ''))
        .pipe(cssbeautify())
        .pipe(csscomb())
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.stream());
});

// Скрипты плагинов
gulp.task('vendor-scripts', ['vendor-scripts-combine'], function() {
    if (options.minifyScripts) {
        return gulp.src([
                'dest/js/plugins.js'
            ])
            .pipe(uglify().on('error', function(e) {
                showBeautifulJsError(e, 'JS syntax error');
            }))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dest/js'))
            .pipe(browserSync.stream());
    }
});

gulp.task('vendor-scripts-combine', function() {
    return gulp.src('source/vendor/**/*.js')
        .pipe(concat('plugins.js', {
            newLine: '\n\n'
        })).on('error', swallowError)
        .pipe(file('plugins.js', ''))
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.stream());
});




//////////////// Помощники

// Показать класивую JS ошибку
function showBeautifulJsError(e, title) {
    console.log('');
    console.log('====== ' + title + ' ======');
    console.log('');
    console.log(e.cause.message);
    console.log('file: ' + e.cause.filename);
    console.log('line: ' + e.cause.line);
    console.log('col:  ' + e.cause.col);
    console.log('');
    console.log('=============================');
    process.exit(-1);
}

// Пропустить ошибку
function swallowError(error) {
    console.log(error.message);
    this.emit('end');
}

// Чистка
gulp.task('clear', function() {
    del.sync('dest');
});



//////////////// Выполнение

// Стандартныая команда с сервером
gulp.task('default', ['export'], function() {

    // Сервер
    browserSync.init({
        server: 'dest',
        notify: false
    });

    // Слежение

    // Исходники для компиляции
    gulp.watch('source/static/markup/**/*.pug', ['markup']);
    gulp.watch('source/static/markup/_config.json', ['markup']);
    gulp.watch('dest/*.html').on('change', browserSync.reload);

    gulp.watch('source/static/styles/**/*.styl', ['styles']);
    gulp.watch('dest/css/*.css').on('change', browserSync.reload);

    gulp.watch('source/static/scripts/**/*.js', ['scripts']);
    gulp.watch('dest/js/*.js').on('change', browserSync.reload);

    // Обычные файлы
    gulp.watch('source/assets/css/**/*.css', ['assets-styles']);
    gulp.watch('source/assets/js/**/*.js', ['assets-scripts']);
    gulp.watch('source/assets/img/**/*', ['assets-images']);
    gulp.watch('dest/img/**/*').on('change', browserSync.reload);

    gulp.watch('source/assets/upload/**/*', ['assets-upload']);
    gulp.watch('dest/upload/**/*').on('change', browserSync.reload);

    gulp.watch('source/assets/fonts/**/*', ['assets-fonts']);
    gulp.watch('dest/fonts/**/*').on('change', browserSync.reload);

    gulp.watch('source/assets/favicons/**/*', ['assets-favicons']);
    gulp.watch('dest/favicons/**/*').on('change', browserSync.reload);

    // Плагины
    gulp.watch('source/vendor/**/*.css', ['vendor-styles']);
    gulp.watch('source/vendor/**/*.js', ['vendor-scripts']);
});

// Компиляция
gulp.task('export', [
    'clear',

    'assets-styles',
    'assets-scripts',
    'assets-images',
    'assets-upload',
    'assets-fonts',
    'assets-favicons',

    'vendor-styles',
    'vendor-scripts',

    'markup',
    'styles',
    'scripts'
]);
