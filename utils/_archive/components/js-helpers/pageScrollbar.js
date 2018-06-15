// Скрытие / показ полосы прокрутки у страницы
var pageScrollbar = (function() {
    var $body = document.body;
    var $html = document.documentElement;

    function getWidth() {
        // Если высота страницы больше высоты окна
        var docH = Math.max(
            $body.scrollHeight, $html.scrollHeight,
            $body.offsetHeight, $html.offsetHeight,
            $body.clientHeight, $html.clientHeight
        );

        var winH = $html.clientHeight;

        // Проверяем через элемент
        if (docH > winH) {
            var div = document.createElement('div');
            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.visibility = 'hidden';

            $body.appendChild(div);
            var scrollWidth = div.offsetWidth - div.clientWidth;
            $body.removeChild(div);

            return scrollWidth;
        } else {
            return 0;
        }
    };

    function hide() {
        $html.style.overflow = 'hidden';
        $html.style.paddingRight = getWidth() + 'px';
    };

    function show() {
        $html.style.overflow = '';
        $html.style.paddingRight = '';
        if ($html.getAttribute('style') === '') {
            $html.removeAttribute('style');
        }
    };

    return {
        getWidth: getWidth,
        hide: hide,
        show: show
    }
})();
