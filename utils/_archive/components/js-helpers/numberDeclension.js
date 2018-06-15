// Склонение чисел - (5, ['яблоко', 'яблока', 'яблок'])
function numberDeclension(number, titles) {
    number = Math.abs(number);
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
