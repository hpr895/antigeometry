// Мобильная панель
var mobilePanel = (function() {
    var $base = document.documentElement;
    var $panel = document.querySelector('.js-mobile-panel');
    var $overlay;
    var animationSpeed = 200;

    function init() {
        events();
        createOverlay();
    }

    function events() {
        // Триггеры открытия
        (function() {
            var el = document.querySelectorAll('.js-mobile-panel-open');
            if (el.length) {
                for(var i = 0; i < el.length; i++) {
                    el[i].addEventListener('click', openAction);
                }
            }
        })();

        // Триггеры закрытия
        (function() {
            var el = document.querySelectorAll('.js-mobile-panel-close');
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
        $base.style.overflow = 'hidden';
    }

    function showScrollbar() {
        $base.style.overflow = '';

        if ($base.getAttribute('style') === '') {
            $base.removeAttribute('style');
        }
    }

    init();

    return {
        open: openAction,
        close: closeAction
    }
})();
