// ====== jQuery :: fancybox

// Fancybox - Модальное окно
$(document).on('click', '.js-fancybox-modal', function(e) {
    e.preventDefault();
    $.fancybox.open({
        src: $(this).attr('href'),
        modal: true,
        opts: {
            clickOutside: 'close',
            touch: false,
            toolbar: false,
            smallBtn: false
        }
    });
});

// Fancybox - Галерея
$(document).on('click', '.js-fancybox-gallery', function(e) {
    e.preventDefault();
    $.fancybox.open({
        src: $(this).attr('href'),
        loop: true
    });
});


// ====== fastclick

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


// ====== jQuery :: maskedinput
$('.js-masked-phone').mask('+7(999)999-99-99');


// ====== imagesloaded, masonry
imagesLoaded('..js-masonry', function() {
    var masonry = new Masonry('.js-masonry', {
        itemSelector: '.js-masonry-item',
        singleMode: true,
        isResizable: true,
        transitionDuration: 0
    });
});


// ====== jQuery :: scrollto
$('.js-scrollto').on('click', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var target = $(href);
    $(window).scrollTo(target, {
        duration: 1000,
        axis: 'y'
    });
});


// ====== tinyslider
(function() {
    var el = document.querySelectorAll('.js-slider');
    if (el.length) {
        tns({
            container: '.js-slider',
            mouseDrag: true,
            items: 1,
            responsive: {
                1200: {
                    items: 4
                },
                720: {
                    items: 2
                }
            }
        });
    }
})();


// Яндекс карта
(function() {
    var myMap;
    var myPlacemark;

    ymaps.ready(init);

    function init() {
        if (document.documentElement.clientWidth <= 1200) {
            myMap = new ymaps.Map("map", {
                center: [59.9166, 30.3093],
                zoom: 15,
                controls: []
            });
        } else {
            myMap = new ymaps.Map("map", {
                center: [59.9169, 30.3112],
                zoom: 17,
                controls: []
            });
        }

        myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([59.916632, 30.309319], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pin.png',
            iconImageSize: [104, 103],
            iconImageOffset: [-42, -100]
        });

        myMap.geoObjects.add(myPlacemark);
    };
})();
