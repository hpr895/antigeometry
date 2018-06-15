// Detect the End of CSS Animations and Transitions with JavaScript - August 20, 2014 by Jonathan Suh
function animationEnd() {
    var el = document.createElement('fakeelement');

    var animations = {
        'animation'       : 'animationend',
        'OAnimation'      : 'oAnimationEnd',
        'MozAnimation'    : 'animationend',
        'WebkitAnimation' : 'webkitAnimationEnd'
    }

    for (var t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}
