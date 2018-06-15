// Прилипающий блок
var stickyHeader = (function() {
    var el = document.querySelector('.header');
    var parent = document.querySelector('.page__header');
    var className = 'is-stuck';
    var elHeight;
    var scrolled;

    window.onscroll = function () {
        check();
    };

    function check() {
        elHeight = el.offsetHeight;
        scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > el.getBoundingClientRect().top) {
            pin();
        } else {
            unpin();
        }
    };

    function pin() {
        el.classList.add(className);
        parent.style.paddingTop = elHeight + 'px';
    }

    function unpin() {
        el.classList.remove(className);
        parent.style.paddingTop = '';
        if (parent.getAttribute('style') == '') {
            parent.removeAttribute('style');
        }
    }

    check();
})();
