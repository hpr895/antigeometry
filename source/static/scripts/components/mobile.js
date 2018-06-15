// Мобильная панель
var mobilePanel = (function() {
    var $panel = document.querySelector('.js-mobile');
    var $overlay;
    var animationSpeed = 200;

    function init() {
        events();
        createOverlay();
    }

    function events() {
        // Триггеры открытия
        (function() {
            var el = document.querySelectorAll('.js-mobile-open');
            if (el.length) {
                for(var i = 0; i < el.length; i++) {
                    el[i].addEventListener('click', openAction);
                }
            }
        })();

        // Триггеры закрытия
        (function() {
            var el = document.querySelectorAll('.js-mobile-close');
            if (el.length) {
                for(var i = 0; i < el.length; i++) {
                    el[i].addEventListener('click', closeAction);
                }
            }
        })();
    }

    function openAction() {
        openPanel();
        showOverlay();
        hideScrollbar();
    }

    function closeAction() {
        closePanel();
        hideOverlay();
        showScrollbar();
    }

    function openPanel() {
        $panel.classList.add('is-opened');
    }

    function closePanel() {
        $panel.classList.remove('is-opened');
    }

    function createOverlay() {
        $overlay = document.createElement('div');
        $overlay.className = 'mobile-overlay';
        document.body.appendChild($overlay);

        $overlay.addEventListener('click', closeAction);
    }

    function showOverlay() {
        $overlay.style.display = 'block';
        setTimeout(function() {
            $overlay.classList.add('is-visible');
        }, 10);
    }

    function hideOverlay() {
        $overlay.classList.remove('is-visible');
        setTimeout(function() {
            $overlay.style.display = '';
        }, animationSpeed);
    }

    function hideScrollbar() {
        document.documentElement.style.overflow = 'hidden';
    }

    function showScrollbar() {
        document.documentElement.style.overflow = '';
    }

    init();

    return {
        open: openAction,
        close: closeAction
    }
})();
