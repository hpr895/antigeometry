# Antigeometry
Фронт-энд сборщик на **gulp** + **pug** + **stylus**

[Демонстрация](http://html.web.weltkind.ru/antigeometry/home.html)

## Установка
### Изначальная
- Установить Node.js
- Установить Gulp глобально:
```sh
$ npm i gulp -g
```

### Для каждого проекта
- Скачать к себе репозиторий
- В папке репозитория установить зависимости:
```sh
$ npm i
```
- Появившуюся папку "node_modules" нужно будет перенести на уровень выше, чтобы она была единой для всех проектов
- Запустить сборщик:
```sh
$ gulp
```
- Если нужна только компиляция:
```sh
$ gulp export
```

## Структура
"gulpfile.js" - основной файл для сборки проекта, который можно настраивать под себя. Имеется объект с настройками "options".

### /dest
Сюда собирается готовая вёрстка.

/index.html - список страниц
/*.html - остальные файлы разметки из проекта

#### /dest/css
Изначально все стили делится на 4 файла (слоя). Такая структура позволит разграничить вёрстку по слоям, которые не будут путаться друг с другом при дальнейшей разработке:
- /reset.css - специальный сброс практически всех стилей DOM-элементов, чтобы при вёрстке все они имели единый вид: таблицы будут без отступов, списки тоже, заголовки тоже. Это позволит верстать семантично, не сбрасывая каждый раз стандартные браузерные стили. Все инпуты форм имеют простой вид, чтобы из этого состояния их можно было легче настраивать и группировать. Также там есть классы-хелперы и подключение шрифтов.
- /plugins.css - собирает все стили, которые найдёт в "/source/vendor/**/*"
- /main.css - основные стили, там же и медиазапросы.
- /content.css - только в этом файле через класс ".content" уже стилизуются списки, таблицы, заголовки и т.п., которые придут от пользователя из текстового редактора в админ. панели.

#### /dest/favicons
Изначально достаточно всего две фавиконки - одна для Windows, другая для Mac. При необходимости добавляем фавиконки **только** сюда. Файлы "browserconfig.xml" и "manifest.json" тоже должны лежать только здесь.

#### /dest/fonts
Делим шрифты по папкам и везде называем их исключительно в нижнем регистре и без пробелов. К имени файла шрифта добавляем постфикс начертания, т.к быстро открыть файл шрифтов, к примеру, формата ".ttf", в большинстве случаев будет довольно накладно.

#### /dest/img
Здесь лежат изображения, которые относятся к дизайну сайта. Внутри желательно делить на подпапки, чтобы всё не лежало скопом на входе.

#### /dest/upload
Здесь лежит тестовый контент, который будет идти от пользователя и т.п. После того, как вёрстку используют для создания сайта, программист удалит эту папку.

### /source
Источник файлов для компиляции. Вся основная работу будет происходить в этой папке.

#### /source/assets
Файлы, лежащие здесь, будут копироваться как есть в папку "/dest". Правильная структура файлов описана выше.

#### /source/static
Основные файлы, которые будут собираться препроцессорами и уходить в папку "/dest"

##### /source/static/markup
Разметка страниц.

- /config.json - это настройки проекта. Для добавления новой страницы нужно в массиве "pages" аналогично прописать для неё строку а после чего создать файл. Страницы будут автоматически подключаться и добавлять meta-title из файла настройки благодаря миксину "+auto-title(fileName)".
- /components - папка компонентов, которая присоединяется в pug через "include".
- /components/_base - файлы, которые будут почти в любом проекте и нужны для помощи сборщика, вынесенные отдельно.

##### /source/static/scripts
Скрипты. Пока что их обрабатывает только один небольшой плагин, который позволяет подключать скрипты из папки components.
В будущем, если откажемся от IE, можно будет использовать ECMAScript новых версий.
Изначально в файле "main.js" находится строка, которая просто импортирует все файлы из "/components":

##### /source/static/styles
В стилях лежат три основных файла, а "plugins.css" сам создаётся сборщиком.
В "_base" находятся файлы, которые придётся настраивать практически в любом проекте.
Основной код стилей, как уже известно, пишем в "main.styl".

#### /source/vendor
Здесь будут лежать сторонние плагины, сборщик будет 

### /utils
Вспомогательные файлы

#### /utils/_archive
Здесь лежат заготовки компонентов, различных плагинов, их примеров и инициализации.
(можно будет вынести это в отдельный репозиторий, если это будет необходимо)

- /_other - специфичные файлы и заготовки
- /components - различные небольшие решения. разбираемся в них и раскладываем по папкам в "/source"
- /pages - готовые типовые страницы. Почти что "копируем-вставляем".
- /vendor - архив сторонних плагинов. Берём отсюда целую папку и вставляем в "source/vendor", там же находятся файлы подсказок для инициализации "_init".

#### /utils/bemto
Плагин, который при вёрстке на pug позволяет писать по БЭМ легко и быстро: [bemto](https://github.com/kizu/bemto).
\
В помощь я сделал плагин на Sublime Text 3 для быстрого преобразования pug-bemto в stylus: [bemto_to_stylus](https://github.com/hpr895/bemto_to_stylus)

## Демонстрация в проекте
Изначально в проекте реализован модуль мобильной панели с меню и демонстрацией того, как стилизовать формы, разделяя их по темам.

## Основано на сборщиках:
[Zoxon - Gulp Front](https://github.com/zoxon/gulp-front)
\
[17axah - Cachalot](https://github.com/17axah/Cachalot)
