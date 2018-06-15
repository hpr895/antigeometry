# Antigeometry
Фронт-энд сборщик на gulp + pug + stylus


## Установка

### Изначальная
- Установить Node.js
- Установить Gulp глобально:

```sh
$ npm i gulp -g
```

### Проект

- Скачать к себе репозиторий
- В папке репозитория установить зависимости:

```sh
$ npm i
```

- Появившуюся папку node_modules можно перенести на уровень выше, чтобы она была единой для всех проектов
- Запустить сборщик:

```sh
$ gulp
```

- Только компиляция:

```sh
$ gulp export
```

## Благодарности:
[Zoxon - Gulp Front](https://github.com/zoxon/gulp-front)
\
[17axah - Cachalot](https://github.com/17axah/Cachalot)


## Структура


```
/source - исходный код

    /assets - файлы, которые скопируются неизменными в свои папки
        /css
            reset.css - сброс всех тегов, инпутов и элементов для чистой семантической вёрстки

        /favicons
            favicon.ico - основная фавиконка
            apple-touch-icon.png - фавиконка для ios

        /fonts
            /opensans - шрифты называем в нижнем регистре, без пробелов и тире, чтобы потом не путаться в наименованиях. Подключаем только ".woff" формат
                bold.woff
                italic.woff
                light.woff
                regular.woff

        /img - файлы изображений элементов дизайна

        /js
            jquery-2.2.4.min.js - лучшая в мире js-библиотека (если необходимо)
            polyfills.min.js - скрипты, которые должны сработать до загрузки страницы (modernizr, некоторые js-полифиллы)

        /upload  - папка изображений для демонстрации работы плагинов в вёрстке, которую удалят при насаживании

    /pages - страницы
        _autoloader.pug - автоподключение всех ".pug" файлов из папки "static"
        _config.json - настройка проекта и имён страниц
        index.pug - список всех страниц
        main.pug - страница вёрстки

    /static - файлы, которые будут компилироваться
        /markup
            /elements
                _app.pug
                footer.pug
                header.pug
                page.pug
        /scripts
            main.js
        /styles
            /elements
                _mixins.styl
                footer.styl
                header.styl
                page.styl
            _variables.styl
            main.styl

    /vendor - сторонние плагины
        /fancybox - папка с плагином
            fancybox.css - все стили плагинов соберутся в файл dest/plugins.css
            fancybox.js - все скрипты плагинов соберутся в файл dest/plugins.js
```
