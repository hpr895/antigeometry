// jQuery - Мобильное меню
var menuMobile = (function() {
    var $trigger = $('.menu-mobile__arrow');
    var animationSpeed = 200;

    // Mobile menu
    $trigger.on('click', function() {
        toggleMenu($(this));
    });

    function toggleMenu(el) {
        var li = el.closest('li');

        el.toggleClass('is-active');
        li.toggleClass('is-active');

        li.children('ul').slideToggle(animationSpeed, function() {
            li.children('ul').toggleClass('is-opened');
        });
    }
})();
