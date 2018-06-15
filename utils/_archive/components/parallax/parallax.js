// Параллакс
(function() {
    var $items = document.querySelectorAll('.prx__item');
    var scrolled = 0;
    var coef = 1;

    if ($items.length) {
        init();
    }

    function init() {
        window.addEventListener('scroll', moveElements);
    }

    function moveElements() {
        scrolled = window.pageYOffset || window.scrollTop;
        for(var i = 0; i < $items.length; i++) {
            coef = $items[i].getAttribute('data-speed');
            $items[i].style.transform = 'translateY(-' + scrolled * coef + 'px)';
        }
    }
})();
