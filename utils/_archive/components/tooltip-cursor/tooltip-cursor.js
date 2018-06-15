// Tooltip от курсора
(function() {
    var el = document.querySelectorAll('.js-tooltip-cursor');
    var winW, winH, mouseX, mouseY, box, boxW, boxH;
    var boxOffsetX = 16;
    var boxOffsetY = 24;

    if (el.length) {
        for (var i = 0; i < el.length; i++) {
            el[i].addEventListener('mouseenter', function(e) {
                // Box
                box = this.getElementByClassName('.js-tooltip-cursor-content');
            }

            el[i].addEventListener('mousemove', function(e) {
                // Window
                winW = document.documentElement.clientWidth;
                winH = document.documentElement.clientHeight;

                // Mouse
                mouseX = e.clientX + boxOffsetX;
                mouseY = e.clientY + boxOffsetY;

                // Overflow condition
                boxW = box.offsetWidth;
                boxH = box.offsetHeight;

                if (mouseX + boxW >= winW - 10) {
                    mouseX = winW - boxW - 10;
                }

                if (mouseY + boxH >= winH - 10) {
                    mouseY = mouseY - boxH - 32;
                }

                // Box position
                box.style.transform = 'translate('+ mouseX + 'px, ' + mouseY + 'px)';
            });
        }
    }
})();
